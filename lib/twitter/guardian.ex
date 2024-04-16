defmodule Twitter.Guardian do
  use Guardian, otp_app: :twitter

  alias Twitter.Accounts

  @impl Guardian
  def subject_for_token(user, _claims) do
    {:ok, to_string(user.id)}
  end

  @impl Guardian
  def resource_from_claims(%{"sub" => id}) do
    case Accounts.get_user!(id) do
      nil -> {:error, :resource_not_found}
      user -> {:ok, user}
    end
  end
end
