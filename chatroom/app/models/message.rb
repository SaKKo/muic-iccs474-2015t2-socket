class Message < ActiveRecord::Base

  after_create :notify

  def notify
    $redis.publish 'realtime_msg', { message: self.as_json ,recipient_user_ids: [1]}.to_json
    # client must be listening to the correct recipient_user_ids
  end

end
