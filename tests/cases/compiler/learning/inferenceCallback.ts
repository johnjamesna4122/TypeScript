declare function map<T, U>(xs: readonly T[], fn: (x: T) => U): U[];

map([0, 1, 2], x => "" + x);

/**
 * Note: this explanation will gloss over parts already explained in ./inferenceSimple.ts.
 * Read that first.
 * 
 * checkCallExpression
 *   ... chooseOverload
 *     inferTypeArguments
 *       First round of inference: CheckMode includes SkipContextSensitive because the
 *       callback argument is contextually typed.
 *  
 *       Inference for `xs`:
 *         inferFromTypes(
 *           source: number[] (simple checkExpression on argument),
 *           target: readonly T[] (from uninstantiated signature)
 *         )
 *           Special case for both `source` and `target` are array types (same special
 *           case as two of the same generic type, e.g. Foo<string> and Foo<T>): just
 *           do `inferFromTypes` on type arguments.
 *             inferFromTypes(source: number, target: T)
 *               Add number as a candidate for T
 *   
 *       Inference for `fn`:
 *         Source type (empty anonymous object type so far) was marked as
 *         a NonInferrableType because it was checked with SkipContextSensitive. We
 *         make it as far as `inferFromSignatures` before no-oping because it has
 *         no signatures. (So, we have no candidates for `U`.)
 *   
 *       return getInferredTypes -> [number, unknown]
 * 
 *   getSignatureApplicabilityError -> so far so good, because the type of the
 *   callback argument is checked as `anyFunctionType` and the paramter type at this
 *   point is `(x: number) => unknown`, so that checks out.
 * 
 *   Because we skipped context-sensitive arguments before, we do a second round of
 *   inference with CheckMode.Normal. inferTypeArguments:
 *     Inference for `xs` goes same as earlier.
 *     Inference for `fn`:
 *       contextuallyCheckFunctionExpressionOrObjectLiteralMethod
 *         inferFromAnnotatedParameters -> no-op
 *         assignContextualParameterTypes
 *           get type of symbol `x` from instantiated contextual signature
 *             Use InferenceContext’s type mapper from T to number, which fixes the
 *             inference for `T`.
 *           (cache on signature’s parameter symbol)
 *         getReturnTypeFromBody -> string (simple checkExpression)
 *           (cache on signature)
 *       inferFromTypes(
 *         source: signature with newly cached types,
 *         target: (x: T) => U (uninstantiated signature)
 *       )
 *         inferFromObjectTypes (basically just type algebra from here down)
 *           inferFromSignatures
 *             applyToParameterTypes -> inferFromContravariantTypes
 *               inferFromTypes(source: number, target: T)
 *                 Inference for T is already fixed, no-op.
 *             applyToReturnTypes -> inferFromTypes(source: string, target: U)
 *                 Add string as a candidate for U
 * 
 *  The rest is the same as ./inferenceSimple.ts
 */