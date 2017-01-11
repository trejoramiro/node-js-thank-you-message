/*
	Created by: Ramiro Trejo
	Date: 01-11-2016
*/
var http = require('http')
const querystring = require('querystring');

var timesVisited = 0;
var comments = ['test'];

function addComment(comment) {
	comments.push(comment);
};

function createCommentString() {
	var commentListString = '<ul>';
	for(var i = 0; i < comments.length; i++) {
			commentListString += '<li>' + comments[i] + '</li>'
	}
	commentListString += '</ul><br>';
	return commentListString;
};

http.createServer(function (request, response) {
	if (request.url.length > 1) {
		var obj = querystring.parse(request.url);
		addComment(obj['/?message']);
	}
	// console.log(request.url.length)
	console.log(querystring.parse(request.url));
	timesVisited++;
	var commentsString = createCommentString()
	var commentForm = commentsString + '<form action=""> Comment: <br> <input type="text" name="message"><br><input type="submit" value="Post"></form> '
	var htmlString = 'Number of visitors to this site: ' + timesVisited + '<br>' + '<iframe src="//giphy.com/embed/l46CvHYDDsOocpRjq" width="480" height="268" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/colbertlateshow-the-late-show-with-stephen-colbert-l46CvHYDDsOocpRjq">via GIPHY</a></p>' + commentForm
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(htmlString);
}).listen(8080);

console.log("Server started");
