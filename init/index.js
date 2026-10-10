const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const Data = require("./data.js");

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');

}

const initDB = async () => {
    await listing.deleteMany({});
    Data.data = Data.data.map((obj) => ({ ...obj, owner: "6a95b62c5fe547a11daf25f6" }));
    await listing.insertMany(Data.data);
    console.log("data was initialize.");
}

initDB();