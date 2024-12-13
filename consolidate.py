import sqlite3
import os

# List of source database names and corresponding table names
databases = [
    "centers", "cornerbacks", "defensiveends", "defensivetackles", 
    "freesafetys", "insidelinebackers", "offensiveguards", "offensivetackles", 
    "outsidelinebackers", "quarterbacks", "runningbacks", "strongsafetys", 
    "tightends", "widereceivers"
]

# Output database and table
output_db = "data.db"
output_table = "players"

# Columns for the `players` table
columns = """
    Year INT, Name TEXT, College TEXT, Position TEXT, 
    Height REAL, Weight INT, HandSize REAL, ArmLength REAL, 
    FourtyYard REAL, BenchPress INT, VerticalLeap REAL, 
    BroadJump REAL, Shuttle REAL, ThreeCone REAL, 
    pickNumber INT, round INT, wAV REAL
"""

# Create the output database and the `players` table
with sqlite3.connect(output_db) as conn:
    cursor = conn.cursor()
    cursor.execute(f"DROP TABLE IF EXISTS {output_table}")
    cursor.execute(f"CREATE TABLE {output_table} ({columns})")
    conn.commit()

# Function to transfer data from a source database to the output database
def consolidate_database(source_db, source_table, output_db, output_table):
    with sqlite3.connect("databases/"+source_db) as src_conn:
        src_cursor = src_conn.cursor()
        src_cursor.execute(f"SELECT * FROM {source_table}")
        rows = src_cursor.fetchall()

        with sqlite3.connect(output_db) as dest_conn:
            dest_cursor = dest_conn.cursor()
            placeholders = ", ".join("?" for _ in range(len(rows[0]))) if rows else ""
            insert_query = f"INSERT INTO {output_table} VALUES ({placeholders})"
            if rows:
                dest_cursor.executemany(insert_query, rows)
                dest_conn.commit()

# Iterate over each source database and consolidate the data
for db_name in databases:
    source_db = f"{db_name}.db"
    source_table = db_name[:-1]  # Remove the last character from the database name to get the table name
    if os.path.exists("databases/"+source_db):
        consolidate_database(source_db, source_table, output_db, output_table)
    else:
        print(f"Database {source_db} not found. Skipping.")

print("Data consolidation complete!")
