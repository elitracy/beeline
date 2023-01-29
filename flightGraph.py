import json
from collections import defaultdict
import matplotlib.pyplot as plt
from dijkstar import Graph
from dijkstra import find_path
import random

org = input("Enter the origin airport code: ")
dest = input("Enter the destination airport code: ")

# Read the JSON file
with open("flights.json") as file:
    data = json.load(file)

# Create an empty dictionary for the time graph
timeGraph = Graph()
priceGraph = Graph()

for flight in data:
    origin = flight["origin"]["code"]
    destination = flight["destination"]["code"]
    duration = round(flight['duration']['hours'] + (flight['duration']['minutes'] / 60), 3)
    price = flight['price']
    timeGraph.add_edge(origin, destination, duration)
    priceGraph.add_edge(origin, destination, price)

lowestTime =[]
cheapestCost = []
while len(lowestTime) < 10:
    # Lowest time 
    path = find_path(timeGraph, org, dest)
    lowestTime.append((path.__getattribute__('nodes'), path.__getattribute__('total_cost')))
    costs = path.__getattribute__('costs')
    lowest_val = min(costs)
    index = costs.index(lowest_val)
    edgeStart = path.__getattribute__('nodes')[index]
    edgeEnd = path.__getattribute__('nodes')[index + 1]
    timeGraph.remove_edge(edgeStart, edgeEnd)

    #Cheapest cost
    path = find_path(priceGraph, org, dest)
    cheapestCost.append((path.__getattribute__('nodes'), path.__getattribute__('total_cost')))
    costs = path.__getattribute__('costs')
    lowest_val = min(costs)
    index = costs.index(lowest_val)
    edgeStart = path.__getattribute__('nodes')[index]
    edgeEnd = path.__getattribute__('nodes')[index + 1]
    priceGraph.remove_edge(edgeStart, edgeEnd)
    
print("Lowest Time")
for dist in lowestTime:
    print(dist)

print("Cheapest Cost")
for dist in cheapestCost:
    print(dist)