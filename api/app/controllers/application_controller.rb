class ApplicationController < ActionController::API
	# https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/controllers/devise_token_auth/concerns/set_user_by_token.rb
  include DeviseTokenAuth::Concerns::SetUserByToken
	
	skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?
end
