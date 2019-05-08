var express = require("express");
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var users = require('./routes/users');
var roommateRequests = require('./routes/roommateRequests')

app.get("/", (req, res) => {
    res.send("Welcome to Roommate Finder API Server")
})

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

// app.all('/api/*', function (req, res, next) {
//     const auth = { login: "codingsastra", password: "123456" } // change this

//     const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
//     const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

//     // Verify login and password are set and correct
//         if (!login || !password ||
//             login !== auth.login ||
//             password !== auth.password) {
//             res.set('WWW-Authenticate', 'Basic realm="nope"') // change this
//             res.status(401).send('Request is not authorized. You must pass credentials')
//             return
//         }

//         next();
//     }
// )

app.use("/api/users", users);
app.use("/api/roommaterequests", roommateRequests)

app.listen(8000, () => {
    console.log("Server is started")
})