import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getFlights } from "~/models/passenger.server";


export const loader = async () => {
  return json({flights: await getFlights() });
};

export default function Posts() {
  const { flights } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Flights</h1>
      <ul>
        {flights.map((flights) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
