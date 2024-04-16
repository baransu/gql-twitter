defmodule TwitterWeb.Schema.Types do
  use Absinthe.Schema.Notation

  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  alias Twitter.Accounts.User

  object :user do
    field :id, :id
    field :username, :string
  end

  input_object :user_input do
    field :username, non_null(:string)
    field :password, non_null(:string)
  end

  object :tweet do
    field :id, :id
    field :content, :string

    field :user, non_null(list_of(non_null(:user))) do
      resolve(dataloader(User))
    end

    field :likes, :integer
  end
end
