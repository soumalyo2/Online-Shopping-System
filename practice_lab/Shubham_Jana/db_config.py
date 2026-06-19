import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sulekha",  # Your updated password
        database="urban_mart" # Or your online shopping database name
    )
