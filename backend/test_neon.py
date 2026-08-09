import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(os.getenv("NEON_DATABASE_URL"))
cur = conn.cursor()

# Enable pgvector extension
cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
conn.commit()

cur.execute("SELECT version();")
print("Connected:", cur.fetchone()[0])

cur.close()
conn.close()
print("Neon connection OK")