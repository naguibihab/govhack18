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
		    	const people = nation;

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
	var people = req.pathParams.people;

	var heritage = getHeritage(nation, people, language);

	return {
    	name: nation,
    	heritage: heritage 
    };
});

function getHeritage(nation, people, language) {
	const data = {
		'english': {
			'data': 'I would like to acknowledge the {{people}} people of the country of {{nation}} Nation who are the traditional custodians of the land we meet on today. I would also like to pay respect to the Elders, both past and present, of the {{nation}} Nation.',
			'contributer': 'SBS'
		},
		'chinese-simplified': {
			'data': '我想在此承认我们今天聚集在这片土地的传统托管人, {{nation}}民族的{{people}}氏族. 我也在此想对过去和现在的{{nation}}民族的长老们致以最崇高的敬意.',
			'contributer': 'anonymous'
		},
		'chinese-traditional': {
			'data': '我想在此承認我們今天聚集在這片土地的傳統託管人, {{nation}}民族的{{people}}氏族. 我也在此想對過去和現在的{{nation}}民族的長老們致以最崇高的敬意.',
			'contributer': 'anonymous'
		},

		'indonesian': {
			'data': 'Saya ingin memberikan penghargaan kepada orang-orang suku {{people}} dari bangsa {{nation}} yang merupakan pembina tradisional dari tanah tempat kita berkumpul hari ini. Saya juga ingin memberikan penghormatan untuk para petua bangsa {{nation}} baik yang lampau dan sekarang.',
			'contributer': 'Enrico Erwin'
		},
		'hindi-male': {
			'data': 'मैं {{nation}} राष्ट्र के {{people}} लोगों को धन्यवाद करना चाहता हूं जो आज के देश के पारंपरिक संरक्षक हैं। मैं {{nation}} राष्ट्र के पूर्व और वर्तमान दोनों के बुजुर्गों का सम्मान भी करना चाहूंगा |',
			'contributer': 'Munish Mehta'
		},
		'hindi-female': {
			'data': 'मैं {{nation}} राष्ट्र के {{people}} लोगों को धन्यवाद करना चाहती हूं जो आज के देश के पारंपरिक संरक्षक हैं। मैं {{nation}} राष्ट्र के पूर्व और वर्तमान दोनों के बुजुर्गों का सम्मान भी करना चाहूंगी |',
			'contributer': 'Harshitha Rajashekara'
		},
		'french': {
			'data': 'J\'aimerais remercier le peuple {{people}} de la nation {{nation}}, gardien traditionnel du territoire sur lequel nous sommes rassemblés aujourd\'hui et rendre hommage aux Anciens, passés et présents, de cette nation.',
			'contributer': 'Marc Jamais'
		},
		'vietnamese': {
			'data': 'Tôi muốn tỏ lòng thành kính đến người dân {{people}} của quốc gia {{nation}} và cũng  là những người bảo quản truyền thống của vùng đất mà chúng ta đang gặp gỡ ngày hôm nay. Tôi cũng muốn  bày tỏ sự tôn trọng  của mình đến những người cao tuổi, trong quá khứ và hiện tại, của quốc gia {{nation}}',
			'contributer': 'Hui Nguyen'
		},
		'arabic': {
			'data': '"أحب أن اعبر عن شكري لشعب ال{{people}} من عشيرة {{nation}} الذين هم رعاة الأرض التي تحت أقدامنا الأن. احب أيضاً أن اعبر عن احترامي وتقديري لقادة الحاضر و الماضي من عشيرة {{nation}}"',
			'contributer': 'Naguib Ihab'
		}
	}

	// replace parameters
	var heritage = data[language];

	if(heritage == null){
		heritage = {
			'data': 'NA'
		}
	} else {
		heritage.data = heritage.data.replace(new RegExp('{{people}}', 'g'),people);
		heritage.data = heritage.data.replace(new RegExp('{{nation}}', 'g'),nation);
	}

	return heritage;
}