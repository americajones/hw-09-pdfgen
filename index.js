const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const pdf = require("html-pdf");
const generateHTML = require("./generateHTML");

inquirer
    .prompt([
        {
            type: "input",
            message: "Enter GitHub username:",
            name: "username"
        },
        {
            type: "list",
            message: "Color of choice?",
            name: "color",
            choices: ["green", "blue", "pink", "red"]
        }
    ])
    .then( responses => {
        if (responses.username === "") {
            console.log("Must enter a valid GitHub username.");
            return;
          }

        const queryUrl = `https://api.github.com/users/${responses.username}`;
        const arrSum = arr => arr.reduce((a, b) => a + b, 0);


        axios
            .get(queryUrl)
            .then( res => {
                function getStars() {
                    return axios.get(
                      `https://api.github.com/users/${responses.username}/starred`
                    );
                  }
                  getStars()
                  .then(function(response) {
                      // console.log(response.data.length);
                      // console.log(response.data[0]);
                      let starArr = [];
                      for (let i = 0; i < response.data.length; i++) {
                        starArr.push(response.data[i].stargazers_count);
                      }
                      console.log(`sum is ${arrSum(starArr)}`);
                      const userInfo = {
                          imgUrl: res.data.avatar_url,
                          name: res.data.name,
                          location: res.data.location,
                          profile: res.data.html_url,
                          blog: res.data.blog,
                          bio: res.data.bio,
                          repos: res.data.public_repos,
                          followers: res.data.followers,
                          stars: arrSum(starArr),
                          following: res.data.following,
                          bkgcolor: responses.color
                      }
                      module.export = userInfo;
                      console.log(userInfo);
      
                      fs.writeFile("template.html", generateHTML(userInfo), function(err) {
                          if (err) {
                              throw err;
                          }
                          writePDF();
                      })
                      })
                    .catch(function(err) {
                      console.log(err);
                    });
            })
            .catch( error => {
                console.log(error);
            });
            function writePDF() {
                let html = fs.readFileSync('./template.html', 'utf8');
                let options = { format: 'letter' };
        
                pdf.create(html, options).toFile(`./profiles/${responses.username}Profile.pdf`, (err, res) => {
                    if (err) return err;
                    console.log(res)
                })
            };

    });

