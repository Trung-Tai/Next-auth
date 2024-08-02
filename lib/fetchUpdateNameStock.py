from vnstock3 import Vnstock
import psycopg2
from psycopg2 import Error
import pandas as pd

try:
    connection = psycopg2.connect(
        "postgresql://postgres.cdjftiqzzhtpdolzkmmv:rBX.G5cByV5sn.z@aws-0-us-east-1.pooler.supabase.com:5432/postgres"  
    
    )
    cursor = connection.cursor()

    select_stock_query = "SELECT symbol FROM \"Stock\";"
    cursor.execute(select_stock_query)
    existing_symbols = [record[0] for record in cursor.fetchall()]

    vnstock = Vnstock().stock(symbol='AAA', source='VCI')

    df = vnstock.listing.all_symbols()

    for index, row in df.iterrows():
        ticker = row['ticker']
        organ_name = row['organ_name']

        if ticker in existing_symbols:
            
            update_stock_query = """
            UPDATE "Stock"
            SET name = %s
            WHERE symbol = %s;
            """
            cursor.execute(update_stock_query, (organ_name, ticker))
            connection.commit()

    print("Đã cập nhật các name trong bảng Stock thành công!")

except (Exception, Error) as error:
    print("Lỗi khi làm việc với PostgreSQL:", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Kết nối PostgreSQL đã đóng!")
