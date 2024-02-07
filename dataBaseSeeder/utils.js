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

function setImage(lastChar) {
    return lastChar === "a" || lastChar === "e" || lastChar === "i"
        ? "https://media.istockphoto.com/id/514236016/photo/successful-business-woman-or-lawyer.jpg?s=2048x2048&w=is&k=20&c=ORKqKHAeOOG9Q2lSEIbqokRv8TMXKWwA5icvSVdDmVg="
        : "https://img.freepik.com/free-photo/indian-businessman-with-his-white-car_496169-2889.jpg?size=626&ext=jpg&ga=GA1.1.1079212264.1698405975&semt=sph";
}

module.exports = {
    setImage,
    randomPicker,
    generateRandomAge,
    generateRandomExperience,
    generateRandomRating,
};
