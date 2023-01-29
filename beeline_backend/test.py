# from dijkstar import Graph
# import random
# from dijkstra import find_path
# from data import sample_data
# from collections import defaultdict
# #-----------------------------------------
# popularCities = {"ORD", "ATL", "DFW", "DEN", "LAX", "SFO", "JFK", "PHX"}

# graph = Graph()

# adj_list = defaultdict(list)
# flightTime = {}
# flightTimeLeave = {}

# for row in sample_data:
#     origin = row["origin"]["code"]
#     destination = row["destination"]["code"]
#     price = round((row["distance"] * 0.04) + (random.randint(150, 250) if destination in popularCities else 100), 2)
#     duration = row["duration"]["hours"]*60 + row["duration"]["minutes"]
#     graph.add_edge(origin, destination, duration)
#     adj_list[origin].append((destination, price))

#     arrivalTime = row.get("arrivalTime")
#     departureTime = row.get("departureTime")

#     flightTime[(origin, destination)] = [arrivalTime[11:16]]


# def heuristic(u, v, e, prev):
#     diff = 0
#     if prev[0] != None:
#         diff = time_diff(time_converter(flightTime[(prev[0], u)]), time_converter(flightTime[(u, v)]))
#     return round(e + diff, 2)

# def time_converter(time):
#     hours = int(time[0][0:2])
#     minutes = int(time[0][3:5])

#     return [hours, minutes]

# def time_diff(departure, arrival):
#     hours = departure[0] - arrival[0]
#     minutes = departure[1] - arrival[1]
    

#     if hours < 0:
#         hours = 24 + hours

#     hourtominutes = hours * 60

#     total = minutes + hourtominutes
#     return total

# shortest = find_path(graph, "ORD", "IAH", cost_func=heuristic)


# print(shortest)

# #-----------------------------------------