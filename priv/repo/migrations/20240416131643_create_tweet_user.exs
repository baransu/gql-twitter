defmodule Twitter.Repo.Migrations.CreateTweetUser do
  use Ecto.Migration

  def change do
    alter table(:tweets) do
      add :user_id, references(:users, on_delete: :delete_all)
    end
  end
end
