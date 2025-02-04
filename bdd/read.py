import sqlite3

def read_db(db_path):
    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        c.execute('SELESCT * FROM warn')
        rows = c.fetchall()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        rows = []
    finally:
        if conn:
            conn.close()
    return rows

if __name__ == '__main__':
    db_path = './bdd/warn.sqlite'
    rows = read_db(db_path)
    for row in rows:
        print(row)