from flask import Flask
from flightGraph import lowest_cost, lowest_time
app = Flask(__name__)

@app.route("/")
def no_func():
    return "Hello world"

@app.route("/time/<string1>/<string2>")
def time(string1, string2):
    t = lowest_time(string1, string2)
    return t

@app.route("/cost/<string1>/<string2>")
def cost(string1, string2):
    c = lowest_cost(string1, string2)
    return c

if __name__ == "__main__":
    app.run(port=8080,debug=True)

