const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");
var fs = require('fs');
var convertFactory = require('electron-html-to');
const generateHtml = require("./generateHTML");
var open = require('open');

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "Whats your Github username?"
    },
    {
        type: "list",
        name: "color",
        message: "Whats your favorite color?",
        choices: ["green", "blue", "pink", "red"]
    }
])
.then(function({username}){
    const queryURL = 'https://api.github.com/users/${username}'

    axios.get(queryURL).then(function(res){
        const repoNames = res.data.map(function(repo){
            return repo.name;
        });

        const repoNamesStr = repoNames.join("\n");

        fs.writeFile("repos.txt")
})

const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {

init();
}