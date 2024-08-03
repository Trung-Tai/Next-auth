from vnstock3 import Vnstock
import psycopg2
from psycopg2 import Error
import pandas as pd
from datetime import date,timedelta

try:
    connection = psycopg2.connect(
        "postgresql://postgres.cdjftiqzzhtpdolzkmmv:rBX.G5cByV5sn.z@aws-0-us-east-1.pooler.supabase.com:5432/postgres"  
        )

    cursor = connection.cursor()

    select_symbols_query = "SELECT symbol FROM \"Stock\";"
    cursor.execute(select_symbols_query)

    symbols = cursor.fetchall()

    print("Các symbol trong bảng Stock:")
    for symbol in symbols:
        print(symbol[0])
        try:
            stock = Vnstock().stock(symbol=symbol[0], source='VCI')
            try:
                today = date.today()
                formatted_today = today.strftime('%Y-%m-%d')
                tomorrow = today + timedelta(days=1)
                formatted_tomorrow = tomorrow.strftime('%Y-%m-%d')


                df = stock.quote.history(start="2024-07-01", end=formatted_tomorrow, interval='1H')
                if not df.empty:
                    for index, row in df.iterrows():
                        date_value = row['time']
                        open_price = row['open']
                        high = row['high']
                        low = row['low']
                        close = row['close']
                        volume = row['volume']
                        insert_quote_query = """
                        INSERT INTO "Quote" (symbol, date, open, high, low, close, volume)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT DO NOTHING;
                        """
                        cursor.execute(insert_quote_query, (symbol[0], date_value, open_price, high, low, close, volume))
                    connection.commit()
                else:
                    print(f"Không có dữ liệu cho symbol: {symbol[0]}")
            except Exception as e:
                print(f"Lỗi khi truy xuất dữ liệu từ vnstock3 cho symbol {symbol[0]}: {e}")
                df = None
        except Exception as e:
            print(f"Lỗi khi tạo đối tượng stock cho symbol {symbol[0]}: {e}")
            stock = None
        print('===============================')

except (Exception, Error) as error:
    print("Lỗi khi làm việc với PostgreSQL:", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Kết nối PostgreSQL đã đóng!")
