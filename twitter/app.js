var express  = require('express'),
    mongoose = require('mongoose');


// MongoDB connection
mongoose.connect('mongodb://localhost:20000/test,mongodb://localhost:20001/test,mongodb://localhost:20002/test', function () {
  console.log('mongodb connected');
});
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var TwitSchema = new Schema({
  id: ObjectId,
  text: String,
  tw_date: String,
  rt_count: Number,
  fv_count: Number

});
var TwitModel = mongoose.model('twit', TwitSchema);

var twitterAPI = require('node-twitter-api');
var reqTok,
    reqTokSec,
    accTok = '4132630572-2Jh0FfccyJSfIMdZgzXycBixNbbpWSMwXWEBgoL',
    accTokSec = 'TdjyH3obNxVWgQlqg9OXYkjxwozxqjWRqXD8qqPYMBB0R';
var pageMap = {};
var twitter = new twitterAPI({
  consumerKey: 'fUb9sYu1Gy8E3sFI0MKjV9jco',
  consumerSecret: 'nK1mJwe3sjBxChxDKurrf9TzfX4opzWpyqy3VTpWbjHzu17FpW'
});


// Express run server
var app = express();

app.get('/timeline', function (req, res) {
  twitter.getTimeline('user', { screen_name: 'joogeunjae' }, accTok, accTokSec, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data.length);
        data.forEach(function (item) {
          var twit = new TwitModel();
          twit.text = item.text;
          twit.tw_date = item.created_at;
          twit.rt_count = Number(item.retweet_count);
          twit.fv_count = Number(item.favorite_count);

          twit.save(function (err) {
            if (err) { return handleError(err); }
          });
        });
        res.redirect('/');
      }

  });
});

app.get('/', function (req, res) {
  TwitModel.find({}, {_id:0, text:1}, function (err, docs) {
    res.send(docs);
  });
});

app.listen(3000);