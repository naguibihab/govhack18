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

		    	var landName = jsonBody[0].properties.Name;
		    	const defaultLanguage = 'english';
		    	const people = 'Sutherland folk';
		    	const nation = 'The Shire';

		    	var heritage = getHeritage(landName, defaultLanguage, people, nation)

		        resolve({
		        	name: landName,
		        	heritage: heritage 
		        });
		    } else {
		     	reject(error)
		    }
		})
	});
});

api.get('/heritage/{landname}/{language}/{people}/{nation}', function(req) {
	var landname = req.pathParams.landname;
	var language = req.pathParams.language;

	return getHeritage(landname, language);
});

function getHeritage(landname, language, people, nation) {
	const data = {
		'Eora': {
			'english': {
				'data': 'I would like to acknowledge the {{people}} people of the {{nation}} Nation who are the traditional custodians of the land we meet on today. I would also like to pay respect to the Elders, both past and present, of the {{nation}} Nation.',
				'contribute': 'SBS'
			},
			'arabic': {
				'data': 'wa7 wa7',
				'contribute': 'Mesh Danny'
			}
		}
	}

	// replace parameters
	var heritage = data[landname][language];

	heritage.data = heritage.data.replace('{{people}}',people);
	heritage.data = heritage.data.replace('{{nation}}',nation);

	return heritage;
}