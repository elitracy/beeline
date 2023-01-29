import { json, LoaderArgs } from "@remix-run/node";
import {useLoaderData } from "@remix-run/react";
import { getFlight } from "~/models/passenger.server";

export const loader = async ({params} : LoaderArgs ) => {
  const id = params.flightId;
  
  return id ? json({flight: await getFlight(id)}) : json({flight: null})
}

export default function FlightDetailsPage() {
  const { flight } = useLoaderData<typeof loader>();

  return (
      <div>
        {flight ? (
          <div>
            <h3 className="text-2xl font-bold">{flight.source_airport}</h3>
            <h3 className="text-2xl font-bold">{flight.destination_airport}</h3>
          </div>
        ) : (
          <h1>Flight not found</h1>
        )} 
      </div>
      );
}
