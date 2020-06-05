//// [typeGuardAccordingToPropertyOptional.ts]
interface Foo1 {
    key1:{
        key2:number;
    }|undefined;
    f1: number;
}

interface Foo2 {
    key1: {
        key2:string
    } | undefined;
    f2: number;
}

interface Foo3 {
    key1:{
        key2:number;
    };
    f2: number;
}

type U1 = Foo1 | Foo2 | Foo3;
type U2 = Foo1 | Foo2 | Foo3|undefined;

// unnecessary optional chain
function f1(u: U1) {
    if (typeof u?.key1 !== 'number') {
        u;  // U1
    }
    if (typeof u?.key1 === 'number') {
        u;  // never
    }
    if (typeof u?.key1 !== 'undefined') {
        u;  // U1
    }
    if (typeof u?.key1 === 'undefined') {
        u;  // U1
    }
}

// non-root optional chain
function f2(u: U1) {
    if (typeof u.key1?.key2 !== 'number') {
        u;  // U1
    }
    if (typeof u.key1?.key2 === 'number') {
        u;  // Foo1 | Foo3
    }
    if (typeof u.key1?.key2 !== 'undefined') {
        u;  // U1
    }
    if (typeof u.key1?.key2 === 'undefined') {
        u;  // U1
    }
}

// root optional chain
function f3(u: U2) {
    if (typeof u?.key1 !== 'number') {
        u;  // U2
    }
    if (typeof u?.key1 === 'number') {
        u;  // never
    }
    if (typeof u?.key1 !== 'undefined') {
        u;  // Foo1 | Foo2 | Foo3
    }
    if (typeof u?.key1 === 'undefined') {
        u;  // U2
    }
}

function f4(u: U2) {
    if (typeof u?.key1?.key2 !== 'number') {
        u;  // U2
    }
    if (typeof u?.key1?.key2 === 'number') {
        u;  // Foo1 | Foo3
    }
    if (typeof u?.key1?.key2 !== 'undefined') {
        u;  // Foo1 | Foo2 | Foo3
    }
    if (typeof u?.key1?.key2 === 'undefined') {
        u;  // U2
    }
}


//// [typeGuardAccordingToPropertyOptional.js]
// unnecessary optional chain
function f1(u) {
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'number') {
        u; // U1
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'number') {
        u; // never
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'undefined') {
        u; // U1
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'undefined') {
        u; // U1
    }
}
// non-root optional chain
function f2(u) {
    var _a, _b, _c, _d;
    if (typeof ((_a = u.key1) === null || _a === void 0 ? void 0 : _a.key2) !== 'number') {
        u; // U1
    }
    if (typeof ((_b = u.key1) === null || _b === void 0 ? void 0 : _b.key2) === 'number') {
        u; // Foo1 | Foo3
    }
    if (typeof ((_c = u.key1) === null || _c === void 0 ? void 0 : _c.key2) !== 'undefined') {
        u; // U1
    }
    if (typeof ((_d = u.key1) === null || _d === void 0 ? void 0 : _d.key2) === 'undefined') {
        u; // U1
    }
}
// root optional chain
function f3(u) {
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'number') {
        u; // U2
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'number') {
        u; // never
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'undefined') {
        u; // Foo1 | Foo2 | Foo3
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'undefined') {
        u; // U2
    }
}
function f4(u) {
    var _a, _b, _c, _d;
    if (typeof ((_a = u === null || u === void 0 ? void 0 : u.key1) === null || _a === void 0 ? void 0 : _a.key2) !== 'number') {
        u; // U2
    }
    if (typeof ((_b = u === null || u === void 0 ? void 0 : u.key1) === null || _b === void 0 ? void 0 : _b.key2) === 'number') {
        u; // Foo1 | Foo3
    }
    if (typeof ((_c = u === null || u === void 0 ? void 0 : u.key1) === null || _c === void 0 ? void 0 : _c.key2) !== 'undefined') {
        u; // Foo1 | Foo2 | Foo3
    }
    if (typeof ((_d = u === null || u === void 0 ? void 0 : u.key1) === null || _d === void 0 ? void 0 : _d.key2) === 'undefined') {
        u; // U2
    }
}
