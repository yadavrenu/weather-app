const request = require('request');

const geocode = (address, callback) => {
    // A service that gives geo information about a location
    const url = `http://api.positionstack.com/v1/forward?access_key=056171385bb5ec5c1e53186512749f1a&query=${address}`;

    request({
        url,
        json : true
    }, (error, { body } = {} ) => {
        if(error) {
            callback('Unable to connect to location services!', undefined); //first param represents error, second represents data as we have defined
        } else if (body.error) {
            callback(body.error.message, undefined);
        } else if (body?.data?.length === 0) {
            callback('Unable to find the location!', undefined);
        } else {
            const location = {
                lat : body.data[0].latitude,
                long : body.data[0].longitude,
                name : body.data[0].label
            };
            callback(undefined, location);
        }
    });
}

module.exports = geocode;