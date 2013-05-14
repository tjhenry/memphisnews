// Memphis News Murder Stats

var express = require('express');
var feedParser = require('feedparser');
var request = require('request');

var app = express();

console.log('Loading Memphis Stats');

app.get('/', function(req, res){
	console.log('Request received');
	var bodyFinal = buildBody();
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', bodyFinal.length);
	res.end(body);
});

function buildBody() {
	var body = '<h2>Memphis Stats</h2</br></br>';
	body += '<ul>';

	// Retrieve rss content
	request('http://www.wmctv.com/category/4728/news?clienttype=rss')
	  .pipe(new feedParser())
	  .on('error', function(error) {
	    // always handle errors
	  })
	  .on('meta', function (meta) {
	    // do something
	  })
	  .on('article', function (article) {
	  	console.log('Article Title: ' + article.title);
	    body += '<li>' + article.title + '</li>';
	  })
	  .on('end', function () {
	   // do the next thing
	   	body += '</ul>';
		console.log(body);
		return body;
	  });
}

app.listen(3000);
console.log('Loading complete');

