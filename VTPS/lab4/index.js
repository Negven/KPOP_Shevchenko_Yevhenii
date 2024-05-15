
import { additionalUsers, randomUserMock } from "./FE4U-Lab3-mock.js";



const modal = document.getElementById("myModal");
const modalTeacher = document.getElementById("modalTeacher");
const span = document.querySelectorAll(".close");

const form = document.querySelector("#teacherForm");
form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const item = {};
    for (const [key, value] of formData) {
        item[key] = value;
    }
    item.age = new Date().getFullYear() - new Date(Date.parse(item.birthDate)).getFullYear()
    item.id = `t${users.length}`;
    users.push(item);
    modal.style.display = "none";
    modalTeacher.style.display = "none";
    updateTeachers()
    updateStatistics(users)
}

document.querySelector("#search").addEventListener("click", () => {
    globalSearchValue = document.querySelector("#nav-search").value;
    updateTeachers();
})


document.querySelector("#addFav").addEventListener("click", () => {
    const teacher =  users.filter(user => user.id === modalTeacher.name)[0];
    teacher.favorite = !teacher.favorite;
    updateTeachers()
    openTeacherModule(modalTeacher.name);
})

document.querySelector(`#favorites`).addEventListener("click", (e) => {
    globalFilter.favorite = e.currentTarget.checked
    updateTeachers();
})

let fullNameFlag = true;
document.querySelector(`#stName`).addEventListener("click", (e) => {
    fullNameFlag = !fullNameFlag;
    updateStatistics(sortUsersByField(users,"fullName", fullNameFlag));
})
let fullSpecialty = true;

document.querySelector(`#stSpecialty`).addEventListener("click", (e) => {
    fullSpecialty = !fullSpecialty;
    updateStatistics(sortUsersByField(users,"specialty", fullSpecialty));
})

let fullAge = true;

document.querySelector(`#stAge`).addEventListener("click", (e) => {
    fullAge = !fullAge;
    updateStatistics(sortUsersByField(users,"age", fullAge));
})

let fullGender = true;

document.querySelector(`#stGender`).addEventListener("click", (e) => {
    fullGender = !fullGender;
    updateStatistics(sortUsersByField(users,"gender", fullGender));
})
let fullNationality = true;

document.querySelector(`#stNationality`).addEventListener("click", (e) => {
    fullNationality = !fullNationality;
    updateStatistics(sortUsersByField(users,"country", fullNationality));
})
document.querySelector(`#region`).addEventListener("click", (e) => {
    if(e.currentTarget.value === "all") {
        globalFilter.country = null;
        updateTeachers();
    } else {
        globalFilter.country = e.currentTarget.value;
        updateTeachers();
    }
})

document.querySelector(`#sex`).addEventListener("click", (e) => {
    if(e.currentTarget.value === "all") {
        globalFilter.gender = null;
        updateTeachers();
    } else {
        globalFilter.gender = e.currentTarget.value;
        updateTeachers();
    }
})
document.querySelector(`#age`).addEventListener("click", (e) => {
    if(e.currentTarget.value === "all") {
        globalFilter.age = null;
        updateTeachers();
    } else {
        globalFilter.age = {
            min: parseInt(e.currentTarget.value.split("-")[0]),
            max: parseInt(e.currentTarget.value.split("-")[1])
        };
        updateTeachers();
    }
})


window.onclick = function(event) {

    if (event.target === modalTeacher || event.target===modal) {

        modal.style.display = "none";
        modalTeacher.style.display = "none";
    }
}

const openTeacherModule = (id) => {
    const teacher =  users.filter(user => user.id === id)[0];
    console.log(teacher);
    modalTeacher.name = teacher.id;
    modalTeacher.style.display = "block";
    modalTeacher.querySelector("h2").innerHTML = teacher.fullName;
    modalTeacher.querySelector(".teacher__specialty").innerHTML = teacher.course;
    modalTeacher.querySelector(".location").innerHTML = teacher.city + ", " + teacher.country;
    modalTeacher.querySelector(".age").innerHTML = teacher.age + ", " + teacher.gender;
    modalTeacher.querySelector(".mail").innerHTML = teacher.email;
    modalTeacher.querySelector(".phone").innerHTML = teacher.phone;
    modalTeacher.querySelector("img").src = teacher.pictureLarge ?? teacher.pictureThumbnail;
    modalTeacher.querySelector(".fav").innerHTML = teacher.favorite ? "yes" : "no";
    modalTeacher.querySelector(".note").innerHTML = teacher.note;
}

