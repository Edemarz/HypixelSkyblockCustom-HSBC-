require("dotenv").config();
const Colors = require("colors");
const Express = require("express");
const App = Express();
const Axios = require("axios");

(async () => {
    const d = await Axios({
        url: `https://api.hypixel.net/skyblock/profile?key=${process.env.API_KEY}&profile=d1e9d988d84c40c888eed3413e08ed6b`,
        method: "GET"
    });
    
    console.log(d?.data.profile['members']['9b7c1538999b4b039b554af4b799de58']);
})()

App.listen(process.env.PORT || 8080, () => console.log(Colors.green("HSBC's API has successfuly started.")));