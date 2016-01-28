var express  = require('express'),
    request  = require('request'),
    Iconv    = require('iconv').Iconv,
    cheerio  = require('cheerio'),
    mongoose = require('mongoose');


// MongoDB connection
mongoose.connect('mongodb://localhost:10000/test,mongodb://localhost:10001/test,mongodb://localhost:10002/test', function() {
  console.log('mongodb connected');
});
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var CleanairInfo = new Schema({
  id: ObjectId,
  area: String,
  pm10: String,
  pm25: String,
  grade: String,
  material: String,
  date: String
});
var CleanairInfoModel = mongoose.model('cleaninfo', CleanairInfo);


// Request
request({uri: 'http://cleanair.seoul.go.kr/air_city.htm?method=measure', encoding: 'binary'}, function(err, res, body) {
  // HTML load
  var strContents = new Buffer(body, 'binary');
  iconv = new Iconv('euc-kr', 'UTF8');
  strContents = iconv.convert(strContents).toString();
  // console.log(strContents);

  // HTML parsing
  var $ = cheerio.load(strContents);
  $('tbody tr', '.tbl2').each(function(i, item) {
    var $this = $(this);

    var strArea = $this.find('td').eq(0).text().replace(/\s+/gm, '');
    var strVal10 = $this.find('td').eq(1).text().replace(/\s+/gm, '');
    var strVal10 = $this.find('td').eq(2).text().replace(/\s+/gm, '');
    var strVal2_5 = $this.find('td').eq(1).text().replace(/\s+/gm, '');
    var strStatus = $this.find('td').eq(7).text().replace(/\s+/gm, '');
    var strVal9 = $this.find('td').eq(9).text().replace(/\s+/gm, '');

    var cleanair = new CleanairInfoModel();
    cleanair.area = strArea;
    cleanair.pm10 = strVal10;
    cleanair.pm25 = strVal2_5;
    cleanair.grade = strStatus;
    cleanair.material = strVal9;
    cleanair.date = new Date();
    cleanair.save(function(err) {
      if (err) return handlError(err);
    })
  });
});


// Express
var app = express();
app.get('/', function (req, res) {
  CleanairInfoModel.find({}, function(err, docs) {
    // var docs2 = JSON.stringfy(docs);
    // docs2 = JSON.parse(docs2);
    // for (i=0; i<docs2.length; i++) {
    //   docs2[i].hello = 'world';
    // }
    res.send(docs);
  });
});
app.listen(3000);