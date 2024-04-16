defmodule Twitter.Repo.Migrations.TweetLikes do
  use Ecto.Migration

  def change do
    create table(:tweet_likes) do
      add :tweet_id, references(:tweets, on_delete: :delete_all)
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:tweet_likes, [:tweet_id])
    create index(:tweet_likes, [:user_id])
    create unique_index(:tweet_likes, [:tweet_id, :user_id])
  end
end