const addListeners = () => {
    document.querySelectorAll(".teacher_click").forEach(btn => {
        btn.addEventListener('click',(event)=>{
            openTeacherModule(event.currentTarget.id)
        })
    })
}

addListeners();

document.querySelectorAll(".modal-toggle").forEach(btn => {
    btn.addEventListener('click',()=>{
        modal.style.display = "block";
    })
})


span.forEach(close => close.addEventListener( "click",
    () => {
        modal.style.display = "none";
        modalTeacher.style.display = "none";
    }
))


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
    let picture;
    if(fullUser.picture) {
        picture = fullUser.picture.large;
    }
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
        pictureLarge: fullUser.picture_large ? fullUser.picture_large : picture,
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
        return isValid;
    }
};

const users = getData();
users.forEach((user) => {
    const task2 = validateUser(user, /[0-9-+]+/);
    if (!task2) {
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



const globalFilter = {};

let globalSearchValue = "";

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
    if (globalFilter.country) {
        results = results.filter((user) => user.country === globalFilter.country);
    }
    if (globalFilter.age) {
        if (typeof globalFilter.age === "number") {
            results = results.filter((user) => user.age === globalFilter.age);
        } else if (typeof globalFilter.age === "object") {
            if (globalFilter.age.min) {
                results = results.filter((user) => user.age >= globalFilter.age.min);
            }
            if (globalFilter.age.max) {
                results = results.filter((user) => user.age < globalFilter.age.max);
            }
        }
    }
    if (globalFilter.gender) {
        results = results.filter((user) => user.gender === globalFilter.gender);
    }
    if (typeof globalFilter.favorite === "boolean") {
        if(globalFilter.favorite) {
            results = results.filter((user) => user.favorite === globalFilter.favorite);
        }
    }
    return results;
}

const sortUsersByField = (data, field, asc) => {
    return data.sort((a, b) => {
        if (a[field] > b[field] === asc) return 1
        return -1
    } );
};
const searchUsersByQuery = (data) =>  {
    if (globalSearchValue !== '') {
        let results = data;
        results = results.filter((user) => user.fullName.toLowerCase().includes(globalSearchValue.toLowerCase()) || user.note.toLowerCase().includes(globalSearchValue.toLowerCase()) || user.age === parseInt(globalSearchValue) );
        return results;
    }
    return data;
};
const calculateSearchPercentage = (data, query) => {
    const searchResults = searchUsersByQuery(data, query);
    return (searchResults.length / data.length) * 100;
};


const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const teacherContainer = document.querySelector(".teachers");
const statisticsContainer = document.querySelector("#stats");

const createTeacherCard = (teacher) => {
    let imgSrc;
    if(teacher.id === "-null") teacher.id = teacher.fullName;
    if(teacher.pictureLarge) imgSrc = teacher.pictureLarge;
    else if (teacher.pictureThumbnail) imgSrc = teacher.pictureThumbnail
    else imgSrc =  "img/img1.png";

    return `
    <div id="${teacher.id}" class="teacher__card teacher_click">
        <img src="${imgSrc}"  style="border-color: ${teacher.backgroundColor}" alt="A 400px by 400px teacher photo" title="Placeholder" class="teacher_photo">
        <p class="teacher__name">${teacher.fullName}</p>
        <p class="teacher__specialty">${teacher.course}y</p>
        <p class="teacher__location">${teacher.country}</p>
    </div>
`
}

const addStatistic = (teacher) => {
    return `
        <tr>
            <td class="table-name">${teacher.fullName}</td>
            <td>${teacher.course}</td>
            <td>${teacher.age}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.country}</td>
        </tr>
    `
}

const updateTeachers = () => {
    console.log(users)
    let updUsers = filterUsersByCriteria(users);
    updUsers = searchUsersByQuery(updUsers)
    teacherContainer.innerHTML = "";
    updUsers.forEach(teacher => {
        teacherContainer.innerHTML += createTeacherCard(teacher);
    });
    addListeners()
}

const updateStatistics = (users) => {
    statisticsContainer.innerHTML = '';
    users.forEach(teacher => {
        statisticsContainer.innerHTML += addStatistic(teacher);
    });
}

updateStatistics(users);
updateTeachers(users);

