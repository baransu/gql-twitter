import { Client, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { USER_TOKEN_KEY } from "@/constants";
import schema from "./introspection.json";

export const client = new Client({
  url: "/api/graphql",
  exchanges: [
    cacheExchange({
      schema,
      resolvers: {
        Query: {
          tweets: relayPagination(),
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = window.localStorage.getItem(USER_TOKEN_KEY);
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
