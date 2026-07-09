class Expense < ApplicationRecord
  belongs_to :category
  def date
    created_at&.to_date
  end
end
