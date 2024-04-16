defmodule TwitterWeb.AccountsResolver do
  import TwitterWeb.Gettext

  alias Twitter.Accounts
  alias Twitter.Accounts.Auth
  alias Twitter.Guardian

  def sign_up(user_input) do
    with {:ok, user} <- Accounts.create_user(user_input),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      {:ok, token}
    else
      error -> error
    end
  end

  def sign_in(%{username: username, password: password}) do
    with {:ok, user} <- Auth.authenticate_user(username, password),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      {:ok, token}
    else
      _ -> {:error, dgettext_noop("errors", "Invalid credentials")}
    end
  end
end
