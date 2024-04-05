import {
    BindingElement,
    codefix,
    Debug,
    findAncestor,
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
    nodeSeenTracker,
} from "../utilities";
import {
    addExportToChanges,
    addImportsForMovedSymbols,
    getTopLevelDeclarationStatement,
    isTopLevelDeclaration,
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
    importsToCopy: Map<Symbol, boolean>,
    targetFileImportsFromOldFile: Map<Symbol, boolean>,
    changes: textChanges.ChangeTracker,
    checker: TypeChecker,
    program: Program,
    useEsModuleSyntax: boolean,
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
            // TODO: `addImportFromSymbol` should possibly take some optional info from the original
            // import we're copying - a reference to the declaration would suffice. Currently, type-only
            // imports don't get copied as type-only unless a new import would have been added as type-only
            // according to preferences and compiler options and usage. But since this import is essentially
            // being copied, some orignal declaration info could be used to make the new import more similar
            // to the original.
            importAdder.addImportFromSymbol(targetSymbol, isValidTypeOnlyUseSite, symbol.name);
        }
    });

    const markSeenTop = nodeSeenTracker(); // Needed because multiple declarations may appear in `const x = 0, y = 1;`.
    targetFileImportsFromOldFile.forEach((_, symbol) => {
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
            }
        }
    });

    addImportsForMovedSymbols(targetFileImportsFromOldFile, oldFile.fileName, importAdder, program);
}
