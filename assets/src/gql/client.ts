import { Client, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { USER_TOKEN_KEY } from "@/constants";
import {
  TweetFragment,
  TweetsDocument,
  TweetsQuery,
  TweetsQueryVariables,
} from "./generated";

export const client = new Client({
  url: "/api/graphql",
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          createTweet: (result, _args, cache, _info) => {
            const linksPages = cache
              .inspectFields("Query")
              .filter((field) => field.fieldName === "tweets");

            if (linksPages.length > 0) {
              const firstField = linksPages[0];

              cache.updateQuery<TweetsQuery, TweetsQueryVariables>(
                {
                  query: TweetsDocument,
                  variables: firstField.arguments as TweetsQueryVariables,
                },
                (data) => {
                  if (!data) return data;
                  if (!data.tweets) return data;

                  return {
                    ...data,
                    tweets: {
                      ...data.tweets,
                      edges: [
                        {
                          __typename: "TweetEdge",
                          node: {
                            __typename: "Tweet",
                            ...(result.createTweet as TweetFragment),
                          },
                        },
                        ...(data.tweets?.edges ?? []),
                      ],
                    },
                  };
                },
              );
            }
          },
        },
      },
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
