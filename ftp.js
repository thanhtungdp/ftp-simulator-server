const FtpSrv = require('ftp-srv');

const ftpServer = new FtpSrv({
  url: "ftp://0.0.0.0:1111",
  pasv_min: 5054,
  pasv_max: 5055,
  file_format: "ls",
  anonymous: false,
  greeting: ["Hello user"]
});

ftpServer.on('login', (data, resolve, reject) => {
  if (data.username === "user1" && data.password === "user1") {
    // call resolve
    return resolve({ root: './ftp' });
  }
  else {
    // if password and username are incorrectly then call reject
    reject({});
  }
});


ftpServer.listen()
  .then((e) => {
    console.log("FTP Start ftp://0.0.0.0:1111 with user:pass is user1:user1")
  });