defmodule TwitterWeb.Context do
  @moduledoc """
  Context plug

  Manages users context from the authentication token
  """

  @behaviour Plug

  require Logger

  import Plug.Conn

  alias Twitter.Guardian

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, user} <- authorize(token) do
      %{user: user}
    else
      _ -> %{}
    end
  end

  def authorize(token) do
    {:ok, claims} = Guardian.decode_and_verify(token)
    Guardian.resource_from_claims(claims)
  end
end
