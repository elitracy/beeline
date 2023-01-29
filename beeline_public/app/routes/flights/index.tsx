import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllAirplanesByPassenger, getAllAirportsByPassenger } from "~/models/passenger.server";
import { getPassengerId } from "~/session.server";


export const loader = async ({ request }: LoaderArgs) => {
  const id = await getPassengerId(request);
  const airplanes = await getAllAirplanesByPassenger(id)
  const airports = await getAllAirportsByPassenger(id)
  return { airplanes, airports }
};

export default function flights() {
  const { airplanes, airports } = useLoaderData<typeof loader>();

  const flights = airplanes.map((plane, i) => {
    const departure_airport = airports[i];
    const arrival_airport = airports[i + 1];
    const arrival_time = new Date(plane.arrival_time);
    const departure_time = new Date(plane.departure_time);

    return {
      id: plane.id,
      departure_time: departure_time.toLocaleTimeString('en-US', { timeStyle: 'short' }).toString(),
      departure_date: departure_time.toLocaleDateString('en-US').toString(),
      arrival_time: arrival_time.toLocaleTimeString('en-US', { timeStyle: 'short' }).toString(),
      arrival_date: arrival_time.toLocaleDateString('en-US').toString(),

      departure_airport_id: departure_airport.id,
      departure_airport_name: departure_airport.name,
      departure_airport_city: departure_airport.city,
      departure_airport_country: departure_airport.country,

      arrival_airport_id: arrival_airport.id,
      arrival_airport_name: arrival_airport.name,
      arrival_airport_city: arrival_airport.city,
      arrival_airport_country: arrival_airport.country
    };
  });

  return (
    <main className="w-full h-full">
      <div className="w-1/2 h-1/2 mx-auto">
        <h1 className="text-center text-xl mb-3">Flights</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="w-full">
            {flights.map((flight) => (
              <div className="flex flex-col">
                <div className="w-full flex flex-row justify-between">
                  <span className="flex p-2"><p>{flight.departure_time}</p> <p className="pl-2">{flight.departure_date}</p></span>
                  <h1>{flight.arrival_time}</h1>
                </div>
                <div className="w-full flex flex-row justify-between border-2 border-slate-300 rounded-lg">
                  <h3 className="p-2">{flight.departure_airport_name}</h3>
                  <h3 className="p-2">{flight.arrival_airport_name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
