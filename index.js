
const conf = require('./config.json')

const spalo = require('./spalo')
const drive = require('./lineworks')

// check SPALO historyId
const historyId  = process.argv[2]

if(!historyId) return console.log("Error: historyId not found")

// SPALO Target API - history image download API
const spaloApiBasePath = "https://developers-maker.spalo.jp/api/v2"

const spaloLoginPath = spaloApiBasePath + '/user/login'
const spaloApiPath = spaloApiBasePath + '/history/download/excel/' + historyId


saveFiles()


async function saveFiles(auth) {

  try {

    // download
    const token = await spalo.getToken(spaloLoginPath, conf.spaloAccount)
    const res = await spalo.download(spaloApiPath, token)

    const contentMeta = res.headers['content-disposition'].split('=')
    const fileName = contentMeta[1]

    console.log("Downloaded: " + fileName)

    // save
    const driveFile = await drive.save(conf.lineworks, res.data, fileName)

    console.log("Saved: " + driveFile)

  } catch (err) {

    console.log(err)

  }

  console.log('FIN')

}

