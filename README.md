# Beeline

# Running instructions 

Open the terminal and run the following commands:
```bash
cd beeline_public
npm i -g yarn
yarn 
npx prisma migrate dev
yarn run dev
````
The test user name is john@example.com and the password is _password_

## Inspiration
During a recent study abroad that we participated in Singapore, we experienced flight cancellation due to inclement weather and we struggled with going out of our way to re-book our flights. Fortunately, all of us were able to be booked on the very next flight but others on the trip were not as lucky and arrived to our program days late and exhuasted from many layovers. We wanted to make it easier for a passenger to be able to glance at alternative routes to help mitigate the stress of travel. 

## What it does
Beeline allows a airline passenger to input their current flight path and searches for alternative routes that lead to the same destination in the event of a cancellation or missed flight. The routes are optimized to minimize cost and travel time and allows the user flexibility to pick what flight best suits their needs.

## How we built it
The application was built with the Remix JavaScript framework for the front end and a Python back-end that interfaces using requests to a hosted server. The server returns shortest paths of mock flight data provided to us by the American Airlines FlightEngine open-source tool.  The Python back-end runs graph algorithms to find the optimal path between airports accounting for travel time and price. 

## Challenges we ran into
The biggest challenge that we ran into is that traditional graph algorithms use _distances_ to represent the weights of edges, but since airplanes have predetermined arrival and departure times, the shortest path in terms of distance is not always the most time or cost efficient. To solve this, we had to use more involved calculations to account for the time in between flights in our algorithms. 

## Accomplishments that we're proud of
We are especially proud of the front-end design as it was built using a framework that none of had experience with. We were able to create a user interface that implements user authentication and allow interoperability with code written in our more familiar languages. 

## What we learned
Our modifications to the graphs and algorithms involved tinkering with the implementations and additions of elements such as heuristic functions, so our understanding of graph theory was certainly expanded. We also got practice in the model-view-controller software architecture pattern that Remix uses. 

## What's next for Beeline
The next steps for Beeline are to add more parameters that the algorithm considers when planning its routes. This could include weather data and the passenger capacity of flights. It could also be extended by adding features such as a map and more visual elements.
