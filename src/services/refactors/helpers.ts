import {
    BindingElement,
    codefix,
    Debug,
    findAncestor,
    Identifier,
    ImportClause,
    ImportEqualsDeclaration,
    ImportSpecifier,
    isAnyImportOrRequireStatement,
    isBindingElement,
    isImportClause,
    isImportEqualsDeclaration,
    isImportSpecifier,
    isNamespaceImport,
    isVariableDeclaration,
    ModuleKind,
    NamespaceImport,
    Program,
    RequireOrImportCall,
    skipAlias,
    SourceFile,
    Symbol,
    textChanges,
    tryCast,
    TypeChecker,
    VariableDeclarationInitializedTo,
} from "../_namespaces/ts";
import {
    LanguageServiceHost,
} from "../types";
import {
    createFutureSourceFile,
    nodeSeenTracker,
    QuotePreference,
} from "../utilities";
import {
    addExportToChanges,
    getTopLevelDeclarationStatement,
    isTopLevelDeclaration,
    makeImportOrRequire,
    nameOfTopLevelDeclaration,
} from "./moveToFile";

/**
 * Returned by refactor functions when some error message needs to be surfaced to users.
 *
 * @internal
 */
export interface RefactorErrorInfo {
    error: string;
}

/**
 * Checks if some refactor info has refactor error info.
 *
 * @internal
 */
export function isRefactorErrorInfo(info: unknown): info is RefactorErrorInfo {
    return (info as RefactorErrorInfo).error !== undefined;
}

/**
 * Checks if string "known" begins with string "requested".
 * Used to match requested kinds with a known kind.
 *
 * @internal
 */
export function refactorKindBeginsWith(known: string, requested: string | undefined): boolean {
    if (!requested) return true;
    return known.substr(0, requested.length) === requested;
}

/** @internal */
export function getTargetFileImportsAndAddExportInOldFile(
    oldFile: SourceFile,
    targetFile: string,
    importsToCopy: Map<Symbol, boolean>,
    targetFileImportsFromOldFile: Set<Symbol>,
    changes: textChanges.ChangeTracker,
    checker: TypeChecker,
    program: Program,
    host: LanguageServiceHost,
    useEsModuleSyntax: boolean,
    quotePreference: QuotePreference,
    importAdder: codefix.ImportAdder,
) {
    /**
     * Recomputing the imports is preferred with importAdder because it manages multiple import additions for a file and writes then to a ChangeTracker,
     * but sometimes it fails because of unresolved imports from files, or when a source file is not available for the target file (in this case when creating a new file).
     * So in that case, fall back to copying the import verbatim.
     */
    importsToCopy.forEach((isValidTypeOnlyUseSite, symbol) => {
        const targetSymbol = skipAlias(symbol, checker);
        if (checker.isUnknownSymbol(targetSymbol)) {
            // TODO: maybe `importsToCopy` should contain the declaration in addition to the symbol/isValidTypeOnlyUseSite
            const declaration = tryCast(symbol.declarations?.[0], (d): d is ImportSpecifier | ImportClause | NamespaceImport | ImportEqualsDeclaration | BindingElement | VariableDeclarationInitializedTo<RequireOrImportCall> => isImportSpecifier(d) || isImportClause(d) || isNamespaceImport(d) || isImportEqualsDeclaration(d) || isBindingElement(d) || isVariableDeclaration(d))
                ?? findAncestor(symbol.declarations?.[0], isAnyImportOrRequireStatement);
            importAdder.addVerbatimImport(Debug.checkDefined(declaration));
        }
        else {
            importAdder.addImportFromSymbol(targetSymbol, isValidTypeOnlyUseSite);
        }
    });

    // Also, import things used from the old file, and insert 'export' modifiers as necessary in the old file.
    const targetFileSourceFile = program.getSourceFile(targetFile) ?? createFutureSourceFile(targetFile, ModuleKind.ESNext, program);
    let oldFileDefault: Identifier | undefined;
    const oldFileNamedImports: string[] = [];
    const oldFileSymbols: Symbol[] = [];
    const markSeenTop = nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
    targetFileImportsFromOldFile.forEach(symbol => {
        if (!symbol.declarations) {
            return;
        }
        for (const decl of symbol.declarations) {
            if (!isTopLevelDeclaration(decl)) continue;
            const name = nameOfTopLevelDeclaration(decl);
            if (!name) continue;

            const top = getTopLevelDeclarationStatement(decl);
            if (markSeenTop(top)) {
                addExportToChanges(oldFile, top, name, changes, useEsModuleSyntax);
                oldFileSymbols.push(symbol);
            }
        }
    });

    makeImportOrRequire(oldFile, oldFileDefault, oldFileNamedImports, oldFile.fileName, program, host, useEsModuleSyntax, quotePreference, oldFileSymbols, importAdder, targetFileSourceFile);
}
