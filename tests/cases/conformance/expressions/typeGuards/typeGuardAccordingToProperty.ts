interface Test1 {
    somekey: boolean;
    s1: number;
};

interface Test2 {
    somekey: boolean;
    s2: number;
};

interface Test3 {
    somekey: number;
    s3: number;
};

type Union1 =Test1|Test2|Test3;

function f1(u: Union1){
    if(typeof u.somekey !== 'boolean'){
        u;     // Test3
        u.s3;   // number
    }
    if(typeof u.somekey === 'boolean'){
        u;      // Test1 | Test2
        u.s1;   // Error
        u.s2;   // Error
    }
    if(typeof u.somekey != 'boolean'){
        u;     // Test3
        u.s3;
    }
    if(typeof u.somekey == 'boolean'){
        u;     // Test1 | Test2
        u.s1;   // Error
        u.s2;   // Error
    }
}

function f1_Plus(u: Union1){
    if(typeof u.somekey !== 'boolean'){
        throw new Error();
    }
    u;  // Test1 | Test2
    if(typeof u.somekey === 'boolean'){
        throw new Error();
    }
    u;  // never
}

interface A { x: string, y: string };
interface B { x: number, y: number };
type X = A | B;

 function f2(bar:X){
    if (typeof bar.x === 'string') {
        let y = bar.y; // string
    }
 }

/////////////////////////////////////////////////////////
//  some case that need discuss further, This is not that right.
function f1_(u: Union1){
    const tmp1 = u.somekey;
    if(typeof tmp1 !== 'boolean'){
        u;     //Union1
        u.somekey;      //number | boolean
    }
}

