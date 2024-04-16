defmodule Twitter.Repo.Migrations.CreateTweets do
  use Ecto.Migration

  def change do
    create table(:tweets) do
      add :content, :string

      timestamps(type: :utc_datetime)
    end
  end
end
