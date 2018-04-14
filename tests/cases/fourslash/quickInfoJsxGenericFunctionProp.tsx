/// <reference path="fourslash.ts" />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// interface Props<T> {
////   items: T[];
////   renderItem: (item: T) => string;
//// }
//// class Component<T> {
////   props: Props<T>;
//// }
//// var c = <Component items={[0, 1, 2]} render/*0*/Item={it/*1*/em => item.toFixed()}

verify.quickInfoAt("0", "(JSX Attribute) renderItem: (item: number) => string");
verify.quickInfoAt("1", "(parameter) item: number");
