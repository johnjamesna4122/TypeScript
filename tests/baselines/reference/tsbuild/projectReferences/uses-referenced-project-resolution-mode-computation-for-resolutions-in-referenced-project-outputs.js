currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/node_modules/some-lib/index.d.cts]

                    export class SomeType {
                        private property;
                    }

//// [/node_modules/some-lib/index.d.ts]

                    export class SomeType {
                        private property;
                    }

//// [/node_modules/some-lib/package.json]
{
  "name": "some-lib",
  "type": "module",
  "exports": {
    "import": "./index.js",
    "require": "./index.cjs"
  }
}

//// [/package.json]
{
  "name": "my-package",
  "type": "module",
  "exports": "./dist/index.js"
}

//// [/src/index.ts]

                    import { SomeType } from 'some-lib'
                    export function myFunction(input: SomeType) {}

//// [/test/test.ts]

                    import { myFunction } from "my-package";
                    import { SomeType } from "some-lib";
                    myFunction(new SomeType());

//// [/tsconfig.json]
{
  "include": [
    "src"
  ],
  "compilerOptions": {
    "composite": true,
    "module": "nodenext",
    "outDir": "dist",
    "rootDir": "src"
  }
}

//// [/tsconfig.test.json]
{
  "references": [
    {
      "path": "./tsconfig.json"
    }
  ],
  "include": [
    "test"
  ],
  "compilerOptions": {
    "module": "preserve",
    "noEmit": true
  }
}



Output::
/lib/tsc -b tsconfig.test.json --traceResolution --pretty false
File '/src/package.json' does not exist.
Found 'package.json' at '/package.json'.
======== Resolving module 'some-lib' from '/src/index.ts'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' exists according to earlier cached lookups.
Loading module 'some-lib' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/node_modules/some-lib/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.js'.
File name '/node_modules/some-lib/index.js' has a '.js' extension - stripping it.
File '/node_modules/some-lib/index.ts' does not exist.
File '/node_modules/some-lib/index.tsx' does not exist.
File '/node_modules/some-lib/index.d.ts' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/node_modules/some-lib/index.d.ts', result '/node_modules/some-lib/index.d.ts'.
======== Module name 'some-lib' was successfully resolved to '/node_modules/some-lib/index.d.ts'. ========
File '/node_modules/some-lib/package.json' exists according to earlier cached lookups.
File '/lib/package.json' does not exist.
File '/package.json' exists according to earlier cached lookups.
error TS2318: Cannot find global type 'Array'.
error TS2318: Cannot find global type 'Boolean'.
error TS2318: Cannot find global type 'Function'.
error TS2318: Cannot find global type 'IArguments'.
error TS2318: Cannot find global type 'Number'.
error TS2318: Cannot find global type 'Object'.
error TS2318: Cannot find global type 'RegExp'.
error TS2318: Cannot find global type 'String'.
error TS6053: File '/lib/lib.esnext.full.d.ts' not found.
  The file is in the program because:
    Default library for target 'esnext'
======== Resolving module 'my-package' from '/test/test.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/test/package.json' does not exist.
File '/package.json' exists according to earlier cached lookups.
Using 'exports' subpath '.' with target './dist/index.js'.
File name '/dist/index.js' has a '.js' extension - stripping it.
File '/dist/index.ts' does not exist.
File '/dist/index.tsx' does not exist.
File '/dist/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/dist/index.d.ts', result '/dist/index.d.ts'.
======== Module name 'my-package' was successfully resolved to '/dist/index.d.ts'. ========
======== Resolving module 'some-lib' from '/test/test.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/test/package.json' does not exist according to earlier cached lookups.
File '/package.json' exists according to earlier cached lookups.
Loading module 'some-lib' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/test/node_modules' does not exist, skipping all lookups in it.
File '/node_modules/some-lib/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.js'.
File name '/node_modules/some-lib/index.js' has a '.js' extension - stripping it.
File '/node_modules/some-lib/index.ts' does not exist.
File '/node_modules/some-lib/index.tsx' does not exist.
File '/node_modules/some-lib/index.d.ts' exists - use it as a name resolution result.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/node_modules/some-lib/index.d.ts', result '/node_modules/some-lib/index.d.ts'.
======== Module name 'some-lib' was successfully resolved to '/node_modules/some-lib/index.d.ts'. ========
File '/dist/package.json' does not exist.
File '/package.json' exists according to earlier cached lookups.
======== Resolving module 'some-lib' from '/dist/index.d.ts'. ========
Using compiler options of project reference redirect '/tsconfig.json'.
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/dist/package.json' does not exist according to earlier cached lookups.
File '/package.json' exists according to earlier cached lookups.
Loading module 'some-lib' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/dist/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'some-lib' was found in cache from location '/'.
======== Module name 'some-lib' was successfully resolved to '/node_modules/some-lib/index.d.ts'. ========
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/dist/index.d.ts]
import { SomeType } from 'some-lib';
export declare function myFunction(input: SomeType): void;


//// [/dist/index.js]
export function myFunction(input) { }


//// [/tsconfig.test.tsbuildinfo]
{"root":["./test/test.ts"],"version":"FakeTSVersion"}

//// [/tsconfig.test.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./test/test.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}

//// [/tsconfig.tsbuildinfo]
{"fileNames":["./node_modules/some-lib/index.d.ts","./src/index.ts"],"fileIdsList":[[1]],"fileInfos":[{"version":"7131265700-\n                    export class SomeType {\n                        private property;\n                    }","impliedFormat":99},{"version":"18197262329-\n                    import { SomeType } from 'some-lib'\n                    export function myFunction(input: SomeType) {}","signature":"6098530195-import { SomeType } from 'some-lib';\nexport declare function myFunction(input: SomeType): void;\n","impliedFormat":99}],"root":[2],"options":{"composite":true,"module":199,"outDir":"./dist","rootDir":"./src"},"referencedMap":[[2,1]],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./dist/index.d.ts","version":"FakeTSVersion"}

//// [/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./node_modules/some-lib/index.d.ts",
    "./src/index.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/some-lib/index.d.ts"
    ]
  ],
  "fileInfos": {
    "./node_modules/some-lib/index.d.ts": {
      "original": {
        "version": "7131265700-\n                    export class SomeType {\n                        private property;\n                    }",
        "impliedFormat": 99
      },
      "version": "7131265700-\n                    export class SomeType {\n                        private property;\n                    }",
      "signature": "7131265700-\n                    export class SomeType {\n                        private property;\n                    }",
      "impliedFormat": "esnext"
    },
    "./src/index.ts": {
      "original": {
        "version": "18197262329-\n                    import { SomeType } from 'some-lib'\n                    export function myFunction(input: SomeType) {}",
        "signature": "6098530195-import { SomeType } from 'some-lib';\nexport declare function myFunction(input: SomeType): void;\n",
        "impliedFormat": 99
      },
      "version": "18197262329-\n                    import { SomeType } from 'some-lib'\n                    export function myFunction(input: SomeType) {}",
      "signature": "6098530195-import { SomeType } from 'some-lib';\nexport declare function myFunction(input: SomeType): void;\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      2,
      "./src/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 199,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/index.ts": [
      "./node_modules/some-lib/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./node_modules/some-lib/index.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/index.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./dist/index.d.ts",
  "version": "FakeTSVersion",
  "size": 771
}

