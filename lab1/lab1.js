"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category_1 = require("./Category");
function getAllWorkers() {
    var workers = [
        { id: 0, name: 'Ivan', surname: 'Ivanov', available: true, salary: 1000, category: Category_1.Category.BA },
        { id: 1, name: 'Petro', surname: 'Petrov', available: true, salary: 1500, category: Category_1.Category.Developer },
        { id: 2, name: 'Vasyl', surname: 'Vasyliev', available: false, salary: 1600, category: Category_1.Category.Developer },
        { id: 3, name: 'Evgen', surname: 'Zhukov', available: true, salary: 1300, category: Category_1.Category.QA }
    ];
    return workers;
}
function logFirstAvailable(workers) {
    console.log("\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u043F\u0440\u0430\u0446\u0456\u0432\u043D\u0438\u043A\u0456\u0432 \u0432 \u043C\u0430\u0441\u0438\u0432\u0456: ".concat(workers.length));
    for (var _i = 0, workers_1 = workers; _i < workers_1.length; _i++) {
        var worker = workers_1[_i];
        if (worker.available) {
            console.log("\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u043F\u0440\u0430\u0446\u0456\u0432\u043D\u0438\u043A\u0438 ".concat(worker.name, " ").concat(worker.surname));
            break;
        }
    }
}
function getWorkersNamesByCategory(category) {
    return getAllWorkers().filter(function (worker) { return worker.category === category; }).map(function (worker) { return "".concat(worker.name, " ").concat(worker.surname); });
}
function logWorkersNames(namesArray) {
    namesArray.forEach(function (workerName) { return console.log(workerName); });
}
function getWorkerByID(id) {
    var worker = getAllWorkers().find(function (worker) { return worker.id === id; });
    return "".concat(worker.name, " ").concat(worker.surname, ", salary: ").concat(worker.salary);
}
function createCustomerID(name, id) {
    return name + id;
}
function createCustomer(name, age, city) {
    console.log("".concat(name, " ").concat(age ? age + " " : '').concat(city ? city : ''));
}
console.log('1. ');
logFirstAvailable(getAllWorkers());
console.log('2. ');
logWorkersNames(getWorkersNamesByCategory(Category_1.Category.Developer));
console.log('3. ');
console.log(getWorkerByID(2));
console.log('4. ');
var myId = createCustomerID('Ann', 10);
console.log(myId);
var idGenerator = function (name, id) {
    return name + id;
};
console.log('5. ');
createCustomer("Yevhenii");
createCustomer("Yevhenii", 20);
createCustomer("Yevhenii", 20, "Kyiv");