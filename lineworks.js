/**
 * lineworks functions
 */

const axios = require('axios');
const FormData = require('form-data');


async function save(lwConfig, file) {

  try {

    const uploadUrl = await _getUploadUrl(lwConfig, file);

    if (uploadUrl) {

      const fmdata = new FormData();
      fmdata.append('resourceName', file.name);
      fmdata.append('FileData', file.data, {
        filename: file.name,
      });

      const response = await axios.post(uploadUrl,
        fmdata,
        {
          headers: {
            ...fmdata.getHeaders(),
            Authorization: `Bearer ${lwConfig.accessToken}`,
          },
        }
      );

      return response.data;

    } else {
    
      throw 'no valid upload url';

    }


  } catch (err) {

    throw err;

  }
  
}

// get upload url
const _getUploadUrl = async (lwConfig, file) => {

  try {

    const response = await axios.post(
      `https://www.worksapis.com/v1.0/sharedrives/${lwConfig.sharedriveId}/files/${lwConfig.fileId}`,
      {
        fileName: file.name,
        fileSize: file.data.length,
        overwrite: true,
      },
      {
        headers: {
          Authorization: `Bearer ${lwConfig.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.uploadUrl;

  } catch (err) {

    throw err;

  }

}


module.exports = {
  save
}
