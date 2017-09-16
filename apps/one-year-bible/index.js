const alexa = require('alexa-app');
const app = new alexa.app('one-year-bible');
const url = 'http://www.oneyearbibleonline.com/rss/oybosingledayglobalfeedweb.xml';
const feedparser = require('feedparser-promised');

function format(value) {
	return value.trim().toLowerCase();
}

app.intent("OneYearBibleIntent", {
		"utterances": ["to read the daily verses"]
	},
	(request, response) => {
		return feedparser.parse(url).then( (items) => {
			var description = items[0].description;
			var passages = description.split('|');
			
			var lookup = 'Readings - ';
			var lookupIndex = passages[0].indexOf(lookup);
			var passageIndex = lookupIndex + lookup.length;
			var passage1 = format(passages[0].substr(passageIndex, passages[0].length - passageIndex));
			var passage2 = format(passages[1]);
			var passage3 = format(passages[2]);
			var passage4 = format(passages[3]);
			
			var reading = "The One Year Bible's daily readings are " + passage1 + ", " + passage2 + ", " + passage3 + ", and " + passage4 + ".";
			response.say(reading).send();
			//http://labs.bible.org/api/?passage=isaiah+15:1-18:7&formatting=plain
		}).catch(error => response.say(error.message).send());
	}
);

module.exports = app;
exports.handler = app.lambda();