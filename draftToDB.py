import json
import sqlite3
from scipy import stats
import re
import pandas as pd
import math
from manage import *

def get_names(test_player_info):

    player_info = list(test_player_info.values())
    position = player_info[1]
    player_bank_data = get_player_data(position,player_info[-2])
    trait_weights = player_info[-1]
    trait_weights = list(trait_weights.values())
    player_trait = player_info[2:-2]
    player_trait = [float(x) if x else None for x in player_trait]
    trait_weights = [float(x) for x in trait_weights]
    if (not player_bank_data):
        return None
    percentiles = [[] for i in range(10)]
    mape_map = {}
    traits_map = {}
    name_map = {}
    for element in player_bank_data:
        count = 0
        mape = 0
        for trait in element[4:]:
            if trait:
                percentiles[count].append(trait)
                if player_trait[count]:
                    mape += abs((trait-player_trait[count])/(trait))*trait_weights[count]
                else:
                    mape+=0.05
            else:
                mape+=0.05
            count+=1
        name = element[1]+" "+str(element[0])+" "+element[2]+" "+element[3]
        mape_map[name] = mape
        traits_map[name] = element[4:]
        name_map[name] = element[1]

    mape_map = {k: v for k, v in sorted(mape_map.items(), key=lambda x: x[1])}
    similar_players = {}
    similar_players = {key : traits_map[key] for key in list(mape_map.keys())[0:20]}
    player_percentiles = {}
    descending = [0,0,0,0,1,0,0,0,1,1]
    print(similar_players)
    for key in similar_players:
        similar_players[key] = similar_players[key] + (mape_map[key],)
        data_values = []
        index = 0
        for percentile in percentiles:
            player = similar_players[key]
            if player[index]:
                data_values.append(abs(descending[index]-stats.percentileofscore(percentile,player[index])/100))
            else:
                data_values.append(0)
            index+=1
        player_percentiles[key] = data_values

    data_values = []
    index = 0
    for percentile in percentiles:
        player = player_trait
        if player[index]:
            data_values.append(abs(descending[index]-stats.percentileofscore(percentile,player[index])/100))
        else:
            data_values.append(0)
        index+=1
    player_percentiles[player_info[0]] = data_values

    return_info = {}
    return_info["playerinfo"] = similar_players
    return_info["percentiles"] = percentiles
    return_info["player_percentiles"] = player_percentiles
    return_info["originalinfo"] = player_trait
    return_info["nameMap"] = name_map
    return return_info

rows = get_player_data_by_year(2024)
player_data = {}
for player in rows.keys():
    nameCleaned = re.sub(r'[^a-zA-Z ]', '', player[1])
    player_data[nameCleaned] = [player[3]] + list(player)
# Read in the Excel file
print(player_data)
excel_file = pd.read_excel("NFLDraft2024.xlsx")
combine_file = pd.read_excel("Combine2024.xlsx")


