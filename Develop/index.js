const inquirer = require("inquirer");
const axios = require("axios");
// const electron = require("electron");
var fs = require("fs");
var convertFactory = require("electron-html-to");
const generateHtml = require("./generateHTML");
const util = require("util");
// var open = require("open");


inquirer
  .prompt([
    {
      type: "input",
      message: "Whats your Github username?",
      name: "username"
    },
    {
      type: "list",
      name: "color",
      message: "Whats your favorite color?",
      choices: ["green", "blue", "pink", "red"]
    }
  ])
  .then(function(answers) {
    console.log(answers);

    const queryURL = `https://api.github.com/users/${answers.username}`;

    axios.get(queryURL).then(function(res) {

    const pdfInfo = {
      user: answers.username,
      color: answers.color,
      image: res.avatar_url,
      followers: res.followers,
      repos: res.public_repos
    };
    console.log(pdfInfo);

    const htmlDone = generateHtml(pdfInfo);

      fs.writeFile("repo.html", htmlDone, function(err) {
        if (err) {
          throw err;
        }
      });

var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});

conversion({ html: htmlDone }, function(err, result) {
  if (err) {
    return console.error(err);
  }

  console.log(result.numberOfPages);
  console.log(resul.log);
  result.stream.pipe(fs.createWriteStream("pdf.pdf"));
})

  })
})
