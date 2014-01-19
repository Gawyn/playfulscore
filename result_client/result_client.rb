gem 'interwetten'
gem 'mongo'

require 'interwetten'
require 'mongo'

iw_key = "af_610DE4715E1D4BE49A882B8F4C347336"

iw_client = Interwetten::LivescoreClient.new(iw_key)
mongo_client = Mongo::MongoClient.new("localhost", 27017)
db = mongo_client.db('playfulscore')
coll = db.collection('matches')
start_time = Time.now - 60

loop do
  if start_time + 60 < Time.now
    iw_client.get_events.each do |event_id|
      start_time = Time.now
      result = iw_client.get_score(event_id)
      if result
        event = coll.find_one(interwetten_id: event_id)
        event ? coll.update({interwetten_id: result[:interwetten_id]}, result) : coll.insert(result) 
      end
    end
  end
end
