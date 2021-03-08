
/* lineworks functions */

const superagent = require('superagent')

async function save(config, buffer, fileName) {

  try {

    const url = `https://file.drive.worksmobile.com/drive/rl/${config.resourceLocation}/v2/files`
    
    const res = await superagent
      .post( url )
      .set('X-DRIVE-API-TYPE', 'reseller-api')
      .set('consumerkey', config.consumerKey)
      .set('Authorization', `Bearer ${config.token}`)
      .type('form-data')
      .field('toParentKey', config.toParentKey)
      .field('resourceName', fileName)
      .attach('FileData', buffer, fileName)
    
    //console.log(res)

    if (res.status === 201) {

      return fileName
      //console.log(res)
      
    } else {

      return console.log("error", res.text)

    }

  } catch (err) {

    return console.log("Error", err.response.text)

  }
  
}

module.exports = {
  save
}
