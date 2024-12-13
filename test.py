import json
import sqlite3
from scipy import stats
import re
import pandas as pd
import math

# traits = ["height","weight","hand size", "arm length","fourty yard dash","bench press", "vertical leap", "broad jump", "shuttle", "3 cone"]
# manualInput = [2021, "Bill", "Ball So Hard Univeristy", "CB"]
#
# manualInput = manualInput + traits + [1, 2, 3, "poo"]
# table_name = "cornerbacks"
#
# connection = sqlite3.connect("databases/"+table_name+".db")
# cursor = connection.cursor()
# cursor.execute("INSERT INTO "+table_name[:-1]+" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
#     (manualInput[0],manualInput[1],manualInput[2],manualInput[3],manualInput[4],manualInput[5],manualInput[6],manualInput[7],manualInput[8],manualInput[9],manualInput[10],manualInput[11],manualInput[12],manualInput[13],manualInput[14],manualInput[15],manualInput[16]))
db_names = ["centers","cornerbacks","defensiveends","defensivetackles","freesafetys","insidelinebackers","offensiveguards","offensivetackles","outsidelinebackers","quarterbacks","runningbacks","strongsafetys","tightends","widereceivers"]
rows = []

connection = sqlite3.connect("databases/data.db")
cursor = connection.cursor()
row = cursor.execute(
    "SELECT * FROM players WHERE pickNumber != CAST(pickNumber AS INT)").fetchall()
connection.commit()
connection.close()


# connection = sqlite3.connect("databases/insidelinebackers.db")
# cursor = connection.cursor()

# cursor.execute("INSERT INTO insidelinebacker VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", row)

# connection.commit()
# connection.close()



# for db_name in db_names:
#     connection = sqlite3.connect("databases/"+db_name+".db")
#     cursor = connection.cursor()
    # cursor.execute("CREATE TABLE new_table AS SELECT * FROM "+db_name[:-1]+" WHERE 1=0")

    # # Copy the unique rows from the original table to the new table
    # cursor.execute("INSERT INTO new_table SELECT DISTINCT *FROM "+db_name[:-1])

    # # Delete the original table
    # cursor.execute("DROP TABLE "+db_name[:-1])

    # # Rename the new table to the original table name
    # cursor.execute("ALTER TABLE new_table RENAME TO "+db_name[:-1])

    # rows = cursor.execute("SELECT * FROM " +
    #                        db_name[:-1] + " WHERE name='Jacob Phillips'").fetchall()
    # rows += cursor.execute("SELECT * FROM "+db_name[:-1]+" AS t1 WHERE EXISTS (SELECT * FROM "+db_name[:-1]+" AS t2 WHERE t1.name = t2.name AND t1.name = 'Chase Claypool' AND t1.year != 1991)").fetchall()
    # cursor.execute("DELETE FROM "+db_name[:-1]+" AS t1 WHERE EXISTS (SELECT * FROM "+db_name[:-1]+" AS t2 WHERE t2.name = t1.name AND t2.year = 2023 AND t1.year = 2022 AND t1.college = t2.college)")
    # rows = cursor.execute("SELECT pickNumber, threecone FROM "+db_name[:-1]+" WHERE year = 2023 ORDER BY pickNumber DESC ").fetchall()
    # rows = cursor.execute("PRAGMA table_info("+db_name[:-1]+")").fetchall()
    # rows += cursor.execute("UPDATE "+db_name[:-1] +
    #                        " SET Position = 'ILB' WHERE name = 'Jacob Phillips'").fetchall()
    # connection.commit()
    # connection.close()
    # for element in rows:
    #     print(element)
    #     print(db_name)
print(row)
