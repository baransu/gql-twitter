defmodule TwitterWeb.Schema do
  use Absinthe.Schema

  alias TwitterWeb.AuthMiddleware
  alias Twitter.Accounts.User

  import_types(TwitterWeb.Schema.Types)
  import_types(TwitterWeb.Schema.AccountSchema)

  query do
    field :me, :user do
      middleware(AuthMiddleware)

      resolve(fn _, _args, %{context: %{user: user}} ->
        {:ok, user}
      end)
    end

    field :tweets, list_of(non_null(:tweet)) do
      resolve(fn _, _ ->
        tweets = Twitter.Tweets.list_tweets()
        {:ok, tweets}
      end)
    end
  end

  mutation do
    import_fields(:account_mutations)

    field :create_tweet, type: :tweet do
      middleware(AuthMiddleware)

      arg(:content, non_null(:string))

      resolve(fn _, args, %{context: %{user: user}} ->
        Twitter.Tweets.create_tweet(user.id, %{content: args.content})
        |> IO.inspect()
      end)
    end
  end

  @impl true
  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(User, Dataloader.Ecto.new(Twitter.Repo))

    ctx |> Map.put(:loader, loader)
  end

  @impl true
  def plugins() do
    [Absinthe.Middleware.Dataloader | Absinthe.Plugin.defaults()]
  end
end
