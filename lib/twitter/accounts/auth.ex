defmodule Twitter.Accounts.Auth do
  @moduledoc """
  Manages accounts auth
  """

  import Ecto.Query
  alias Twitter.Repo
  alias Ecto.Changeset
  alias Twitter.Accounts.User

  def authenticate_user(username, plain_text_password) do
    result =
      from(u in User, where: u.username == ^username)
      |> Repo.one()
      |> validate_password(plain_text_password)

    case result do
      {:ok, user} ->
        {:ok, user}

      {:error, _error} ->
        {:error, :invalid_credentials}
    end
  end

  @doc """
  Update User Changeset with hashed_password
  """
  def put_password_hash(%Changeset{valid?: true, changes: %{password: password}} = changeset) do
    changeset
    |> Changeset.change(Argon2.add_hash(password, hash_key: :hashed_password))
  end

  def put_password_hash(changeset), do: changeset

  defp validate_password(user, password) do
    Argon2.check_pass(user, password, hash_key: :hashed_password)
  end
end
