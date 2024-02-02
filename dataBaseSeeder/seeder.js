const mongoose = require("mongoose");
const { firstNames, lastNames, locations } = require("./generalResource");
const lawSpecialties = require("./advocates");
const Advocate = require("../models/advocateModel");
const establishDBConnection = require("../config/connectDB");

establishDBConnection();

function generateRandomAge() {
    const minAge = 25;
    const maxAge = 50;
    return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
}

function generateRandomExperience() {
    const minExperience = 1;
    const maxExperinece = 10;
    return (
        Math.floor(Math.random() * (maxExperinece - minExperience + 1)) +
        minExperience
    );
}

function generateRandomRating() {
    const minRating = 1;
    const maxRating = 3.5;
    return Math.floor(Math.random() * (maxRating - minRating + 1)) + minRating;
}

async function generateRandomProfile() {
    const fName = randomPicker(firstNames);
    const lName = randomPicker(lastNames);
    const name = `${fName} ${lName}`;

    const isPresent = await Advocate.findOne({ name }).exec();

    if (!isPresent) {
        const newAdvocateProfile = new Advocate({
            name: name,
            age: generateRandomAge(),
            experience: generateRandomExperience(),
            email: `${fName.toLowerCase()}${lName.toLowerCase()}@gmail.com`,
            rating: generateRandomRating(),
            image: "https://img.freepik.com/free-photo/indian-businessman-with-his-white-car_496169-2889.jpg?size=626&ext=jpg&ga=GA1.1.1079212264.1698405975&semt=sph",
            speciality: `${randomPicker(lawSpecialties.lawSpecailities)}`,
            location: `${randomPicker(locations)}`,
        });
        console.log(`Created: ${newAdvocateProfile.name}`);
        await newAdvocateProfile.save();
    }
}

const randomPicker = (array) => {
    if (Array.isArray(array) && array.length > 0) {
        return array[Math.floor(Math.random() * array.length)];
    }
    return null;
};

const seederFunction = async () => {
    try {
        await Advocate.deleteMany({});
        for (let i = 0; i < 10; i++) {
            await generateRandomProfile();
        }
    } catch (error) {
        console.error("Error while seeding data:", error);
    } finally {
        console.log("Closing DataBase");
    }
};

seederFunction();
