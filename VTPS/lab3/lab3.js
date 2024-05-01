import { additionalUsers, randomUserMock } from "./FE4U-Lab3-mock.js";

const courses  = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

 function getRandomCourse() {
    const randomIndex = Math.floor(Math.random() * courses.length);
    return courses[randomIndex];
}

 function convertIdToString(id) {
    if (typeof id === 'object') {
        return `${id.name}-${id.value}`;
    } else {
        return id;
    }
}

 function getUserName(user) {
    if (typeof user.name === 'object') {
        return {
            title: user.name.title,
            fullName: `${user.name.first} ${user.name.last}`,
        };
    }
    return {
        title: user.title,
        fullName: user.full_name,
    };
}

 function getLocation(user) {
    if (typeof user.location === 'object') {
        return {
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
            postcode: user.location.postcode,
            coordinates: user.location.coordinates,
            timezone: user.location.timezone,
        };
    }
    return {
        city: user.city ? user.city : null,
        state: user.state ? user.state : null,
        country: user.country ? user.country : null,
        postcode: user.postcode ? user.postcode : null,
        coordinates: user.coordinates ? user.coordinates : null,
        timezone: user.timezone ? user.timezone : {},
    };
}

 function getBirthDate(user) {
    if (typeof user.dob === 'object') {
        return {
            date: user.dob.date,
            age: user.dob.age,
        };
    }
    if (typeof user.b_day === 'string') {
        const birthYear = Number(user.b_day.substring(0, 4));
        const currentYear = new Date().getFullYear();
        return {
            birthDate: user.b_day,
            age: currentYear - birthYear,
        };
    }
    return {
        birthDate: null,
        age: null,
    };
}



//task1
function parseDataFromMock() {
    const dataRandomMock = [...randomUserMock];
    const ids = new Set();

    dataRandomMock.forEach((user) => {
        const id = convertIdToString(user.id);
        ids.add(id);
    });

    additionalUsers.forEach((user) => {
        const id = convertIdToString(user.id);
        if (!ids.has(id)) {
            dataRandomMock.push(user);
            ids.add(id);
        }
    });

    return dataRandomMock;
}

function convertUser(fullUser) {
    const name = getUserName(fullUser);
    const location = getLocation(fullUser);
    const birthDate = getBirthDate(fullUser);
    return {
        gender: toUpperCaseFirstLetter(fullUser.gender),
        title: toUpperCaseFirstLetter(name.title),
        fullName: name.fullName,
        city: toUpperCaseFirstLetter(location.city),
        state: toUpperCaseFirstLetter(location.state),
        country: toUpperCaseFirstLetter(location.country),
        postcode: location.postcode,
        coordinates: location.coordinates,
        timezone: location.timezone,
        email: fullUser.email ? fullUser.email : null,
        birthDate: birthDate.date,
        age: birthDate.age,
        phone: fullUser.phone ? fullUser.phone : null,
        pictureLarge: fullUser.picture_large ? fullUser.picture_large : null,
        pictureThumbnail: fullUser.picture_thumbnail
            ? fullUser.picture_thumbnail
            : null,
        id: convertIdToString(fullUser.id),
        favorite: fullUser.favorite === true,
        backgroundColor: fullUser.bg_color ? fullUser.bg_color : "#fff",
        note: toUpperCaseFirstLetter(fullUser.note ? fullUser.note : ""),
        course: fullUser.course ? toUpperCaseFirstLetter(fullUser.course) : getRandomCourse(),
    };
}

 function getData() {
    const users = parseDataFromMock();
    return users.map((user) => convertUser(user));
}

const isUpperCase = str => str === str.toUpperCase();
const validateUser = (user, regexForPhone) => {
    {
        const ageIsNumeric = user.age === null || typeof user.age === "number";
        const idIsNotNull = user.id !== "-null"
        const fullNameIsValid =
            typeof user.fullName === "string" && isUpperCase(user.fullName.charAt(0));
        const genderIsValid =
            typeof user.gender === "string" && isUpperCase(user.gender.charAt(0));
        const noteIsValid =
            typeof user.note === "string" &&
            (user.note.length === 0 || isUpperCase(user.note.charAt(0)));
        const stateIsValid =
            user.state === null ||
            (typeof user.state === "string" && isUpperCase(user.state.charAt(0)));
        const countryIsValid =
            user.country === null ||
            (typeof user.country === "string" && isUpperCase(user.country.charAt(0)));
        const phoneIsValid = user.phone === null || regexForPhone.test(user.phone);
        const emailIsValid =
            user.email === null ||
            (typeof user.email === "string" && user.email.includes("@"));
        const isValid =
            ageIsNumeric &&
            idIsNotNull &&
            fullNameIsValid &&
            genderIsValid &&
            noteIsValid &&
            stateIsValid &&
            countryIsValid &&
            phoneIsValid &&
            emailIsValid;
        if (!isValid) {
            console.log({
                ageIsNumeric,
                idIsNotNull,
                fullNameIsValid,
                genderIsValid,
                noteIsValid,
                stateIsValid,
                countryIsValid,
                phoneIsValid,
                emailIsValid,
            });
        }
        return isValid;
    }
};

const users = getData();
users.forEach((user) => {
    const task2 = validateUser(user, /[0-9-+]+/);
    if (!task2) {
        console.log(`${user.fullName}: ${task2}`);
    }
});

