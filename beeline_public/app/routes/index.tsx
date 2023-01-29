import { Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { useOptionalPassenger } from "~/utils";
import bee from "public/bee.png";



export default function Index() {
  if (useOptionalPassenger()) {
    console.log('redirecting')
    redirect('/flights', 200)
  }
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center bg-[url(app/images/hexagon.jpg)]">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-3xl bg-white">
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <div className="flex flex-col">
                <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                  <span className="block uppercase text-yellow-500 drop-shadow-xl">
                    Beeline
                  </span>
                </h1>
                <img src={bee} className="w-20 h-20 mx-auto" />
                <p className="mx-auto text-slate-400">By American Airlines</p>
              </div>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto">
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-xl bg-yellow-500 px-12 py-3 font-bold text-md text-white hover:scale-95 border-2 border-yellow-500 transition-all duration-100 ease-in-out"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
