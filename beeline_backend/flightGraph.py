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

visited = set()
flightTime = {}

for flight in data:
    origin = flight["origin"]["code"]
    destination = flight["destination"]["code"]
    duration = flight["duration"]["hours"]*60 + flight["duration"]["minutes"]
    price = flight['price']
    ## For the sake of this demostration data, I am not allowing multiple flights to the same desitination from one airport.
    ## The djsktras path for multiple flights does work, however, the method we use for calculating layovers times doesn't allow this.
    if (origin,destination) in visited:
        continue
    timeGraph.add_edge(origin, destination, duration)
    priceGraph.add_edge(origin, destination, price)

    visited.add( (origin,destination) )
    arrivalTime = flight.get("arrivalTime")
    departureTime = flight.get("departureTime")

    flightTime[(origin, destination)] = [arrivalTime[11:16]]

def heuristic(u, v, e, prev):
    diff = 0
    if prev[0] != None:
        diff = time_diff(time_converter(flightTime[(prev[0], u)]), time_converter(flightTime[(u, v)]))
    return diff

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
    lowestTimes = []

    while len(lowestTimes) < 10:
        # Lowest time 
        path = find_path(timeGraph, org, dest, heuristic_func=heuristic)

        flightpath = path.__getattribute__('nodes')
        airTime = path.__getattribute__('total_cost')
        newTime = airTime

        for i in range(len(flightpath) - 2):
            depart = time_converter(flightTime[(flightpath[i], flightpath[i+1])])
            arrive = time_converter(flightTime[(flightpath[i+1], flightpath[i+2])])
            newTime += time_diff(depart, arrive)
        
        object = {
            "path": flightpath,
            "total time": newTime,
            "airtime": airTime,
        }
        lowestTimes.append(object)

        costs = path.__getattribute__('costs')
        lowest_val = min(costs)
        index = costs.index(lowest_val)
        edgeStart = path.__getattribute__('nodes')[index]
        edgeEnd = path.__getattribute__('nodes')[index + 1]
        timeGraph.remove_edge(edgeStart, edgeEnd)

    return lowestTimes


def lowest_cost(org, dest):
    lowestCosts = []

    while len(lowestCosts) < 10:
        # Cheapest cost
        path = find_path(priceGraph, org, dest)

        flightpath = path.__getattribute__('nodes')
        prices = path.__getattribute__('total_cost')

        object = {
            "path": flightpath,
            "total cost": prices,
        }
        lowestCosts.append(object)

        costs = path.__getattribute__('costs')
        lowest_val = min(costs)
        index = costs.index(lowest_val)
        edgeStart = path.__getattribute__('nodes')[index]
        edgeEnd = path.__getattribute__('nodes')[index + 1]
        priceGraph.remove_edge(edgeStart, edgeEnd)

    return lowestCosts