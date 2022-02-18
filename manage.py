import json
import sqlite3
from scipy import stats
import re

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


def get_player_data(position,year):

    if position == "QB":

        connection = sqlite3.connect("databases/quarterbacks.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM quarterback WHERE year >= ?",(year,)).fetchall()

    elif position == "RB":

        connection = sqlite3.connect("databases/runningbacks.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM runningback WHERE year >= ?",(year,)).fetchall()

    elif position == "WR":

        connection = sqlite3.connect("databases/widereceivers.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM widereceiver WHERE year >= ?",(year,)).fetchall()

    elif position == "OT":

        connection = sqlite3.connect("databases/offensivetackles.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM offensivetackle WHERE year >= ?",(year,)).fetchall()

    elif position == "IOL":

        connection = sqlite3.connect("databases/offensiveguards.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM offensiveguard WHERE year >= ?",(year,)).fetchall()

        connection = sqlite3.connect("databases/centers.db")
        cursor = connection.cursor()
        rows += cursor.execute("SELECT * FROM center WHERE year >= ?",(year,)).fetchall()

    elif position == "TE":

        connection = sqlite3.connect("databases/tightends.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM tightend WHERE year >= ?",(year,)).fetchall()

    elif position == "EDGE":

        connection = sqlite3.connect("databases/outsidelinebackers.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM outsidelinebacker WHERE year >= ?",(year,)).fetchall()

        connection = sqlite3.connect("databases/defensiveends.db")
        cursor = connection.cursor()
        rows += cursor.execute("SELECT * FROM defensiveend WHERE year >= ?",(year,)).fetchall()

    elif position == "DE":

        connection = sqlite3.connect("databases/defensiveends.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM defensiveend WHERE year >= ?",(year,)).fetchall()

    elif position == "IDL":

        connection = sqlite3.connect("databases/defensiveends.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM defensiveend WHERE year >= ?",(year,)).fetchall()
        connection = sqlite3.connect("databases/defensivetackles.db")
        cursor = connection.cursor()
        rows += cursor.execute("SELECT * FROM defensivetackle WHERE year >= ?",(year,)).fetchall()

    elif position == "LB":

        connection = sqlite3.connect("databases/outsidelinebackers.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM outsidelinebacker WHERE year >= ?",(year,)).fetchall()

        connection = sqlite3.connect("databases/insidelinebackers.db")
        cursor = connection.cursor()
        rows += cursor.execute("SELECT * FROM insidelinebacker WHERE year >= ?",(year,)).fetchall()

    elif position == "CB":

        connection = sqlite3.connect("databases/cornerbacks.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM cornerback WHERE year >= ?",(year,)).fetchall()

    elif position == "S":

        connection = sqlite3.connect("databases/freesafetys.db")
        cursor = connection.cursor()
        rows = cursor.execute("SELECT * FROM freesafety WHERE year >= ?",(year,)).fetchall()

        connection = sqlite3.connect("databases/strongsafetys.db")
        cursor = connection.cursor()
        rows += cursor.execute("SELECT * FROM strongsafety WHERE year >= ?",(year,)).fetchall()

    else:
        return None

    return rows
