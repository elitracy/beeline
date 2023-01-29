import json
import random

with open("flights.json") as file:
    data = json.load(file)

random.shuffle(data)

sample_data = data[:100]
# def data():
#     random.shuffle(data)

#     sample_data = data[:800]
#     return sample_data