const { ImageKit } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function fileUpload(buffer) {
  try {
    const response = await imageKit.files.upload({
      file: buffer,
      fileName: "image.jpg",
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

module.exports = fileUpload;
