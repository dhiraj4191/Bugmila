var express = require ('express');
var app = express();
var _ = require('underscore');
var jwt = require('jwt-simple');

exports.requiresAuthentication = function (request, response, next) {
    if (request.headers.access_token) {
        var token = request.headers.access_token;
        console.log("req auth " + request.app.get('tokens'));
        if (_.where(request.app.get("tokens"), token).length > 0) {
        	console.log("in if");
            var decodedToken = jwt.decode(token, request.app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromTokens(request, response, token);
                response.send(401, "Your session is expired");
            }
        }
    }	
    response.send(401, "No access token found in the request");
}


exports.removeFromTokens = function (tokens, token) {
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}