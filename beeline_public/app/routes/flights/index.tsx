import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllAirplanesByPassenger, getAllAirportsByPassenger, getAltFlights } from "~/models/passenger.server";
import { getPassengerId } from "~/session.server";
import planeIcon from "public/plane.png";
import type { Flight } from "~/models/passenger.server"


export const loader = async ({ request }: LoaderArgs) => {
  const id = await getPassengerId(request);
  const airplanes = await getAllAirplanesByPassenger(id)
  const airports = await getAllAirportsByPassenger(id)

  let altFlights: Flight[] = []
  for (let a in airports) {
    altFlights.push(await getAltFlights(a, a))
  }
  return { airplanes, airports, altFlights }
};

export default function flights() {
  const { airplanes, airports, altFlights } = useLoaderData<typeof loader>();

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
    <main className="w-full h-full bg-[url(app/images/hexagon.jpg)] overflow-hidden">
        <div className="grid grid-cols-2 gap-0 w-full h-full">
          <div className="grid grid-rows-2 gap-0 w-full h-full ">
            <div className="relative sm:pb-12 sm:pt-8 h-full">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 h-full ">
                <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-3xl bg-white h-full overflow-scroll">
                  <div className="relative px-4 pt-12 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-0 lg:pt-16 h-full">
                    <div className="flex flex-col">
                      <h1 className="text-center text-xl mb-3">Flights</h1>
                      <div className="flex flex-col justify-center items-center">
                        <div className="w-full">
                          {flights.map((flight) => (
                            <div className="flex flex-col">
                              <div className="w-full flex flex-row justify-between">
                                <span className="flex p-2"><p>{flight.departure_time}</p> <p className="pl-2">{flight.departure_date}</p></span>
                                <span className="flex p-2"><p>{flight.arrival_time}</p> <p className="pl-2">{flight.arrival_date}</p></span>
                              </div>
                              <div className="w-full flex flex-row justify-between border-2 border-slate-300 rounded-lg ">
                                <h3 className="p-2">{flight.departure_airport_name}</h3>
                                <img className="w-10 h-10" src={planeIcon} alt="airplane" />
                                <h3 className="p-2">{flight.arrival_airport_name}</h3>
                              </div>
                            </div>
                          ))}
                          </div>
                        </div>    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative sm:pb-16 sm:pt-8 w-full h-full">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 h-full">
                <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-3xl bg-white h-full">
                  <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-16">
                    <div className="flex flex-col">
                      <h1 className="text-center text-xl mb-3">Past Flights</h1>
                      <div className="flex flex-col justify-center items-center">
                        <div className="w-full">
                          {flights.map((flight) => (
                            <div className="flex flex-col">
                              <div className="w-full flex flex-row justify-between">
                                <span className="flex p-2"><p>{flight.departure_time}</p> <p className="pl-2">{flight.departure_date}</p></span>
                                <span className="flex p-2"><p>{flight.arrival_time}</p> <p className="pl-2">{flight.arrival_date}</p></span>
                              </div>
                              <div className="w-full flex flex-row justify-between border-2 border-slate-300 rounded-lg ">
                                <h3 className="p-2">{flight.departure_airport_name}</h3>
                                <img className="w-10 h-10" src={planeIcon} alt="airplane" />
                                <h3 className="p-2">{flight.arrival_airport_name}</h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>    
                    
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        <div className="relative sm:pb-16 sm:pt-8 h-full">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 h-full">
            <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-3xl bg-white h-full">
              <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-16 h-full">
                <div className="flex flex-col">
                  <h1 className="text-center text-xl mb-3">More Flights</h1>
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-full">
                      {flights.map((flight) => (
                        <div className="flex flex-col">
                        <div className="w-full flex flex-row justify-between">
                          <span className="flex p-2"><p>{flight.departure_time}</p> <p className="pl-2">{flight.departure_date}</p></span>
                          <span className="flex p-2"><p>{flight.arrival_time}</p> <p className="pl-2">{flight.arrival_date}</p></span>
                        </div>
                        <div className="w-full flex flex-row justify-between border-2 border-slate-300 rounded-lg ">
                          <h3 className="p-2">{flight.departure_airport_name}</h3>
                          <img className="w-10 h-10" src={planeIcon} alt="airplane" />
                          <h3 className="p-2">{flight.arrival_airport_name}</h3>
                        </div>
                      </div>
                      ))}
                    </div>    
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>                   
    </main>
    );
}
