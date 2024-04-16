/* eslint-disable */
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  createTweet?: Maybe<Tweet>;
  signIn: Scalars['String']['output'];
  signUp: Scalars['String']['output'];
};


export type RootMutationTypeCreateTweetArgs = {
  content: Scalars['String']['input'];
};


export type RootMutationTypeSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type RootMutationTypeSignUpArgs = {
  user: UserInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  me?: Maybe<User>;
  tweets?: Maybe<Array<Tweet>>;
};

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'RootQueryType', me?: { __typename?: 'User', id?: string | null, username?: string | null } | null };


export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};