require("dotenv").config();
const Colors = require("colors");
const Express = require("express");
const App = Express();
const Axios = require("axios");
// const whitelistedUuids = ["b4babcdd86db4d1bbe4e76980cb8b99b", "05c86299bf23491c8d8d592997e392b7"];

// App.get('/', (req, res) => {
//     req.res
// });

App.listen(process.env.PORT || 8080, () => console.log(Colors.green("HSBC's API has successfuly started.")));