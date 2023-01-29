import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getFlights } from "~/models/passenger.server";


export const loader = async () => {
  return json({flights: await getFlights() });
};

export default function flights() {
  const { flights } = useLoaderData<typeof loader>();
  return (
    <main className="w-full h-full">
      <div className="w-1/2 h-1/2 mx-auto">
        <h1 className="text-center text-xl mb-3">Flights</h1>
        <ul className="flex flex-col justify-center items-center ">
          {flights.map((flight,index) => (
            <Link key={index} to={`${flight.id}`} className="w-full h-full mb-3">
              <div className="flex w-full mx-auto justify-between px-2">
                <p>{flight.arrival_time}</p>
                <p>{flight.departure_time}</p>
              </div>
              <div className="flex w-full h-1/2 mx-auto justify-between border-slate-200 border-2 rounded-lg my-1">
                <p className="text-left py-3 px-2">{flight.source_airport} </p>
                <p className="text-right py-3 px-2">{flight.destination_airport} </p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </main>
      );
}
