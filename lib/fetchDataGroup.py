import psycopg2
from psycopg2 import Error

groups = [
    'HOSE', 'VN30', 'VN100',
    'HNX', 'HNX30',
]

connection = None  
try:
    connection = psycopg2.connect(
    "postgresql://postgres.gvnhwrbpvhxdydpfqsry:6NmFJdS5xA.4bX%23@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"  
    )
    cursor = connection.cursor()

    for group in groups:
        insert_group_query = """
        INSERT INTO "Group" (name)
        VALUES (%s)
        ON CONFLICT (name) DO NOTHING;
        """
        cursor.execute(insert_group_query, (group,))
        print(f"Đã thêm nhóm {group} vào bảng Group thành công!")

    connection.commit()

except (Exception, Error) as error:
    print("Lỗi khi làm việc với PostgreSQL:", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Kết nối PostgreSQL đã đóng!")
