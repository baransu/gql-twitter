defmodule Twitter.Tweets.Tweet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tweets" do
    field :content, :string

    belongs_to :user, Twitter.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @required_fields ~w(content user_id)a

  @doc false
  def changeset(tweet, attrs) do
    tweet
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
