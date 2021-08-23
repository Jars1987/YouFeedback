if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}

//Send grid API key
// Send grid API Key  ID: oEm7Ua5XR3uOIddUznNeag
