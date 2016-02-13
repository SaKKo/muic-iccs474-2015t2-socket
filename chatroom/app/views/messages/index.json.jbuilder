json.array!(@messages) do |message|
  json.extract! message, :id, :content, :poster
  json.url message_url(message, format: :json)
end
