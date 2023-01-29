import { json } from "@remix-run/node";
type Flight = {
  id: String,
  source_airport: String,
  destination_airport: String,
  departure_time: String,
  arrival_time: String,
  duration: String,
}

const data = [

    {
      id: "1",
      source_airport: "JFK",
      destination_airport: "LAX",
      departure_time: "2022-09-01 10:00",
      arrival_time: "2022-09-01 13:00",
      duration: "3 hours"
    },
    {
      id: "2",
      source_airport: "LAX",
      destination_airport: "SFO",
      departure_time: "2022-09-01 14:00",
      arrival_time: "2022-09-01 15:00",
      duration: "1 hour"
    },
    {
      id: "3",
      source_airport: "SFO",
      destination_airport: "ORD",
      departure_time: "2022-09-01 16:00",
      arrival_time: "2022-09-01 19:00",
      duration: "3 hours"
    }
  ];
 
export async function getFlights(): Promise<Array<Flight>> {
  return data
}

export async function getFlight(flightId: String): Promise<Flight | undefined> {
    return new Promise((resolve) => {
        const flight = data.find(f => f.id === flightId);
        resolve(flight);
    });
}
