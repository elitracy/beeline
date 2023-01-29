import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllAirplanesByPassenger, getAllAirportsByPassenger, getAltFlights } from "~/models/passenger.server";
import { getPassengerId } from "~/session.server";
import planeIcon from "public/plane.png";
import type { Flight } from "~/models/passenger.server"
import { useState } from "react";


export const loader = async ({ request }: LoaderArgs) => {
  const id = await getPassengerId(request);
  const airplanes = await getAllAirplanesByPassenger(id)
  const airports = await getAllAirportsByPassenger(id)
  let altFlights = []

  if (airports.length > 2) {
    for (let i in airports.slice(0, -1)) altFlights.push(await getAltFlights(airports[i], airports[airports.length - 1]))
  }

  return { airplanes, airports, altFlights }
};

export default function flights() {
  const { airplanes, airports, altFlights } = useLoaderData<typeof loader>();
  const [currentAltFlights, setCurrentAltFlights] = useState(0)
  const [booked, setBooked] = useState(-1)
  const [selected, setSelected] = useState(-1)

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

      departure_airport: departure_airport,
      arrival_airport: arrival_airport,
    };
  });

  const firstDepart = new Date(airplanes[0].departure_time)
  const lastArrive = new Date(airplanes[airplanes.length - 1].arrival_time)

  const totalHours = Math.floor((lastArrive.getTime() - firstDepart.getTime()) / 1000 / 60 / 60)
  const totalMinutes = Math.floor((lastArrive.getTime() - firstDepart.getTime()) / 1000 / 60 % 60) < 10 ? `0${Math.floor((lastArrive.getTime() - firstDepart.getTime()) / 1000 / 60 % 60)}` : Math.floor((lastArrive.getTime() - firstDepart.getTime()) / 1000 / 60 % 60)

  return (
    <main className="w-full h-full bg-[url(app/images/hexagon.jpg)] overflow-hidden">
      <div className="grid grid-cols-2 gap-4 m-4">
        <div className="gap-4  w-full h-[100vh]">
          <div className="relative shadow-2xl sm:rounded-3xl bg-white overflow-y-scroll pb-6">
            <div className="relative px-4 pt-6 ">
              <div className="flex flex-col">
                <h1 className="text-center text-xl mb-4 py-4">Flights</h1>
                <div className="flex flex-col justify-center items-center">
                  <h2 className={`text-center -mb-7 font-black`}>{totalHours}:{totalMinutes} Total </h2>
                  <div className="w-full">
                    {flights.map((flight, i) => (
                      <div className="flex flex-col">
                        <div className="w-full flex flex-row justify-between">
                          <span className="flex p-2"><p>{flight.departure_time}</p> <p className="pl-2">{flight.departure_date}</p></span>
                          <span className="flex p-2"><p>{flight.arrival_time}</p> <p className="pl-2">{flight.arrival_date}</p></span>
                        </div>
                        <div className={`w-full flex flex-row justify-between ${currentAltFlights === i ? "border-4 border-slate-500" : "border-2"} hover:border-4 hover:border-slate-500  border-slate-300 rounded-lg aria-pressed::scale-95 transition-all ease-in-out duration-150 cursor-pointer`}
                          onClick={() => { setCurrentAltFlights(i) }}
                        >
                          <h3 className="p-2">{flight.departure_airport.name}</h3>
                          <img className="w-10 h-10" src={planeIcon} alt="airplane" />
                          <h3 className="p-2">{flight.arrival_airport.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative pb-8  h-[100vh] ">
          <div className="relative shadow-2xl sm:rounded-3xl bg-white h-full overflow-y-scroll scroll-smooth ">
            <div className="relative px-4 pt-6 ">
              <div className="flex flex-col pb-6">
                <h1 className="sticky top-0 py-4 bg-white text-center text-xl mb-3 ">Alternative Routes</h1>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-full">
                    {currentAltFlights >= 0 ? altFlights[currentAltFlights].slice(0, -1).map((flight, i) => {
                      let hours = Math.floor(flight['total time'] / 60)
                      let minutes = flight['total time'] % 60 < 10 ? `0${flight['total time'] % 60}` : flight['total time'] % 60
                      return (
                        <div className="my-4 mb-6">
                          <div className="w-full">
                            <div className="flex flex-row justify-center">
                              <h2 className="text-center -mb-5 font-black">{hours}:{minutes} Total </h2>
                            </div >
                            {flight.path.slice(0, -1).map((airport, j) => {

                              const departTime = new Date(Date.parse(flight.departList[j]))
                              const arriveTime = new Date(Date.parse(flight.arriveList[j]))

                              return (
                                <div className="flex flex-col space-around w-full mb-2">
                                  <div className="flex flex-row w-full justify-between px-3 pb-1">
                                    <h1>{departTime.toLocaleTimeString('en-US', { timeStyle: 'short' })}</h1>
                                    <h1>{arriveTime.toLocaleTimeString('en-US', { timeStyle: 'short' })}</h1>
                                  </div>
                                  <div className={`flex flex-row w-full justify-between border-2 hover:border-4 transition-all ease-in-out duration-150 cursor-pointer ${i <= 0 && selected <= 0 ? "border-yellow-300" : "border-slate-300"} ${selected === i && "bg-yellow-300" && "border-yellow-300"} rounded-lg`}
                                    onClick={() => { setSelected(i) }}
                                  >
                                    <h1 className="p-2">{airport}</h1>
                                    <img className="w-10 h-10" src={planeIcon} alt="airplane" />
                                    <h1 className="p-2">{flight.path[j + 1]}</h1>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <hr className="bg-yellow-300 mt-4" />
                        </div>
                      )
                    }) : (<h1 className="text-center mt-12 font-medium">No Flight Selected</h1>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
