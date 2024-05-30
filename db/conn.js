const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const client = mongoose
  .connect("mongodb+srv://Satheesh2003:MdxeJYd8rHdITp88@cluster2003.olriqnp.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error: ", error);

    return error;
  });

module.exports = client;
