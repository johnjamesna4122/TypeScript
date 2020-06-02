//// [typeGuardAccordingToProperty.ts]
// Primitive value ---- boolean bigint number string symbol undefined function object
// ts special type like any, void, unknown, union, intersection
//// Property Access ---- a.b
//// Element Access ---- a["b"]
//// optional Access ---- a?.b, NOTE: undefined is special.
//// calculated Element Access ---- a["b"+"c"]
//// unknown calculated Element Access ---- a[f()]
//// deep property access ---- a.b.c.d.e.f, a["b"]["c"]["d"]
//// mix deep property access ---- a.b["c"]["d"].e
interface Boolean1 {
    key: boolean;
    b1: number;
};

interface Boolean2 {
    key: boolean;
    b2: number;
};

interface BigInt1 {
    key: bigint;
    bi1: number;
};

interface Number1 {
    key: number;
    n1: number;
};

interface String1 {
    key: string;
    st1: number;
}

interface Symbol1 {
    key: symbol;
    sy1: number;
}

interface Undefined1 {
    key: undefined;
    u1: number;
}

interface Function1 {
    key: () => void;
    f1: number;
}

interface Obejct1 {
    key: {};
    o1: number;
}

type Union1 = Boolean1 | Boolean2 | Number1;
type Union2 = Boolean1 | BigInt1 | Number1 | String1 | Symbol1 | Undefined1 | Function1 | Obejct1;

function f1(u: Union1) {
    if (typeof u.key !== 'boolean') {
        u;      // Number1
        u.n1;   // number
    }
}
function f1_1(u: Union1) {
    if (typeof u.key !== 'boolean') {
        u;      // Number1
        u.n1;   // number
    }
}
function f1_2(u: Union1) {
    if (typeof u.key === 'boolean') {
        u;      // Bolean1 | Bolean2
        u.b1;   // Error
        u.b2;   // Error
    }
}
function f1_3(u: Union1) {
    if (typeof u.key != 'boolean') {
        u;     // Test3
        u.n1;
    }
}
function f1_4(u: Union1) {
    if (typeof u.key == 'boolean') {
        u;     // Test1 | Test2
        u.b1;   // Error
        u.b2;   // Error
    }
}

function f1ElementAccess_1(u: Union1) {
    if (typeof u["key"] !== 'boolean') {
        u;      // Number1
        u.n1;   // number
    }
}
function f1ElementAccess_2(u: Union1) {
    if (typeof u["key"] === 'boolean') {
        u;      // Bolean1 | Bolean2
        u.b1;   // Error
        u.b2;   // Error
    }
}
function f1ElementAccess_3(u: Union1) {
    if (typeof u["key"] != 'boolean') {
        u;     // Test3
        u.n1;
    }
}
function f1ElementAccess_4(u: Union1) {
    if (typeof u["key"] == 'boolean') {
        u;     // Test1 | Test2
        u.b1;   // Error
        u.b2;   // Error
    }
}

function f1_Plus(u: Union1) {
    if (typeof u.key !== 'boolean') {
        throw new Error();
    }
    u;  // Test1 | Test2
    if (typeof u.key === 'boolean') {
        throw new Error();
    }
    u;  // never
}

// boolean bigint number string symbol undefined function object
function f2_1(u: Union2) {
    if (typeof u.key === 'bigint') {
        u;      // BigInt1
        u.bi1;
    }
}
function f2_2(u: Union2) {
    if (typeof u.key === 'boolean') {
        u;      // Boolean1
        u.b1;
    }
}
function f2_3(u: Union2) {
    if (typeof u.key === 'number') {
        u;      // Number1
        u.n1;
    }
}
function f2_4(u: Union2) {
    if (typeof u.key === 'string') {
        u;      // String1
        u.st1;
    }
}
function f2_5(u: Union2) {
    if (typeof u.key === 'symbol') {
        u;      // Symbol1
        u.sy1;
    }
}
function f2_6(u: Union2) {
    if (typeof u.key === 'undefined') {
        u;      // Undefined1
        u.u1
    }
}
function f2_7(u: Union2) {
    if (typeof u.key === 'function') {
        u;      // Function1
        u.f1;
    }
}
function f2_8(u: Union2) {
    if (typeof u.key === 'object') {
        u;      // Object1
        u.o1;
    }
}

function f2Not_1(u: Union2) {

    if (typeof u.key !== 'bigint') {
        u;      // not BigInt1
    }
}
function f2Not_2(u: Union2) {
    if (typeof u.key !== 'boolean') {
        u;      // not Boolean1
    }
}

function f2Not_3(u: Union2) {
    if (typeof u.key !== 'number') {
        u;      // not Number1
    }
}

function f2Not_4(u: Union2) {
    if (typeof u.key !== 'string') {
        u;      // not String1
    }
}

function f2Not_5(u: Union2) {
    if (typeof u.key !== 'symbol') {
        u;      // not Symbol1
    }
}

