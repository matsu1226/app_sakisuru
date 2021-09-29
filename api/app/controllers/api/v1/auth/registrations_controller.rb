# devise_token_authgemで用意されているDeviseTokenAuth::RegistrationsController(認証の基本機能)を、
# V1::Auth::RegistrationsControllerに継承

# DeviseTokenAuth::RegistrationsController =>
# https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/controllers/devise_token_auth/registrations_controller.rb
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end
end
