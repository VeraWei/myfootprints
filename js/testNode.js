var fs = require('fs');
var request = require("request");
var $ = require('jquery');

var http = require('http');
var items = [];

fs.readFile("myPlace.json", "utf8",function  (error,data) {
	if (error) throw error;
	items = JSON.parse(data);
});

var url = "http://ip-api.com/json/";

request({
    url: url,
    json: true
}, requestCallback);

function requestCallback (error, response, body) {

	console.log(items);

    if (!error && response.statusCode === 200 && body) {
		var shouldAdd = true;

		$.each(items, function(index, value) {
			// console.log(value.lat, body.lat);

			if (value.lat == body.lat){
				shouldAdd = false;
			}
			
		});

		if(shouldAdd){
			items.push(body);
		}

		fs.writeFile("myPlace.json",JSON.stringify(items), function  (error) {
			if (error) throw error;

			console.log("Saved successful");
		});
    }
}
// conszole.log(items);
/**
 * 根据 ip 获取获取地址信息
 */
