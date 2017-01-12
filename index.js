/*
	Created by: Ramiro Trejo
	Date: 01-11-2016
*/
var http = require('http')
const querystring = require('querystring');

var timesVisited = 0;
var comments = [];

function addComment(comment) {
	var d = new Date();
	var newComment = {
		message: comment['/?message'],
		time: d.toLocaleTimeString()
	};
	comments.push(newComment);
};

function createCommentString() {
	var commentListString = '<ul>';
	for(var i = 0; i < comments.length; i++) {
			commentListString += '<li>' + comments[i]['message'] + '<br><i>' +  comments[i]['time'] + '</i> </li><br>';
	}
	commentListString += '</ul><br>';
	return commentListString;
};

http.createServer(function (request, response) {
	if (request.url.length > 1) {
		var obj = querystring.parse(request.url);
		addComment(obj);
	}
	console.log(querystring.parse(request.url));
	timesVisited++;
	var thankYouMessage = '';
	var commentsString = createCommentString();
	var commentForm = commentsString + '<form action=""> Feel free to drop a comment: <br> <textarea name="message" rows="4" cols="50"></textarea><br><input type="submit" value="Post"></form> ';
	var htmlString = '<iframe src="//giphy.com/embed/l0K4m0mzkJDAIdhHW" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/thisisgiphy-reaction-audience-l0K4m0mzkJDAIdhHW">via GIPHY</a></p>' + commentForm + '<br> Number of http calls made to this site: ' + timesVisited;
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(htmlString);
}).listen(process.env.PORT || 8080);

console.log("Server started");
