Rails.configuration.stripe = {
  :publishable_key => Rails.application.secrets.stripe_public_key,
  :secret_key => Rails.application.secrets.stripe_secret_key
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]

StripeEvent.configure do |events|
  events.subscribe 'charge.failed', Webhooks::ChargeFailed.new

  events.subscribe 'charge.succeeded', Webhooks::ChargeSucceeded.new

end
