const express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
request = require('request'),
port = 8001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

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

app.listen(port, function() {
    console.log('Server is now running on port ' + port);
})