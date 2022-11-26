// "use strict";

// const express = require("express");
// const axios = require("axios");
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/test");
// const Cat = mongoose.model("Cat", { name: String });
// // Constants
// const PORT = 8080;
// const HOST = "0.0.0.0";

// // App
// const app = express();
// app.get("/", async (req, res) => {
//   try {
//     console.log("new Request");

//     console.log("conectou");
//     const kitty = new Cat({ name: "Zildjian" });
//     console.log("query");
//     await kitty.save();
//     const value = await Cat.find();
//     return res.send(value);
//   } catch (error) {
//     return res.send(error);
//   }
// });

// app.listen(PORT, HOST, () => {
//   console.log(`Running on http://${HOST}:${PORT}`);
// });
const { readdir, writeFile } = require("fs/promises");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");
// const Cat = mongoose.model("Cat", { name: String });
module.exports.handler = async (event) => {
  try {
    // console.log("conectou");
    // const kitty = new Cat({ name: "Zildjian" });
    console.log("query");
    // await kitty.save();
    // const value = await Cat.find();

    await writeFile("/mnt/efs/text.txt", "oeee");

    const data = await readdir("/mnt/efs");
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data,
          // value,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          error,
        },
        null,
        2
      ),
    };
  }
};
