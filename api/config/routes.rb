Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # https://devise-token-auth.gitbook.io/devise-token-auth/usage
      mount_devise_token_auth_for 'User', at: 'auth'

      # 
    end
  end
end
