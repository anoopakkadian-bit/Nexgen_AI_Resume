import psycopg2
import os
from dotenv import load_dotenv

# 1. സെക്യൂരിറ്റി ഫയൽ ലോഡ് ചെയ്യുന്നു
load_dotenv()

def get_connection():
    """ഡാറ്റാബേസുമായി പാലം പണിയുന്ന ഫംഗ്ഷൻ (ഇതുകൂടി വേണം!)"""
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASS"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT")
        )
        return conn
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return None

def add_user(username, email, password):
    """പുതിയ യൂസറെ ഡാറ്റാബേസിലേക്ക് ചേർക്കുന്നു"""
    conn = get_connection()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                (username, email, password)
            )
            conn.commit()
            cur.close()
            conn.close()
            return True
        except Exception as e:
            print(f"❌ Signup Error: {e}")
            return False
    return False

def get_user(username):
    """യൂസർ ഉണ്ടോ എന്ന് നോക്കുന്നു (Login ചെയ്യാൻ)"""
    conn = get_connection()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        cur.close()
        conn.close()
        return user
    return None