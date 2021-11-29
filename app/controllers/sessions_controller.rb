class SessionsController < ApplicationController
  def create
    puts 'Session create -----'
    puts params
    @user = User.find_by(username: params[:user][:username])
  
    if @user and BCrypt::Password.new(@user.password_digest) == params[:user][:password]
      session = @user.sessions.create
      cookies.permanent.signed[:twitter_session_token] = {
        value: session.token,
        httponly: true
      }
      render json: {
        success: true,
        session: session,
        user: @user
      }
    else
      render json: {
        success: false
      }
    end
  end


  def authenticated
    token = cookies.permanent.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    if session
      @user = session.user
      render json: {
        success: true,
        user: @user
      }
    else
      render json: {
        authenticated: false
      }
    end
  end

  def destroy
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    if session and session.destroy
      render json: {
        success: true
      }
    end
  end
end
