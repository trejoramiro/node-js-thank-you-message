/*
	Created by: Ramiro Trejo
	Date: 01-11-2016
*/

var http = require('http');
const url = require('url'); // built-in utility

const querystring = require('querystring');

var timesVisited = 0;
var comments = [];

function addComment(comment) {
	var d = new Date();
	var newComment = {
		body: comment['/?message'],
		date: d.toUTCString()
	};
	comments.push(newComment);
};

function createCommentString() {
	var commentListString = '';
	for(var i = 0; i < comments.length; i++) {
			commentListString += comments[i]['body'] + '<br><i>' +  comments[i]['date'] + '</i> </li><br><br>';
	}
	commentListString += '<br>';
	return commentListString;
};

http.createServer(function (request, response) {
	if (request.url.length > 1) {
		var obj = querystring.parse(request.url);
		addComment(obj);
	}

	console.log(querystring.parse(request.url));
	timesVisited++;
	var message = '<h1>How excited are you to join Signal?</h1> <br><br> <h2>Me:</h2><br>';
	var commentsString = createCommentString();
	var commentForm = commentsString + '<form action="">Feel free to drop a comment: <br> <textarea name="message" rows="4" cols="50"></textarea><br><input type="submit" value="Post"></form> ';
	var htmlString = '<style> body { background-color: yellow } </style> <center>' + message + '<iframe src="//giphy.com/embed/l0K4m0mzkJDAIdhHW" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/thisisgiphy-reaction-audience-l0K4m0mzkJDAIdhHW">via GIPHY</a></p>' + commentForm + '<br><h3> Number of http calls made to this site:</h3>' + timesVisited + '<br><br><a href="https://github.com/trejoramiro/node-js-thank-you-message/blob/master/index.js"><h3>The source code.</h3></a></center>';
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(htmlString);

}).listen(process.env.PORT || 8080);

console.log("Server started");
