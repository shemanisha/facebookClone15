const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({ refresh_token: MAILING_REFRESH });

  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const emailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `<!DOCTYPE html><html><head><meta charset="UTF=8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title><style>.container{margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:700;color:#3b5998}.container img{width:30px}.confirm-hyperlink{width:100px;padding:10px 15px;text-decoration:none;font-weight:700;background-color:#3b5998;color:#fff}</style></head><body><div class="container"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="facebookicon"><span>Action require: Activate your facebook account</span></div><div class=""><span>Hello ${name}</span><p>You recently created account on facebook. To complete your registration , please confirm your account</p><a href=${url} class="confirm-hyperlink">Confirm your account</a></div><div><p style="margin-top:20px">Facebook allows you to stay in touch with all your friends, once registered on facebook , you can share photos, organize events and much more</p></div></body></html>`,
  };
  stmp.sendMail(emailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
