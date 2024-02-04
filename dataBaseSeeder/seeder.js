const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const lawSpecialties = require("./advocates");
const Advocate = require("../models/advocateModel");
const establishDBConnection = require("../config/connectDB");
const { firstNames, lastNames, locations } = require("./generalResource");

establishDBConnection();

const randomPicker = (array) => {
    if (Array.isArray(array) && array.length > 0) {
        return array[Math.floor(Math.random() * array.length)];
    }
    return null;
};

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

    const gender =
        fName.endsWith("a") || fName.endsWith("e") || fName.endsWith("i")
            ? "f"
            : "m";

    if (!isPresent) {
        const email = `${fName.toLowerCase()}${lName.toLowerCase()}@gmail.com`;
        const image =
            gender === "f"
                ? "https://media.istockphoto.com/id/514236016/photo/successful-business-woman-or-lawyer.jpg?s=2048x2048&w=is&k=20&c=ORKqKHAeOOG9Q2lSEIbqokRv8TMXKWwA5icvSVdDmVg="
                : "https://img.freepik.com/free-photo/indian-businessman-with-his-white-car_496169-2889.jpg?size=626&ext=jpg&ga=GA1.1.1079212264.1698405975&semt=sph";

        const newAdvocateProfile = new Advocate({
            name,
            age: generateRandomAge(),
            experience: generateRandomExperience(),
            email,
            rating: generateRandomRating(),
            image,
            speciality: randomPicker(lawSpecialties.lawSpecailities),
            location: randomPicker(locations),
        });

        console.log(`Created: ${newAdvocateProfile.name}`);
        await newAdvocateProfile.save();
    }
}

const seederFunction = async () => {
    try {
        await Advocate.deleteMany({});
        for (let i = 0; i < 100; i++) {
            await generateRandomProfile();
        }
    } catch (error) {
        console.error("Error while seeding data:", error);
    } finally {
        console.log("Hit Ctl+C");
    }
};

seederFunction();
