from queue import PriorityQueue
import json
from collections import defaultdict
import random
# from dijkstar import Graph
with open("flights.json") as file:
    data = json.load(file)

adj_list = defaultdict(list)

# graph = Graph()
# graph.add_edge("A", "B", 3)
random.shuffle(data)

for row in data[:800]:
    origin = row["origin"]["code"]
   
    destination = row["destination"]["code"]
    duration = row["duration"]
    price = 0

    adj_list['origin'].append(Flight(destination, price, duration))


def dijkstra(graph, source):
    # Initialize the priority queue and distances dictionary
    pq = PriorityQueue()
    distances = {vertex: float('infinity') for vertex in graph}
    pq.put((0, source))
    distances[source] = 0
    last_edge = {}
    last_edge[source] = None
    while not pq.empty():
        current_dist, current_vertex = pq.get()
        if current_dist > distances[current_vertex]:
            continue
        for neighbor, weight in graph[current_vertex].items():
            #calculate new weight depending on the last edge
            if last_edge[current_vertex] is not None:
                weight = weight + last_edge[current_vertex]
            if current_dist + weight < distances[neighbor]:
                distances[neighbor] = current_dist + weight
                last_edge[neighbor] = weight
                pq.put((distances[neighbor], neighbor))
    return distances
dijkstra(adj_list, "A")