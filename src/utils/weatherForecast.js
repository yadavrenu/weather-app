const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=559a420ed266c24e2d96f385d51717cd&query=${lat},${long}&units=f`;

    request({
        url, // Object shorthand syntax
        json : true
    }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather forecasting server!', undefined);
        } else if (body.error) {
            callback(body.error?.info, undefined);
        }
         else {
            callback(undefined, body?.current);
        }
    });
}

module.exports = forecast;