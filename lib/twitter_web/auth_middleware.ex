defmodule TwitterWeb.AuthMiddleware do
  @behaviour Absinthe.Middleware

  @impl Absinthe.Middleware
  def call(%Absinthe.Resolution{} = resolution, _config) do
    case resolution.context do
      %{user: _} ->
        resolution

      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "unauthenticated"})
    end
  end
end
