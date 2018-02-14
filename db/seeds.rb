# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#####----- Create Users -----#####
User.first_or_create! ([
  {
    email: "user@gmail.com",
    password: "testing1",
    password_confirmation: "testing1"
  },
  {
    email: "user2@gmail.com",
    password: "testing1",
    password_confirmation: "testing1"
  },
  {
    email: "user3@gmail.com",
    password: "testing1",
    password_confirmation: "testing1"
  }
])

Product.first_or_create! ([
  {
    name: "Course #1",
    description: "Course Description",
    secret: "Course Secret"
  },
  {
    name: "Course #2",
    description: "Course Description",
    secret: "Course Secret"
  }
])
