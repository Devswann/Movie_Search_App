const fetch = require("node-fetch");

module.exports = {
    FetchData : async function FetchMovieData(url) {

        let json;

        try {
            let response = await fetch(url);
            json = await response.json();
        } catch (err) {
            console.error(err);
        } finally {
            return json;
        }
    }
}

