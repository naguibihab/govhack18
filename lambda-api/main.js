const ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();
const request = require('request');

module.exports = api;

api.get('/native-land/{lat}/{lng}', function(req) {
	return new Promise(function(resolve,reject){
	    var lat = req.pathParams.lat;
	    var lng = req.pathParams.lng;

	    var url ='https://native-land.ca/api/index.php?maps=languages&position='+lat+','+lng;

		request(url, function (error, response, body) {
			console.log("Reply: ",response,error);
		    if (!error && response.statusCode == 200) {
		    	jsonBody = JSON.parse(body);
		    	console.log(jsonBody[0]);

		    	var nation = jsonBody[0].properties.Name;
		    	const defaultLanguage = 'english';
		    	const people = 'Sutherland folk';

		    	var heritage = getHeritage(nation, people, defaultLanguage)

		        resolve({
		        	name: nation,
		        	heritage: heritage 
		        });
		    } else {
		     	reject(error)
		    }
		})
	});
});

api.get('/heritage/{nation}/{people}/{language}', function(req) {
	var nation = req.pathParams.nation;
	var language = req.pathParams.language;

	return getHeritage(nation, people, language);
});

function getHeritage(nation, people, language) {
	const data = {
		'Eora': {
			'english': {
				'data': 'I would like to acknowledge the {{people}} people of the {{nation}} Nation who are the traditional custodians of the land we meet on today. I would also like to pay respect to the Elders, both past and present, of the {{nation}} Nation.',
				'contributer': 'SBS'
			},
			'arabic': {
				'data': 'wa7 wa7',
				'contributer': 'Mesh Danny'
			}
		}
	}

	// replace parameters
	var heritage = data[nation][language];

	heritage.data = heritage.data.replace(new RegExp('{{people}}', 'g'),people);
	heritage.data = heritage.data.replace(new RegExp('{{nation}}', 'g'),nation);

	return heritage;
}