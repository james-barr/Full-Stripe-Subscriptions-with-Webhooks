class Charge < ApplicationRecord
  belongs_to :user

  def receipt
    Receipts::Receipt.new(
      id: id,
      product: "Store",
      company: {
        name: "Example Company, Inc.",
        address: "234 Example Road",
        email: "support@example.com"
      },
      line_items: [
        ["Date", created_at.to_s],
        ["Account Billed", user.email],
        ["Product", "Store Subscription"],
        ["Amount", ActionController::Base.helpers.number_to_currency(amount / 100)],
        ["Card Charged", "#{card_brand} (**** **** **** #{card_last4})"]
      ]
    )
  end
end
