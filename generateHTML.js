// pdf template with our template literals plugged into it to determine
// colors and information gleaned from git hub
// each element of the pdf is put into a const that is based on the api call
// and then called into the pdf template
// does this need to all happen inside of the call? 


const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

function generateHTML(userInfo) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
        @page {
          margin: 0;
        }
    
        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
    
        html,
        body {
          padding: 0;
          margin: 0;
        }
    
        html,
        body,
        .wrapper {
          height: 100%;
        }
    
        .wrapper {
          background-color: ${colors[userInfo.bkgcolor].wrapperBackground}; 
          padding-top: 100px;
        }
    
        body {
          background-color: white;
          -webkit-print-color-adjust: exact !important;
          font-family: 'arial';
        }
    
        main {
          background-color: #E9EDEE;
          height: auto;
          padding-top: 30px;
        }
    
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'arial';
          margin: 0;
        }
    
        h1 {
          font-size: 3em;
        }
    
        h2 {
          font-size: 2.5em;
        }
    
        h3 {
          font-size: 2em;
        }
    
        h4 {
          font-size: 1.5em;
        }
    
        h5 {
          font-size: 1.3em;
        }
    
        h6 {
          font-size: 1.2em;
        }
    
        .photo-header {
          position: relative;
          margin: 0 auto;
          margin-bottom: -50px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: ${colors[userInfo.bkgcolor].headerBackground};
          color: ${colors[userInfo.bkgcolor].headerColor};
          padding: 10px;
          width: 95%;
          border-radius: 6px;
        }
    
        .photo-header img {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          margin-top: -75px;
          border: 6px solid ${colors[userInfo.bkgcolor].photoBorderColor}; 
          box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
        }
    
        .photo-header h1,
        .photo-header h2 {
          width: 100%;
          text-align: center;
        }
    
        .photo-header h1 {
          margin-top: 10px;
        }
    
        .links-nav {
          width: 100%;
          text-align: center;
          padding: 20px 0;
          font-size: 1.1em;
        }
    
        .nav-link {
          display: inline-block;
          margin: 5px 10px;
        }
    
        .workExp-date {
          font-style: italic;
          font-size: .7em;
          text-align: right;
          margin-top: 10px;
        }
    
        .container {
          padding: 50px;
          padding-left: 100px;
          padding-right: 100px;
        }
    
        .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 20px;
          margin-bottom: 20px;
        }
    
        .card {
          padding: 20px;
          border-radius: 6px;
    
          background-color: ${colors[userInfo.bkgcolor].headerBackground};
          color: ${colors[userInfo.bkgcolor].headerColor};
          margin: 20px;
        }
    
        .col {
          flex: 1;
          text-align: center;
        }
    
        a,
        a:hover {
          text-decoration: none;
          color: inherit;
          font-weight: bold;
        }
    
        @media print {
          body {
            zoom: .75;
          }
        }

      </style>
    
      <body>
    
      <header>
      </header>
    
      <div class="wrapper">
    
        <div class="photo-header">
          <img src="${userInfo.imgUrl}" alt="user image" class="photo-header">
          <h1>Hello!</h1>
          <h1>My name is ${userInfo.name}!</h1>
          <h2>Currently living in ${userInfo.location}</h3>
          <div class="links-nav row">
            <div class="col">
             <a href="${userInfo.profile}" class="nav-links"><i class="fab fa-github"></i>  GitHub    </a>
            </div>
            <div class="col">
              <a href="${userInfo.blog}" class="nav-links"><i class="fas fa-rss"></i>Blog</a>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <h4>${userInfo.bio}</h4>
          </div>
          <div class="row">
            <div class="col">
              <div class="card">
                <h3>Repos:</h3>
                <h4>${userInfo.repos}</h4>
              </div>
          
              <div class="card">
                <h3>Followers:</h3>
                <h4>${userInfo.followers}</h4>
              </div>
  
              <div class="card">
                <h3>Stars:</h3>
                <h4>${userInfo.stars}</h4>
              </div>
     
              <div class="card">
                <h3>Following:</h3>
                <h4>${userInfo.following}</h4>
              </div>
            </div>
          </div>
        </div>
    
    
      </div>
    
    </body>
    
    </html>`}

module.exports = generateHTML;