type Test1 = {
    someKey: false
} | {
    someKey: {
        someKeyInside: number
        anotherKey1: number
    },
    someKeyThatExistOnlyIfOtherKeyIsNotFalse: string;
} | {
    someKey: {
        someKeyInside: boolean
        anotherKey2: number
    },
    someKeyThatExistOnlyIfOtherKeyIsNotFalse: string;
}  ;

const test1: Test1 = {someKey:false};


type Test2 = {
    someKey: false
} | {
    someKey: {
        // The only one difference from type Test1, someKeyInside can be undefined on someKey
        someKeyInside?: number
    },
    someKeyThatExistOnlyIfOtherKeyIsNotFalse: string;
};

type Test3 = {
    somekey: boolean,
    p1: number;
}|{
    somekey: number;
    p2: number;
};

function f3(test3: Test3){
    if(typeof test3.somekey === "boolean"){
        console.log(test3.p1);
    }
}

function f11(test1: Test1){
    if (test1.someKey) {
        console.log(test1.someKeyThatExistOnlyIfOtherKeyIsNotFalse); // OK!
    }
}

function f12(test1: Test1){
    if (typeof test1.someKey !== "boolean") {
        console.log(test1.someKeyThatExistOnlyIfOtherKeyIsNotFalse); // OK!
    }
}

function f21(test2: Test2){
    if (typeof test2.someKey === "object") {
        console.log(test2.someKeyThatExistOnlyIfOtherKeyIsNotFalse); // TS2339: Property 'someKeyThatExistOnlyIfOtherKeyIsNotFalse' does not exist on type '{ someKey: false; }'.
    }
}

function f22(test2: Test2){
    if (typeof test2.someKey !== "boolean") {
        console.log(test2.someKeyThatExistOnlyIfOtherKeyIsNotFalse); // TS2339: Property 'someKeyThatExistOnlyIfOtherKeyIsNotFalse' does not exist on type '{ someKey: false; }'.
    }
}

// #region case_1
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
    if(typeof u.somekey === "boolean"){
        // narrow u type to what? Test1|Test2, or just literal?
    }
}
// #endregion case_1


// #region case_2
type Union2 = {
    someKey: false
} | {
    someKey: {
        someKeyInside: number
        anotherKey1: number
    },
    someKeyThatExistOnlyIfOtherKeyIsNotFalse: string;
} | {
    someKey: {
        someKeyInside: boolean
        anotherKey2: number
    },
    someKeyThatExistOnlyIfOtherKeyIsNotFalse: string;
}  ;

function f2(u: Union2){
    if(typeof u.somekey !== "boolean"){
        // check whether u.somekey expect boolean type is all object, and all obejct has key called "someKeyInside"
        if(typeof u.someKey.someKeyInside === "boolean"){

        }
    }

    if(typeof u.somekey === "boolean"){
        // narrow u type to what? Test1|Test2, or just literal?
        throw new Error();
    }

    // could we let this happen? or just let this happen when current union type all has this key?
    // what error should be thrown? this property not exist in all untion type?
    if(typeof u.someKey.someKeyInside === "boolean"){

    }
}

// #endregion case_2

/**
 * Q1: is type guard the progress narrow union type to only one?
 * I suppose so?
 *
 * Q2: does typeof keyword trigger narrow?
 * I suppose so? it should trigger, so Q1 could work.
 *
 * Q3: how to trigger typeof keyword narrow? only if this instance is union type?
 *
 * Q4: typeof could work for property
 *
 * Q5: typeof could work for object
 *
 * Q6: typeof work for switch, condition
 *
 * Q7: what about optional chain like typeof a?.b?.c === ''
 *  */