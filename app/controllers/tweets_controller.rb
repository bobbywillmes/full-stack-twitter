class TweetsController < ApplicationController
  def index
    @tweets = Tweet.all.order(created_at: :desc)
    render 'api/tweets/index'
  end

  def create
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)
    user = session.user
    @tweet = user.tweets.new(tweet_params)
    @tweets = user.tweets

    if @tweet.save
      render json: {
        tweet: @tweet,
        tweets: @tweets
      }
    end
  end

  def destroy
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    return render json: { success: false } unless session

    user = session.user
    tweet = Tweet.find_by(id: params[:id])

    if tweet and tweet.user == user and tweet.destroy
      render json: {
        success: true
      }
    elsif !(tweet.user == user)
      render json: {
        success: false,
        error: 'Can\'t delete someone else\'s tweet.'
      }
    else
      render json: {
        success: false
      }
    end
  end

  def index_by_user
    user = User.find_by(username: params[:username])

    if user
      @tweets = user.tweets
      render json: {
        tweets: @tweets
      }
    end
  end

  private

    def tweet_params
      params.require(:tweet).permit(:message)
    end
end
