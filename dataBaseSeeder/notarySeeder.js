const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { firstNames, lastNames, locations } = require("./generalResource");
const establishDBConnection = require("../config/connectDB");
const Notary = require("../models/notaryModel");
const {
    randomPicker,
    generateRandomAge,
    generateRandomExperience,
    setImage,
} = require("./utils");

establishDBConnection();

let count = 0;

async function generateRandomNotaryProfile() {
    const fname = randomPicker(firstNames);
    const lname = randomPicker(lastNames);
    const name = `${fname} ${lname}`;
    // console.log(fname);
    const lastChar = fname.charAt(fname.length - 1);

    const isPresent = await Notary.findOne({ name });
    if (!isPresent) {
        const notary = new Notary({
            name,
            email: `${fname.toLowerCase()}${lname.toLowerCase()}@gmail.com`,
            location: randomPicker(locations),
            age: generateRandomAge(),
            experience: generateRandomExperience(),
            image: setImage(lastChar),
        });

        await notary.save();
        console.log(`Created: ${name}`);
        count++;
    }
}

const seederFunction = async () => {
    try {
        await Notary.deleteMany({});
        for (let i = 0; i < 100; i++) {
            await generateRandomNotaryProfile();
        }
    } catch (error) {
        console.error(error);
    } finally {
        console.log(
            `${mongoose.connection.name} impregnated with ${count} Documents [Hit Ctl+C]`
        );
    }
};

seederFunction();
