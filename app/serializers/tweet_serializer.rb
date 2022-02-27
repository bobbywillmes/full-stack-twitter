class TweetSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :user_id, :username, :message, :image, :created_at

  def username
    user = User.find(object.user_id)
    username = user.username
    return username
  end

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image)
      }
    end
  end
end
