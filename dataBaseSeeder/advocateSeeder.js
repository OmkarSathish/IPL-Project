const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const lawSpecialties = require("./advocates");
const Advocate = require("../models/advocateModel");
const establishDBConnection = require("../config/connectDB");
const { firstNames, lastNames, locations } = require("./generalResource");
const {
    randomPicker,
    generateRandomAge,
    generateRandomRating,
    generateRandomExperience,
    setImage,
} = require("./utils");

establishDBConnection();

let count = 0;

async function generateRandomProfile() {
    const fName = randomPicker(firstNames);
    const lName = randomPicker(lastNames);
    // console.log(fName);
    const lastChar = fName.charAt(fName.length - 1);

    const name = `${fName} ${lName}`;
    const isPresent = await Advocate.findOne({ name });

    if (!isPresent) {
        const gender =
            lastChar === "a" || lastChar === "e" || lastChar === "i"
                ? "f"
                : "m";
        const email = `${fName.toLowerCase()}${lName.toLowerCase()}@gmail.com`;

        const newAdvocateProfile = new Advocate({
            name,
            age: generateRandomAge(),
            experience: generateRandomExperience(),
            email,
            rating: generateRandomRating(),
            image: setImage(lastChar),
            speciality: randomPicker(lawSpecialties.lawSpecailities),
            location: randomPicker(locations),
        });

        console.log(`Created: ${newAdvocateProfile.name}`);
        await newAdvocateProfile.save();
        count++;
    }
}

const seederFunction = async () => {
    try {
        await Advocate.deleteMany({});
        for (let i = 0; i < 100; i++) {
            await generateRandomProfile();
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
