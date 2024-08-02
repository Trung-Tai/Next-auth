from vnstock3 import Vnstock
import psycopg2
from psycopg2 import Error

stock = Vnstock().stock(symbol='VCB', source='VCI')

try:
    connection = psycopg2.connect(
    "postgresql://postgres.gvnhwrbpvhxdydpfqsry:6NmFJdS5xA.4bX%23@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"  
        # user="postgres",
        # password="123456",
        # host="localhost",
        # port="5432",
        # database="postgres"
    )
    cursor = connection.cursor()

    select_query = 'SELECT id, name FROM "Group";'
    cursor.execute(select_query)
    groups = cursor.fetchall()

    for group_id, group_name in groups:
        symbols = stock.listing.symbols_by_group(group_name)
        
        for symbol in symbols:
            insert_stock_query = """
            INSERT INTO "Stock" (symbol, name, industry, exchange)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (symbol) DO NOTHING;
            """
            cursor.execute(insert_stock_query, (symbol, '', None, ''))

            insert_stock_on_group_query = """
            INSERT INTO "StockOnGroup" ("stockSymbol", "groupId")
            VALUES (%s, %s)
            ON CONFLICT ("stockSymbol", "groupId") DO NOTHING;
            """
            cursor.execute(insert_stock_on_group_query, (symbol, group_id))

        connection.commit()

    print("Đã thêm các symbols vào bảng Stock và StockOnGroup thành công!")

except (Exception, Error) as error:
    print("Lỗi khi làm việc với PostgreSQL:", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Kết nối PostgreSQL đã đóng!")
