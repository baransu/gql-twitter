defmodule Twitter.TweetLikes do
  use Ecto.Schema
  import Ecto.Changeset

  alias Twitter.Tweets.Tweet
  alias Twitter.Accounts.User

  @primary_key false
  schema "tweet_likes" do
    belongs_to :user, User, primary_key: true
    belongs_to :tweet, Tweet, primary_key: true

    timestamps(type: :utc_datetime)
  end

  @required_fields ~w(tweet_id user_id)a

  def changeset(feed_source, attrs \\ %{}) do
    feed_source
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:tweet_id)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint([:tweet, :user])
  end
end