# Convert the Excel file to a dictionary
excel_dict = excel_file.set_index("Player").T.to_dict()
combine_dict = combine_file.set_index("Player").T.to_dict()
count = 0
for name in excel_dict.keys():
    nameCleaned = name.replace(" HOF","")
    nameCleaned = re.sub(r'[^a-zA-Z ]', '', nameCleaned)
    excelPlayer = excel_dict[name]
    if nameCleaned not in player_data.keys():
        found = False
        first_last_name = " ".join(nameCleaned.split(" ")[:2])
        if first_last_name in player_data.keys():
            found = True
            player_data[name] = player_data[first_last_name][:-3] + [excelPlayer["Pick"], excelPlayer["Round"], excelPlayer["wAV"], excelPlayer["Team"]]
 
        if not found:
            print(name)
            traits = ["height","weight","hand size", "arm length","fourty yard dash","bench press", "vertical leap", "broad jump", "shuttle", "3 cone"]
            manualInput = [2024, name.replace(" HOF",""), excelPlayer["College/Univ"],excelPlayer["Pos"]]
            while True:
                potential_players = [x for x in player_data.keys() if x.split(" ")[1].lower() == name.split(" ")[1].lower()]
                if len(potential_players) == 0:
                    break
                print(potential_players)
                decision = input("Wrong Name? Please enter correct one ")
                found_name = re.sub(r'[^a-zA-Z ]', '', decision)
                if len(decision) == 0:
                    break
                elif found_name in player_data.keys():
                    player_data[name] = player_data[found_name][:-3] + [excelPlayer["Pick"], excelPlayer["Round"], excelPlayer["wAV"], excelPlayer["Team"]]
                    found = True
                    break
                else:
                    print("Can't find name, try again. Send empty string to move on to next step ")
            combine_name = name
            while not found:
                if combine_name in combine_dict:
                    found = True
                    print("Found Combine Data")
                    combine_player = combine_dict[combine_name]
                    print(combine_player)
                    if combine_player["Pos"] == "K" or combine_player["Pos"] == "P" or combine_player["Pos"] == "LS":
                        break
                    combine_values = [2024, name.replace(" HOF",""), combine_player["School"],combine_player["Pos"], combine_player["Height"],combine_player["Weight"],"", "",combine_player["40yd"], combine_player["Bench"],
                    combine_player["Vertical"], combine_player["Broad Jump"], combine_player["Shuttle"], combine_player["3Cone"]]
                    manualInput = combine_values + [excelPlayer["Pick"], excelPlayer["Round"], excelPlayer["wAV"], excelPlayer["Team"]]
                    connection = sqlite3.connect("databases/data.db")
                    cursor = connection.cursor()
                    cursor.execute("INSERT INTO players VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        (manualInput[0],manualInput[1],manualInput[2],manualInput[3],manualInput[4],manualInput[5],manualInput[6],manualInput[7],manualInput[8],manualInput[9],manualInput[10],manualInput[11],manualInput[12],manualInput[13],manualInput[14],manualInput[15],manualInput[16]))
                    connection.commit()
                    connection.close()
                    break
                else:
                    combine_name = input("Enter combine name, blank to skip ")
                    if (len(combine_name) == 0):
                        break

            if not found:
                print("Unable to find data for " + name + " or "+ nameCleaned)
                count +=1

            # for trait in traits:
            #     value = input ("Enter for trait " + trait + " ")
            #     manualInput.append(value)
            # manualInput = manualInput + [excelPlayer["Pick"], excelPlayer["Round"], excelPlayer["wAV"], excelPlayer["Team"]]
            # table_name = input("Enter table name ")
            #
            # connection = sqlite3.connect("databases/"+table_name+".db")
            # cursor = connection.cursor()
            # cursor.execute("INSERT INTO "+table_name[:-1]+" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            #     (manualInput[0],manualInput[1],manualInput[2],manualInput[3],manualInput[4],manualInput[5],manualInput[6],manualInput[7],manualInput[8],manualInput[9],manualInput[10],manualInput[11],manualInput[12],manualInput[13],manualInput[14],manualInput[15],manualInput[16]))
            # connection.commit()
            # connection.close()

            # print(name)
            # print(name)
            # print(nameCleaned)
    else:
        player_data[nameCleaned] = player_data[nameCleaned][:-3] + [excelPlayer["Pick"], excelPlayer["Round"], excelPlayer["wAV"], excelPlayer["Team"]]
        # print(player_data[name])
# Print the dictionary
for updated_player in player_data.values():
    connection = sqlite3.connect("databases/date.db")
    pickNumber = updated_player[-4] if not updated_player[-4] == '' else -1
    round = updated_player[-3] if not updated_player[-3] == '' else -1
    wAV = updated_player[-2] if not (updated_player[-2] == '' or math.isnan(float(updated_player[-2]))) else -1
    name = updated_player[2]
    College = updated_player[3]
    cursor = connection.cursor()
    sql = '''
    UPDATE players
    SET pickNumber = ?, round = ?, wAV = ?
    WHERE name = ? and College = ?;
    '''
    cursor.execute(sql, (pickNumber, round, wAV, name, College))
    connection.commit()
    connection.close()

print(count)

