var httprequest = require('request');
var config = require('../config');

exports.callAPI = (api_method, req) => {

    return new Promise((resolve, reject) => {

        httprequest.get({
            url: config.getOwnerApi.url + config.getOwnerApi.apiKey,
        }, function (error, response, body) {
            if (response != undefined) {

                if (response.body && response.body.status) {
                    resolve({ error: true, result: JSON.parse(response.body) });
                } else {
                    resolve({ result: JSON.parse(response.body) });
                }
            } else {
                // console.log("response.body ===================> ", response.body);
                resolve({ error: true, result: response });
            }
        });
    });

}