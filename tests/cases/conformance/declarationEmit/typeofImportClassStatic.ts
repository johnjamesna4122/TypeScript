// @declaration: true

// @Filename: a.ts
export class A {
  static foo() {}
}

// @Filename: b.ts
import { A } from './a';
export class B extends A {}

// @Filename: index.ts
import { B } from './b';
export const foo = B.foo;