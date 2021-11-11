// this is for local testing of mongodb
// The secret & connection string are stored in the .env file
// that we dont upload, so our secret stays safe.
const LocalURI = "mongodb://localhost:27017/";
module.exports = LocalURI;