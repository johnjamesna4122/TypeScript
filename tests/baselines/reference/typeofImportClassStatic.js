//// [tests/cases/conformance/declarationEmit/typeofImportClassStatic.ts] ////

//// [a.ts]
export class A {
  static foo() {}
}

//// [b.ts]
import { A } from './a';
export class B extends A {}

//// [index.ts]
import { B } from './b';
export const foo = B.foo;

//// [a.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    A.foo = function () { };
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.B = void 0;
var a_1 = require("./a");
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(a_1.A));
exports.B = B;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
var b_1 = require("./b");
exports.foo = b_1.B.foo;


//// [a.d.ts]
export declare class A {
    static foo(): void;
}
//// [b.d.ts]
import { A } from './a';
export declare class B extends A {
}
//// [index.d.ts]
export declare const foo: typeof import("./a").A["foo"];
