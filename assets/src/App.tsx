import React from "react";
import { Provider } from "urql";
import { client } from "./gql/client";
import { useMeQuery } from "./gql/generated";

export function App() {
  return (
    <Provider value={client}>
      <div className="bg-red-500">hello world</div>
      <Test />
    </Provider>
  );
}

function Test() {
  const [{ data, fetching, error }] = useMeQuery();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data?.me) return <p>No data</p>;

  return (
    <ul>
      <li>{data.me.id}</li>
      <li>{data.me.username}</li>
    </ul>
  );
}
