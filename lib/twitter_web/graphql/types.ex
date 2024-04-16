defmodule TwitterWeb.Schema.Types do
  use Absinthe.Schema.Notation

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  alias Twitter.Accounts.User

  object :user do
    field :id, non_null(:id)
    field :username, non_null(:string)

    field :avatar_url, :string do
      resolve(fn _, %{source: %{id: id}} ->
        index = id |> rem(50)
        {:ok, "https://avatar.iran.liara.run/public/#{index}"}
      end)
    end
  end

  input_object :user_input do
    field :username, non_null(:string)
    field :password, non_null(:string)
  end

  object :tweet do
    field :id, non_null(:id)
    field :content, non_null(:string)
    field :inserted_at, non_null(:datetime)

    field :user, non_null(:user) do
      resolve(dataloader(User))
    end

    field :likes, non_null(:integer) do
      resolve(fn _, %{source: %{id: id}} ->
        {:ok, Twitter.Tweets.get_likes(id)}
      end)
    end
  end
end
