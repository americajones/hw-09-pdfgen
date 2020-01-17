const fs = require("fs");
var https = require("https");
const inquirer = require("inquirer");
const axios = require("axios");
const pdfDoc = require("pdfkit");

const doc = new pdfDoc();

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter GitHub username",
      name: "username"
    },
    {
      type: "list",
      message: "Favorite color?",
      name: "color",
      choices: ["yellow", "green", "blue", "red", "pink", "grey"]
    }
  ])
  .then(function(responses) {
    // ++ error catch for github user input
    if (responses.username === "") {
      console.log("Must enter a valid GitHub username.");
      return;
    }
    const queryUrl = `https://api.github.com/users/${responses.username}`;
    const arrSum = arr => arr.reduce((a, b) => a + b, 0);
    axios
      .get(queryUrl)
      .then(resp => {
        // axios.get(`https://api.github.com/users/${responses.username}/starred`).then(resp => {console.log(resp)})

        //axios call for stars
        console.log(resp.data);
        console.log(`starred url is: ${resp.data.starred_url}`);
        console.log(`img url is: ${resp.data.avatar_url}`);
        console.log(`!! color is ${responses.color}`);
        //make pdf
        doc.pipe(fs.createWriteStream(`pdfs/${responses.username}_resume.pdf`));
        //style
        doc.rect(0, 0, 700, 300).fill("grey");
        doc.rect(0, 300, 700, 500).fill("darkgrey");
        doc.roundedRect(20, 80, 565, 280, 10).fill(`${responses.color}`);
        doc.roundedRect(20, 470, 260, 100, 10).fill(`${responses.color}`);
        doc.roundedRect(330, 470, 260, 100, 10).fill(`${responses.color}`);
        doc.roundedRect(20, 600, 260, 100, 10).fill(`${responses.color}`);
        doc.roundedRect(330, 600, 260, 100, 10).fill(`${responses.color}`);
        doc.circle(310, 110, 90).fill("black");
        //Function to save image from External URL.
        function saveImageToDisk(url, localPath) {
          var fullUrl = url;
          var file = fs.createWriteStream(localPath);
          var request = https.get(url, function(response) {
            // response.setEncoding('base64');
            // body = "data:" + resp.headers["content-type"] + ";base64,";
            // response.on('data', (data) => { body += data});
            // response.on('end', () => {
            // console.log(body);
            response.pipe(file);
            // });
          });
        }
        let imageNum = 0;
        saveImageToDisk(
          resp.data.avatar_url,
          "./images/pic" + imageNum + 1 + ".jpg"
        );
        let imageNum2 = 0;

        // I kept getting unknown image format errors when trying to post, so it saves the image but it does't attach it again, my b
        // doc.image('./images/pic'+ imageNum2+1 +'.jpg', 215, 14, {width: 180});
        //       //content
        doc
          .fontSize(22)
          .text(`My name is ${resp.data.name}!`, 50, 250, { align: "center" })
          .fill("black");
        doc
          .fontSize(14)
          .text(`${resp.data.location}`, -100, 310, { align: "center" })
          .fill("black");
        doc
          .fontSize(14)
          .text(`GitHub`, 50, 310, { align: "center" })
          .fill("black");
        doc
          .underline(274, 313, 45, 10, { color: "blue", align: "center" })
          .link(274, 313, 45, 20, `${resp.data.html_url}`);
        doc
          .fontSize(14)
          .text(`Blog`, 190, 310, { align: "center" })
          .fill("black");
        doc
          .underline(350, 313, 30, 10, { color: "blue", align: "center" })
          .link(350, 313, 35, 20, `${resp.data.blog}`);
        doc
          .fontSize(18)
          .text(resp.data.bio, 100, 375, { width: 410, align: "center" });
        doc
          .fontSize(18)
          .text(`Public repos: \n${resp.data.public_repos}`, -220, 500, {
            align: "center"
          });
        function getStars() {
          return axios.get(
            `https://api.github.com/users/${responses.username}/starred`
          );
        }
        let starArr = [];
        getStars()
          .then(function(response) {
            // console.log(response.data.length);
            // console.log(response.data[0]);
            for (let i = 0; i < response.data.length; i++) {
              starArr.push(response.data[i].stargazers_count);
            }
            console.log(`sum is ${arrSum(starArr)}`);
            doc.fontSize(18).text(`Stars: \n${arrSum(starArr)}`, -220, 630, {
              align: "center"
            });
          })
          .catch(function(err) {
            console.log(err);
          });
        console.log(`outside num is ${arrSum(starArr)}`);

        doc.fontSize(18).text(`Stars: \n${arrSum(starArr)}`, -220, 630, {
          align: "center"
        });
        doc.fontSize(18).text(`Followers: \n${resp.data.followers}`, 385, 500, {
          align: "center"
        });
        doc.fontSize(18).text(`Following: \n${resp.data.following}`, 385, 630, {
          align: "center"
        });

        doc.end();
      })
      .catch(function(err) {
        console.log(err);
      });
  });
