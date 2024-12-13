import requests
from bs4 import BeautifulSoup
import time
import sqlite3
connection = sqlite3.connect("databases/outsidelinebackers.db")
table_name = "outsidelinebacker"
print(connection.total_changes)
cursor = connection.cursor()

vgm_url = "https://nflcombineresults.com/nflcombinedata_expanded.php?year=2024&pos=OLB&college=&adjust=on"
# print(vgm_url)
# cursor.execute("CREATE TABLE center (Year INTEGER, Name TEXT, College TEXT, Position TEXT, Height REAL, Weight INTEGER, HandSize REAl, ArmLength REAL, FourtyYard REAL, BenchPress INTEGER, VerticalLeap REAL, BroadJump REAL, Shuttle REAL, ThreeCone REAL)")
values = []
traits = ["year","name","college", "position", "height","weight","hand size", "arm length", "wonderlic","fourty yard dash","bench press", "vertical leap", "broad jump", "shuttle", "3 cone","60yd"]
print(len(traits))
html_text = requests.get(vgm_url).text
soup = BeautifulSoup(html_text, 'html.parser')
# print(html_text)
for link in soup.find_all('tr', class_ = "tablefont"):
    print("")
# print(link)
    attr = 0
    values.clear()
    for attribute in link.find_all("td"):
        # print(traits[attr]+" : "+attribute.centersgetText())
        values.append(attribute.getText())
        # attr+=1
    print(values)
    cursor.execute("INSERT INTO " + table_name + " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,-1,-1,-1)",
                    (values[0],values[1],values[2],values[3],values[4],values[5],values[6],values[7],values[9],values[10],values[11],values[12],values[13],values[14]))
    connection.commit()

connection.close()
# cursor.execute("CREATE TABLE fish (name TEXT, species TEXT, tank_number INTEGER)")

#
#     for title in list1.find_all("img"):
#         # print(title['alt'])
#         new = True
# if not new:
# break
# page +=1
# print('done')
# print("--- %s seconds ---" % (time.time() - start_time))
