import sqlite3

# Connect to the database
connection = sqlite3.connect("databases/defensivetackles.db")
cursor = connection.cursor()


# Add multiple columns to the table with default values
cursor.execute("ALTER TABLE defensivetackle ADD COLUMN pickNumber INTEGER DEFAULT -1")
cursor.execute("ALTER TABLE defensivetackle ADD COLUMN round INTEGER DEFAULT -1")
cursor.execute("ALTER TABLE defensivetackle ADD COLUMN wAV REAL DEFAULT -1")
# Save the changes
connection.commit()

rows = cursor.execute("SELECT * FROM defensivetackle").fetchall()
print(rows)

# Close the connection
connection.close()
