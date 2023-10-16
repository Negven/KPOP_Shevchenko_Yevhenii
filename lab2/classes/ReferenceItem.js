"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceItem = void 0;
var ReferenceItem = /** @class */ (function () {
    // constructor(newTitle: string, newYear: number) {
    //     console.log(`Creating a new ReferenceItem ...` )
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    function ReferenceItem(title, year) {
        this.title = title;
        this.year = year;
    }
    ReferenceItem.prototype.printItem = function () {
        console.log("".concat(this.title, " was published in ").concat(this.year, " by ").concat(ReferenceItem.department));
    };
    Object.defineProperty(ReferenceItem.prototype, "publisher", {
        get: function () {
            return this._publisher.toUpperCase();
        },
        set: function (newPublisher) {
            this._publisher = newPublisher;
        },
        enumerable: false,
        configurable: true
    });
    ReferenceItem.department = "dep1";
    return ReferenceItem;
}());
exports.ReferenceItem = ReferenceItem;
