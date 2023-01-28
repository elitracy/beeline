import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";



export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-3xl">
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
            <div className="flex flex-col">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-yellow-500 drop-shadow-md">
                  Beeline
                </span>
              </h1>
              <p className="mx-auto text-slate-400">By American Airlines</p>
            </div>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-xl bg-yellow-500 px-12 py-3 font-bold text-md text-white hover:bg-white hover:text-yellow-500 border-2 border-yellow-500 transition-all duration-100 ease-in-out"
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
