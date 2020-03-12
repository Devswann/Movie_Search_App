const express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
request = require('request'),
fetch = require('node-fetch'),
fetchData = require('./views/FetchMovieData'),
port = 8001;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js',  express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect JS bootstrap
app.use('/jquery',  express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jquery

app.get("/", async function(req, res) {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=d1fb1fb2731cf57c9c10a16b65184c24&language=en-US&include_adult=false&include_video=false&page=1&primary_release_year=2020";
    let returnedData = await fetchData.FetchData(url);
    res.render('index', {movie : returnedData});
})

app.get("/search", async function(req, res){
    let query = req.query.query;
    let url = "https://api.themoviedb.org/3/search/movie?api_key=d1fb1fb2731cf57c9c10a16b65184c24&query=" + query;
    let returnedData = await fetchData.FetchData(url);
    res.render('Search', {movieResults : returnedData});

})

app.get("/search/:movieID/results", async function(req, res) { 
    let query = req.query.query
    let url ="https://api.themoviedb.org/3/movie/" + query + "?api_key=d1fb1fb2731cf57c9c10a16b65184c24";
    let returnedData = await fetchData.FetchData(url);
    res.render('results', {movie : returnedData});

 })

app.listen(port, function() {
    console.log('Server is now running on port ' + port);
})