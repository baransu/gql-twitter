defmodule TwitterWeb.Schema.AccountSchema do
  use Absinthe.Schema.Notation

  alias TwitterWeb.AccountsResolver

  object :account_mutations do
    field :sign_in, non_null(:string) do
      arg(:username, non_null(:string))
      arg(:password, non_null(:string))

      resolve(fn _, args, _ ->
        AccountsResolver.sign_in(args)
      end)
    end

    field :sign_up, non_null(:string) do
      arg(:user, non_null(:user_input))

      resolve(fn _, args, _ ->
        AccountsResolver.sign_up(args.user)
      end)
    end
  end
end
