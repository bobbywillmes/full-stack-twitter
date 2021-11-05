class UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: {
        success: true,
        user: @user
      }
    else
      render json: {
        success: false,
        error: @user.errors
      }
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
end
