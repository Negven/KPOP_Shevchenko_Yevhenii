"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityLibrarian = void 0;
var UniversityLibrarian = /** @class */ (function () {
    function UniversityLibrarian(name, email, dep) {
        var _this = this;
        this.assistCustomer = function (custName) { return console.log("".concat(_this.name, " is assisting ").concat(custName)); };
        this.name = name;
        this.email = email;
        this.department = dep;
    }
    return UniversityLibrarian;
}());
exports.UniversityLibrarian = UniversityLibrarian;