const userComparator = (field, ascending) => (a, b) => {
    if (a[field] > b[field]) {
        return ascending;
    }
    if (a[field] < b[field]) {
        return -ascending;
    }

    return 0;
};

function toUpperCaseFirstLetter(string) {
    if (string === null) {
        return null;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}



const filter = {
    country: "Germany",
    age: {
        min: 40,
        max: 80,
    },
    gender: "Female",
    favorite: null,
};

const sortFilter = {
    field: "fullName",
    ascending: -1,
};

const searchFilter = {
    name: "J",
    age: null,
    note: null,
};

const disciplines = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

const chooseRandomDiscipline = () => disciplines[Math.floor(Math.random() * disciplines.length)];

const formatId = id => typeof id === 'object' ? `${id.name}-${id.value}` : id;

const extractUserName = user => typeof user.name === 'object' ? { title: user.name.title, fullName: `${user.name.first} ${user.name.last}` } : { title: user.title, fullName: user.full_name };

const extractLocationDetails = user => typeof user.location === 'object' ? { city: user.location.city, state: user.location.state, country: user.location.country, postcode: user.location.postcode, coordinates: user.location.coordinates, timezone: user.location.timezone } : { city: user.city || null, state: user.state || null, country: user.country || null, postcode: user.postcode || null, coordinates: user.coordinates || null, timezone: user.timezone || {} };

const deriveBirthDetails = user => {
    if (typeof user.dob === 'object') {
        return { date: user.dob.date, age: user.dob.age };
    }
    if (typeof user.b_day === 'string') {
        let birthYear = parseInt(user.b_day.substring(0, 4));
        let currentYear = new Date().getFullYear();
        return { birthDate: user.b_day, age: currentYear - birthYear };
    }
    return { birthDate: null, age: null };
};

const mergeUsersData = () => {
    let data = [...randomUserMock];
    let uniqueIds = new Set();

    data.forEach(user => uniqueIds.add(formatId(user.id)));

    additionalUsers.forEach(user => {
        let userId = formatId(user.id);
        if (!uniqueIds.has(userId)) {
            data.push(user);
            uniqueIds.add(userId);
        }
    });

    return data;
};

const createUserProfile = user => ({
    gender: capitalizeFirstLetter(user.gender),
    title: capitalizeFirstLetter(extractUserName(user).title),
    fullName: extractUserName(user).fullName,
    city: capitalizeFirstLetter(extractLocationDetails(user).city),
    state: capitalizeFirstLetter(extractLocationDetails(user).state),
    country: capitalizeFirstLetter(extractLocationDetails(user).country),
    postcode: extractLocationDetails(user).postcode,
    coordinates: extractLocationDetails(user).coordinates,
    timezone: extractLocationDetails(user).timezone,
    email: user.email || null,
    birthDate: deriveBirthDetails(user).date,
    age: deriveBirthDetails(user).age,
    phone: user.phone || null,
    pictureLarge: user.picture_large || null,
    pictureThumbnail: user.picture_thumbnail || null,
    id: formatId(user.id),
    favorite: !!user.favorite,
    backgroundColor: user.bg_color || "#fff",
    note: capitalizeFirstLetter(user.note || ""),
    course: user.course ? capitalizeFirstLetter(user.course) : chooseRandomDiscipline()
});

const collectUserData = () => mergeUsersData().map(createUserProfile);

const filterUsersByCriteria = (data) => {
        let results = data;
        if (filter.country) {
            results = results.filter((user) => user.country === filter.country);
        }
        if (filter.age) {
            if (typeof filter.age === "number") {
                results = results.filter((user) => user.age === filter.age);
            } else if (typeof filter.age === "object") {
                if (filter.age.min) {
                    results = results.filter((user) => user.age >= filter.age.min);
                }
                if (filter.age.max) {
                    results = results.filter((user) => user.age < filter.age.max);
                }
            }
        }
        if (filter.gender) {
            results = results.filter((user) => user.gender === filter.gender);
        }
        if (typeof filter.favorite === "boolean") {
            results = results.filter((user) => user.favorite === filter.favorite);
        }
        return results;
    }

const sortUsersByField = (data, options) => {
    let sortingField;
    let ascending = 1;
    if (typeof options === "string") {
        sortingField = options;
    } else if (typeof options === "object") {
        sortingField = options.field;
        if (options.ascending !== null && options.ascending !== undefined) {
            ascending = options.ascending;
        }
    }
    return data.sort(userComparator(sortingField, ascending));
};
const searchUsersByQuery = (data, query) =>  {
        if (typeof query === "object") {
            let results = data;
            if (query.name) {
                results = results.filter((user) => user.fullName.startsWith(query.name));
            }
            if (query.age) {
                results = results.filter((user) => user.age === query.age);
            }
            if (query.note) {
                results = results.filter(
                    (user) => user.note && user.note.includes(query.note)
                );
            }
            return results;
        }
        return [];
    };
const calculateSearchPercentage = (data, query) => {
    const searchResults = searchUsersByQuery(data, query);
    return (searchResults.length / data.length) * 100;
};


const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const task3 = filterUsersByCriteria(users);
const task4 = sortUsersByField(users, sortFilter);
const task5 = searchUsersByQuery(users, searchFilter);
const task6 = calculateSearchPercentage(users, searchFilter);

console.log("task3")
console.log(task3);
console.log("task4")
console.log(task4);
console.log("task4")
console.log(task5);
console.log("task5")
console.log(task6);