function f2Not_6(u: Union2) {
    if (typeof u.key !== 'undefined') {
        u;      // not Undefined1
    }
}

function f2Not_7(u: Union2) {
    if (typeof u.key !== 'function') {
        u;      // not Function1
    }
}
function f2Not_8(u: Union2) {
    if (typeof u.key !== 'object') {
        u;      // not Object1
    }
}

interface A { x: string, y: string };
interface B { x: number, y: number };
type X = A | B;

function f3(bar: X) {
    if (typeof bar.x === 'string') {
        let y = bar.y; // string
    }
}

/////////////////////////////////////////////////////////
//  some case that need discuss further, This is not that right.
function f1_(u: Union1) {
    const tmp1 = u.key;
    if (typeof tmp1 !== 'boolean') {
        u;          //Union1
        u.key;      //number | boolean
    }
}


//// [typeGuardAccordingToProperty.js]
;
;
;
;
function f1(u) {
    if (typeof u.key !== 'boolean') {
        u; // Number1
        u.n1; // number
    }
}
function f1_1(u) {
    if (typeof u.key !== 'boolean') {
        u; // Number1
        u.n1; // number
    }
}
function f1_2(u) {
    if (typeof u.key === 'boolean') {
        u; // Bolean1 | Bolean2
        u.b1; // Error
        u.b2; // Error
    }
}
function f1_3(u) {
    if (typeof u.key != 'boolean') {
        u; // Test3
        u.n1;
    }
}
function f1_4(u) {
    if (typeof u.key == 'boolean') {
        u; // Test1 | Test2
        u.b1; // Error
        u.b2; // Error
    }
}
function f1ElementAccess_1(u) {
    if (typeof u["key"] !== 'boolean') {
        u; // Number1
        u.n1; // number
    }
}
function f1ElementAccess_2(u) {
    if (typeof u["key"] === 'boolean') {
        u; // Bolean1 | Bolean2
        u.b1; // Error
        u.b2; // Error
    }
}
function f1ElementAccess_3(u) {
    if (typeof u["key"] != 'boolean') {
        u; // Test3
        u.n1;
    }
}
function f1ElementAccess_4(u) {
    if (typeof u["key"] == 'boolean') {
        u; // Test1 | Test2
        u.b1; // Error
        u.b2; // Error
    }
}
function f1_Plus(u) {
    if (typeof u.key !== 'boolean') {
        throw new Error();
    }
    u; // Test1 | Test2
    if (typeof u.key === 'boolean') {
        throw new Error();
    }
    u; // never
}
// boolean bigint number string symbol undefined function object
function f2_1(u) {
    if (typeof u.key === 'bigint') {
        u; // BigInt1
        u.bi1;
    }
}
function f2_2(u) {
    if (typeof u.key === 'boolean') {
        u; // Boolean1
        u.b1;
    }
}
function f2_3(u) {
    if (typeof u.key === 'number') {
        u; // Number1
        u.n1;
    }
}
function f2_4(u) {
    if (typeof u.key === 'string') {
        u; // String1
        u.st1;
    }
}
function f2_5(u) {
    if (typeof u.key === 'symbol') {
        u; // Symbol1
        u.sy1;
    }
}
function f2_6(u) {
    if (typeof u.key === 'undefined') {
        u; // Undefined1
        u.u1;
    }
}
function f2_7(u) {
    if (typeof u.key === 'function') {
        u; // Function1
        u.f1;
    }
}
function f2_8(u) {
    if (typeof u.key === 'object') {
        u; // Object1
        u.o1;
    }
}
function f2Not_1(u) {
    if (typeof u.key !== 'bigint') {
        u; // not BigInt1
    }
}
function f2Not_2(u) {
    if (typeof u.key !== 'boolean') {
        u; // not Boolean1
    }
}
function f2Not_3(u) {
    if (typeof u.key !== 'number') {
        u; // not Number1
    }
}
function f2Not_4(u) {
    if (typeof u.key !== 'string') {
        u; // not String1
    }
}
function f2Not_5(u) {
    if (typeof u.key !== 'symbol') {
        u; // not Symbol1
    }
}
function f2Not_6(u) {
    if (typeof u.key !== 'undefined') {
        u; // not Undefined1
    }
}
function f2Not_7(u) {
    if (typeof u.key !== 'function') {
        u; // not Function1
    }
}
function f2Not_8(u) {
    if (typeof u.key !== 'object') {
        u; // not Object1
    }
}
;
;
function f3(bar) {
    if (typeof bar.x === 'string') {
        var y = bar.y; // string
    }
}
/////////////////////////////////////////////////////////
//  some case that need discuss further, This is not that right.
function f1_(u) {
    var tmp1 = u.key;
    if (typeof tmp1 !== 'boolean') {
        u; //Union1
        u.key; //number | boolean
    }
}
