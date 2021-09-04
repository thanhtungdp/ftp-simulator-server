const ftp = require('basic-ftp')
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

async function connect() {
  const client = new ftp.Client()
  client.ftp.verbose = true
  // client.ftp.log = logger.debug
  try {
    console.log('start')
    await client.access({
      host: '0.0.0.0',
      port: '1111',
      user: 'user1',
      password: 'user1',
      // secure: "implicit",
      // secureOptions: {
      //   path: "VietAn_Service"
      // }
      // secure: true
    })
    console.log('connected')
    client.trackProgress(info => {
      console.log("File", info.name)
      console.log("Type", info.type)
      console.log("Transferred", info.bytes)
      console.log("Transferred Overall", info.bytesOverall)
    })

    // test upload
    await client.uploadFrom("test.txt", "test.txt")
  }
  catch (err) {
    console.log(err)
  }
}

connect()