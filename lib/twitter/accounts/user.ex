defmodule Twitter.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Twitter.Accounts.Auth

  schema "users" do
    field :username, :string

    many_to_many :likes, Twitter.Tweets.Tweet, join_through: Twitter.TweetLikes
    has_many :tweets, Twitter.Tweets.Tweet

    field :hashed_password, :string
    field :password, :string, virtual: true

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
    |> unique_constraint(:username)
    |> hash_password()
  end

  defp hash_password(changeset) do
    changeset
    |> Auth.put_password_hash()
    |> delete_change(:password)
  end
end
