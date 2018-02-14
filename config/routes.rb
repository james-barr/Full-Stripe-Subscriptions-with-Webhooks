Rails.application.routes.draw do

  mount StripeEvent::Engine, at: '/webhooks/stripe'



  devise_for :users, path: 'users', controllers: {
    sessions: 'users/sessions',
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    unlocks: 'users/unlocks'
  }


  resources :products

  resource :subscription
  resources :plans
  resource :card
  resources :charges

  root to: "products#index"

end
