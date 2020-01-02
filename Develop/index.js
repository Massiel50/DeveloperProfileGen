const inquirer = require("inquirer");
const axios = require("axios");
// const electron = require("electron");
var fs = require('fs');
var convertFactory = require('electron-html-to');
const generateHtml = require("./generateHTML");
// var open = require('open');

inquirer.prompt([
    {
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
.then(function({answers}){
    console.log(answers)
    const queryURL = `https://api.github.com/users/${answers.username}`;

    axios.get(queryURL).then(function(res){
      

        const repoqueryURL = `https://api.github.com/users/${answers.username}/repos`;

        axios.get(repoqueryURL).then(function(res){
            const repoNames = res.data.map(function(repo){
                console.log(repoNames)
                return repo.name;
            });

        const repoNamesStr = repoNames.join("\n");

        fs.writeFile("repos.txt", repoNamesStr, function(err){
            if (err){
                throw err;
            }
            console.log(repoNamesStr)
        })
    });
    const pdfInfo = {
        user: answers.username,
        color: answers.color,
        stars: 1,
        image: res.avatar_url,
        followers: res.followers
    }

    // module.exports = {
    //     user: answers.username,
    //     color: answers.color,
    //     stars: 1,
    //     image: res.avatar_url,
    //     followers: res.followers
    //   };
      
    const htmlDone = generateHtml(pdfInfo);

    var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
    });
    conversion({html: htmlDone}, function(err, result){
        if (err){
            return console.error(err)
        }

        console.log(result.numberOfPages);
        console.log(resul.log);
        result.stream.pipe(fs.createWriteStream('pdf.pdf'));
    })
})

  
})