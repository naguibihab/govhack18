const ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();
const request = require('request');

module.exports = api;

api.get('/native-land/{lat}/{lng}', function(req) {
    var lat = req.pathParams.lat;
    var lng = req.pathParams.lng;

    var url ='https://native-land.ca/api/index.php?maps=languages&position='+lat+','+lng;

	request(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        console.log(body) // Print the google web page.
	     }
	})
});