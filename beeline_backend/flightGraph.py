import json
from collections import defaultdict
from dijkstar import Graph
from dijkstra import find_path

import random

# org = input("Enter the origin airport code: ")
# dest = input("Enter the destination airport code: ")

# Read the JSON file
with open("beeline_backend/flights.json") as file:
    data = json.load(file)

# Create an empty dictionary for the time graph
timeGraph = Graph()
priceGraph = Graph()

adj_list = defaultdict(list)
flightTime = {}

for flight in data:
    origin = flight["origin"]["code"]
    destination = flight["destination"]["code"]
    duration = flight["duration"]["hours"]*60 + flight["duration"]["minutes"]
    price = flight['price']
    timeGraph.add_edge(origin, destination, duration)
    priceGraph.add_edge(origin, destination, price)

    adj_list[origin].append((destination, price))
    arrivalTime = flight.get("arrivalTime")
    departureTime = flight.get("departureTime")

    flightTime[(origin, destination)] = [arrivalTime[11:16]]

def heuristic(u, v, e, prev):
    diff = 0
    if prev[0] != None:
        diff = time_diff(time_converter(flightTime[(prev[0], u)]), time_converter(flightTime[(u, v)]))
    return round(e + diff, 2)

def time_converter(time):
    hours = int(time[0][0:2])
    minutes = int(time[0][3:5])

    return [hours, minutes]

def time_diff(departure, arrival):
    
    hours = departure[0] - arrival[0]
    minutes = departure[1] - arrival[1]
    
    
    if hours < 0:
        hours = 12 + hours

    hourtominutes = hours * 60

    total = minutes + hourtominutes

    return total


def lowest_time(org, dest):
    lowestTime =[]

    while len(lowestTime) < 10:
        # Lowest time 
        path = find_path(timeGraph, org, dest, heuristic_func=heuristic)
        lowestTime.append((path.__getattribute__('nodes'), path.__getattribute__('total_cost')))
        costs = path.__getattribute__('costs')
        lowest_val = min(costs)
        index = costs.index(lowest_val)
        edgeStart = path.__getattribute__('nodes')[index]
        edgeEnd = path.__getattribute__('nodes')[index + 1]
        timeGraph.remove_edge(edgeStart, edgeEnd)

    return lowestTime

def lowest_cost(org, dest):
    lowestCost = []

    while len(lowestCost) < 10:
        # Cheapest cost
        path = find_path(priceGraph, org, dest)
        lowestCost.append((path.__getattribute__('nodes'), path.__getattribute__('total_cost')))
        costs = path.__getattribute__('costs')
        lowest_val = min(costs)
        index = costs.index(lowest_val)
        edgeStart = path.__getattribute__('nodes')[index]
        edgeEnd = path.__getattribute__('nodes')[index + 1]
        priceGraph.remove_edge(edgeStart, edgeEnd)
    
    return lowestCost

# print("Lowest Time")
# for dist in lowestTime:
#     print(dist)

# print("Cheapest Cost")
# for dist in cheapestCost:
#     print(dist)