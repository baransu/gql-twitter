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
  DateTime: { input: any; output: any; }
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
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
  tweets?: Maybe<TweetConnection>;
};


export type RootQueryTypeTweetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Tweet = {
  __typename?: 'Tweet';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  insertedAt: Scalars['DateTime']['output'];
  likes: Scalars['Int']['output'];
  user: User;
};

export type TweetConnection = {
  __typename?: 'TweetConnection';
  edges?: Maybe<Array<Maybe<TweetEdge>>>;
  pageInfo: PageInfo;
};

export type TweetEdge = {
  __typename?: 'TweetEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Tweet>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type TweetFragment = { __typename?: 'Tweet', id: string, content: string, insertedAt: any, likes: number, user: { __typename?: 'User', id: string, username: string, avatarUrl?: string | null } };

export type UserFragment = { __typename?: 'User', id: string, username: string, avatarUrl?: string | null };

export type CreateTweetMutationVariables = Exact<{
  content: Scalars['String']['input'];
}>;


export type CreateTweetMutation = { __typename?: 'RootMutationType', createTweet?: { __typename?: 'Tweet', id: string, content: string, insertedAt: any, likes: number, user: { __typename?: 'User', id: string, username: string, avatarUrl?: string | null } } | null };

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'RootMutationType', token: string };

export type SignUpMutationVariables = Exact<{
  user: UserInput;
}>;


export type SignUpMutation = { __typename?: 'RootMutationType', token: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'RootQueryType', me?: { __typename?: 'User', id: string, username: string, avatarUrl?: string | null } | null };

export type TweetsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type TweetsQuery = { __typename?: 'RootQueryType', tweets?: { __typename?: 'TweetConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges?: Array<{ __typename?: 'TweetEdge', node?: { __typename?: 'Tweet', id: string, content: string, insertedAt: any, likes: number, user: { __typename?: 'User', id: string, username: string, avatarUrl?: string | null } } | null } | null> | null } | null };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  avatarUrl
}
    `;
export const TweetFragmentDoc = gql`
    fragment Tweet on Tweet {
  id
  content
  insertedAt
  likes
  user {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const CreateTweetDocument = gql`
    mutation CreateTweet($content: String!) {
  createTweet(content: $content) {
    ...Tweet
  }
}
    ${TweetFragmentDoc}`;

export function useCreateTweetMutation() {
  return Urql.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument);
};
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  token: signIn(username: $username, password: $password)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const SignUpDocument = gql`
    mutation SignUp($user: UserInput!) {
  token: signUp(user: $user)
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const TweetsDocument = gql`
    query Tweets($first: Int!, $after: String) {
  tweets(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...Tweet
      }
    }
  }
}
    ${TweetFragmentDoc}`;

export function useTweetsQuery(options: Omit<Urql.UseQueryArgs<TweetsQueryVariables>, 'query'>) {
  return Urql.useQuery<TweetsQuery, TweetsQueryVariables>({ query: TweetsDocument, ...options });
};