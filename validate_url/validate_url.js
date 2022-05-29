const url = require('url');
const dns = require('dns');


function isValidUrl(lookupUrl,cb){

    const parsedLookupUrl = url.parse(lookupUrl);
    // console.log(parsedLookupUrl);

    dns.lookup(parsedLookupUrl.host || parsedLookupUrl.path, cb);

}


module.exports = isValidUrl;
