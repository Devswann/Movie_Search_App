const express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
request = require('request'),
port = 8001;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js',  express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect JS bootstrap
app.use('/jquery',  express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jquery

app.get("/", function(req, res) {
    res.render('index')
})

app.get("/search", function(req, res){
    var query = req.query.query;
    console.log(query)
    var url = "https://api.themoviedb.org/3/search/movie?api_key=d1fb1fb2731cf57c9c10a16b65184c24&query=" + query;
    console.log(url)

    request(url,  function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var data = JSON.parse(body)
            res.render('search', {movieResults :  data})

        }
    })

})

app.get("/search/:movieID/results", function (req, res) { 
    console.log(req.query)
    var query = req.query.query
    var url ="https://api.themoviedb.org/3/movie/" + query + "?api_key=d1fb1fb2731cf57c9c10a16b65184c24";
    console.log(url)

    request(url,  function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var data = JSON.parse(body)
            res.render('results', {movie :  data})

        }
    })

 })

app.listen(port, function() {
    console.log('Server is now running on port ' + port);
})