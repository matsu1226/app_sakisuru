# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable
  # https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/models/devise_token_auth/concerns/user.rb
  include DeviseTokenAuth::Concerns::User
end
