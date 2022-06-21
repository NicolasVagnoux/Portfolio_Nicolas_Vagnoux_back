const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
// require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(express.json());

const corsOptions = {
  // origin: process.env.CORS_ORIGIN,
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
  maxAge: 3600,
};
app.use(cors(corsOptions));

app.use("/", router);

app.get("/coucou", (req, res) => {
  res.status(200).send('hibou');
})

app.post("/", (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "nicolasvagnoux@outlook.fr",
      pass: process.env.PWD_MAIL,
    },
  });

  const mailOptions = {
    from: "MyPortfolio",
    sender: "nicolasvagnoux@outlook.fr",
    to: "nicolasvagnoux@outlook.fr",
    subject: "Message reçu via le formulaire de contact du portfolio",
    text: `Vous avez reçu un mail de : ${email} !
      Nom : ${name}
      Message : ${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
