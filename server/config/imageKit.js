const dotenv = require("dotenv");
dotenv.config();
const ImageKit = require("imagekit");

// console.log("ImageKit Config:", {
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY ? "set" : "not set",
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ? "set" : "not set",
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "set" : "not set",
// });

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

module.exports = imagekit;
