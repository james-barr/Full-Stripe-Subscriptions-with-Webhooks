Rails.application.routes.draw do
  devise_for :users
  resources :products

  resource :subscription
  resources :plans
  resource :card

  root to: "products#index"

end
