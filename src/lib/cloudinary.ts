// Sets up a Cloudinary instance which is essentially our own personal storage space on their servers where we can upload and manage our photos. We will use this instance to interact with Cloudinary's API to upload photos taken with the camera and retrieve them for display in our app. The cloud name is a unique identifier for our Cloudinary account, which we store in an environment variable for security reasons. This way, we can keep our credentials out of our codebase and easily change them without modifying our code.

import { Cloudinary } from '@cloudinary/url-gen';

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  },
});





import { upload, UploadApiOptions } from 'cloudinary-react-native';
import { UploadApiResponse } from 'cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params';


// This function uploads a file to Cloudinary using the upload function from the cloudinary-react-native library. It takes a file path as an argument and returns a promise that resolves with the upload response from Cloudinary. The upload options specify that we want to use an unsigned upload preset, which allows us to upload files without needing to sign the request with our API secret. This is useful for client-side uploads where we don't want to expose our API credentials. The function uses a callback to handle the response from Cloudinary, resolving the promise if the upload is successful and rejecting it if there is an error or no result.

export const uploadToCloudinary = async (
  file: string
): Promise<UploadApiResponse> => {
  const options: UploadApiOptions = {
    upload_preset: 'sample_preset',
    unsigned: true,
  };

  // The upload function from cloudinary-react-native doesn't return a promise by default, so we wrap it in a new Promise to make it easier to work with async/await syntax. The callback function is used to handle the response from Cloudinary, resolving the promise if the upload is successful and rejecting it if there is an error or no result.

  return new Promise(async (resolve, reject) => {
    await upload(cloudinary, {
      file,
      options,
      callback: (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error('No result'));
        } else {
          resolve(result);
        }
      },
    });
  });
};