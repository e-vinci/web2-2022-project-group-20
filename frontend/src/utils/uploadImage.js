import { Cloudinary } from 'cloudinary-core';

// Configure the Cloudinary API with your account ID, API key, and API secret
const cloudinary = new Cloudinary({
    cloud_name: 'dcsbg95nb', 
    api_key: '788837633726548', 
    api_secret: 'qXKWu7_Jinw9nIHLdLgLMjF7lb4'
});

function uploadImage(file) {
  // Upload the image to Cloudinary
  cloudinary.uploader.upload(file, (error, result) => {
    if (error) {
      return "Error";
    }

    // Generate the URL for the uploaded image
    const url = cloudinary.url(result.public_id, {
      width: 371,
      height: 463,
      crop: 'fill',
    });

    // Return the generated URL
    return url;
  });
}

export default {uploadImage};
