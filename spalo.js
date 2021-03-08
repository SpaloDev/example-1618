/* spalo functions */

const axios = require('axios')

async function getToken(url, param) {

  try {

    const res = await axios.post(url, param)

    if (res.status === 200) {

      return res.data.accessToken

    } else {

      return console.log(res.data.message)

    }

  } catch (err) {

    return console.log(err)

  }
  
}


async function download(path, token) {

  try {

    const instance = axios.create({

      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/octet-stream'
      },
      responseType: 'arraybuffer',

    })
    
    const res = await instance.get(path)

    if (res.status === 200) {

      //const contentMeta = res.headers['content-disposition'].split('=')
      //const fileName = contentMeta[1]
      //fs.writeFileSync(localDir + '/' + fileName, res.data, 'binary')

      return res

    } else {

      return console.log(res.data.error.message[0])

    }
    
  } catch (err) {

    return console.log(err)

  }

}

module.exports = {
  getToken,
  download
}