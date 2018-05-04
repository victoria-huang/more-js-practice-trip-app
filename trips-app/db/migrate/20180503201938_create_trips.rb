class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :location
      t.decimal :price
      t.string :duration
      t.belongs_to :user
      
      t.timestamps
    end
  end
end
