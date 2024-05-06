const nodemailer = require("nodemailer");
class Mailer {
  constructor(host, port, user, pass) {
    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  sendMail(options, callback) {
    this.transporter.sendMail(options, callback);
  }
}

module.exports = Mailer;
