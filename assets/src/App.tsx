import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Provider } from "urql";
import { client } from "./gql/client";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  TweetFragment,
  useCreateTweetMutation,
  useMeQuery,
  useSignInMutation,
  useSignUpMutation,
  useTweetsQuery,
} from "./gql/generated";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { USER_TOKEN_KEY } from "./constants";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import uniqBy from "lodash/uniqBy";

type Page = "home" | "signin" | "signup";

export function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <Provider value={client}>
      <Navigation changePage={setPage} />
      {page === "home" && <Home />}
      {page === "signin" && <SignIn changePage={setPage} />}
      {page === "signup" && <SignUp changePage={setPage} />}
      <Toaster />
    </Provider>
  );
}

function SignIn({ changePage }: { changePage: (p: Page) => void }) {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const [, signIn] = useSignInMutation();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signIn({
      username: values.username,
      password: values.password,
    });

    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      const token = result.data?.token!;

      window.localStorage.setItem(USER_TOKEN_KEY, token);
      changePage("home");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto max-w-96"
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Sign In!
        </h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="tomasz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Str0ngPass!" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
}

function SignUp({ changePage }: { changePage: (p: Page) => void }) {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const [, signUp] = useSignUpMutation();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signUp({
      user: {
        username: values.username,
        password: values.password,
      },
    });

    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      const token = result.data?.token!;

      window.localStorage.setItem(USER_TOKEN_KEY, token);
      changePage("home");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto max-w-96"
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Sign Up!
        </h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="tomasz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Str0ngPass!" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}

function Home() {
  const [{ data }] = useMeQuery();

  const loggedIn = data?.me;

  return (
    <div className="flex items-center mt-2 flex-col space-y-4">
      {loggedIn ? <TweetInput /> : null}
      <Tweets />
    </div>
  );
}

function Navigation({ changePage }: { changePage: (p: Page) => void }) {
  const [{ data }] = useMeQuery();

  const loggedIn = data?.me;

  return (
    <div className="w-full flex p-4 justify-between items-center">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Not Twitter
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              role="button"
              onClick={() => changePage("home")}
              className={navigationMenuTriggerStyle()}
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          {loggedIn ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                role="button"
                onClick={() => {
                  window.localStorage.removeItem(USER_TOKEN_KEY);
                  window.location.reload();
                }}
                className={navigationMenuTriggerStyle()}
              >
                Sign out
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  role="button"
                  onClick={() => changePage("signin")}
                  className={navigationMenuTriggerStyle()}
                >
                  Sign in
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  role="button"
                  onClick={() => changePage("signup")}
                  className={navigationMenuTriggerStyle()}
                >
                  Sign up
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function TweetInput() {
  const [input, setInput] = useState("");
  const [{ fetching }, createTweet] = useCreateTweetMutation();

  const onSubmit = async () => {
    await createTweet({ content: input });
    setInput("");
  };

  return (
    <div className="flex space-y-2 flex-col w-[350px]">
      <Textarea
        placeholder="What's on your mind?"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className="w-full"
        disabled={fetching || input.length < 1 || input.length > 240}
        onClick={onSubmit}
      >
        {fetching ? "Tweeting..." : "Tweet"}
      </Button>
    </div>
  );
}

function Tweets() {
  const [after, setAfter] = useState<string | undefined>();
  const [{ data, fetching, error }] = useTweetsQuery({
    variables: {
      first: 10,
      after,
    },
  });

  // todo: add subscription
  // todo: add likes (and like subscription)

  const fetchMore = useCallback(() => {
    if (data?.tweets?.pageInfo.hasNextPage) {
      const cursor = data.tweets.pageInfo.endCursor;
      if (cursor) {
        setAfter(cursor);
      }
    }
  }, [data?.tweets?.pageInfo]);

  const tweets = useMemo(
    () => data?.tweets?.edges?.map((edge) => edge?.node).filter(isNotNull),
    [data?.tweets?.edges],
  );

  const hasMore = useMemo(() => data?.tweets?.pageInfo.hasNextPage ?? true, []);

  if (fetching && !tweets) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Oh, no... {error.message}</p>;

  return (
    <div>
      <h3 className="scroll-m-20 mb-5 text-2xl font-semibold tracking-tight">
        Latest tweets
      </h3>
      <InfiniteScroll
        className="space-y-4"
        dataLength={tweets.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={null} // <h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Begining of time!</b>
          </p>
        }
        pullDownToRefresh={false}
      >
        {tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      </InfiniteScroll>
    </div>
  );
}

function isNotNull<T>(x: T | null | undefined): x is NonNullable<T> {
  return x !== null && x !== undefined;
}

function Tweet({
  tweet,
}: {
  tweet: {
    id: string;
    content: string;
    insertedAt: string;
    user: {
      id: string;
      username: string;
      avatarUrl?: string | null;
    };
  };
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-sm flex space-x-4 items-center justify-between">
          <div className="flex space-x-4 items-center">
            <Avatar className="w-6 h-6">
              {tweet.user.avatarUrl ? (
                <AvatarImage
                  src={tweet.user.avatarUrl}
                  alt={tweet.user.username}
                />
              ) : null}
              <AvatarFallback>
                {tweet.user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{tweet.user.username}</span>
          </div>
          <span className="text-muted-foreground text-right">
            {new Date(tweet.insertedAt).toLocaleString()}
          </span>
        </CardTitle>
        <CardDescription>
          {tweet.id} | {tweet.content}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
