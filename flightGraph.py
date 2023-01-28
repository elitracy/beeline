import json
from collections import defaultdict
import matplotlib.pyplot as plt
from dijkstar import Graph, find_path
import random

# CONSTANTS
# Create a set of cities that are the most popular in the US
popularCities = {"ORD", "ATL", "DFW", "DEN", "LAX", "SFO", "JFK", "PHX"}

# Main
# Read the JSON file
with open("flights.json") as file:
    data = json.load(file)

# Create an empty dictionary for the adjacency list
timeGraph = Graph()
priceGraph = Graph()

adj_list = defaultdict(list)

# Iterate over the rows of the JSON data
# Shuffle the data
random.shuffle(data)

for row in data[:800]:
    origin = row["origin"]["code"]
    destination = row["destination"]["code"]
    distance = row["distance"]
    
    time = row.get("arrivalTime")[11:][0:8]
    print(time)
    # print(time_zone)
    # Cost function based on distance, adding extra weight if in popular cities set and also having a random aspect to it
    price = ((distance * 0.1 if origin in popularCities else random.randint(100, 400))) / 2
    
    distance = distance / 1000.0
    # weightList.append(distance)
    # distanceGraph.add_edge(origin, destination, distance)
    priceGraph.add_edge(origin, destination, price)
        
    # Add the destination to the list of values associated with the origin key
    adj_list[origin].append( (destination,distance,price) )



# def shortestDists():
#     shortestDist =[]
#     path = find_path(distanceGraph, "ORD", "IAH")
#     shortestDist.append((path.__getattribute__('nodes'), path.__getattribute__('total_cost')))


# print("Distance Graph:")

# distanceGraph.remove_edge("ORD", "IAH")
# print(path.__getattribute__('total_cost'))
# print(adj_list['ORD'])


# print("Price Graph:")
# print(find_path(priceGraph, "ORD", "IAH"))

# print(data.get(arrivalTime))
