import { Client, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

export const client = new Client({
  url: "/api/graphql",
  exchanges: [cacheExchange({}), fetchExchange],
});
