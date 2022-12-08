const request = require('request');

// Your Imgur API key
const API_KEY = '206166e3b5bf3c3';

// Make an HTTP request to the Imgur API to upload the image
function uploadImage(filePath) {
request.post({
  url: 'https://api.imgur.com/3/upload',
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
  formData: {
    image: filePath,
  },
}, (error, response, body) => {
  if (error) {
    return error;
  }

  // Parse the JSON response from the Imgur API
  const result = JSON.parse(body);

  // The URL for the uploaded image is in the "data" property of the response
  const url = result.data.link;

  return url;

});
}

export default {uploadImage};
