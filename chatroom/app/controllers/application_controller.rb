class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  realtime_controller({:queue => :redis})

  def realtime_user_id
    1
  end

  def realtime_server_url
    'http://localhost:5001'
  end

end
