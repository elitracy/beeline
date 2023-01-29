import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAirplaneById } from "~/models/airplane.server";


export const loader = async ({ params }: LoaderArgs) => {
  const id = params.flightId;

  return id ? json({ airplane: await getAirplaneById(id) }) : json({ airplane: null })
}

export default function FlightDetailsPage() {
  const { airplane } = useLoaderData<typeof loader>();

  const departure_airport = airplane.airports[0];
  const arrival_airport = airplane.airports[1];

  const { arrival_time, departure_time } = airplane;



  return (
    <div>
      {airplane ? (
        <div>
          <h3 className="text-2xl font-bold">{arrival_time}</h3>
          <h3 className="text-2xl font-bold">{departure_airport}</h3>
          <h3 className="text-2xl font-bold">{departure_time}</h3>
          <h3 className="text-2xl font-bold">{arrival_airport}</h3>
        </div>
      ) : (
        <h1>Flight not found</h1>
      )}
    </div>
  );
}
