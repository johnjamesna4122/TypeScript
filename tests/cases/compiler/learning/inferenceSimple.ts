declare function id<T>(x: T): T;

id(3);

/**
 * checkCallExpression on id(3)
 *   getResolvedSignature -> resolveCall -> chooseOverload
 *     All inference is triggered from `chooseOverload`, which we need to do because the
 *     call expression doesn’t specify type arguments. Start by creating an inference
 *     context, which is used as a state container for all inference on this call. Upon
 *     creation it’s mostly empty, with also empty-ish leaf container objects
 *     (`InferenceInfo`) for each type parameter (just `T` in this case).
 *
 *     typeArgumentTypes = inferTypeArguments(...)
 *       For each argument, get `paramType` from uninstantiated signature and `argType`
 *       from `checkExpressionWithContextualType` with the argument node and `paramType`
 *       as the contextual type. In this case:
 * 
 *       paramType = T
 *       argType = 3
 * 
 *       inferTypes(source: 3, target: T) - read: “infer from 3 to T”
 *         Target is a type parameter and its inference is not already fixed, so we add
 *         the type 3 as a candidate for T’s InferenceInfo. (That is, we mutate the
 *         InferenceInfo within the InferenceContext.)
 * 
 *       return getInferredTypes(inferenceContext)
 *         Basically we go through the inferences for each type parameter, select a
 *         candidate, and do some manipulations like widening if necessary. Since we
 *         only have one candidate for T, nothing interesting ends up happening, we
 *         just end up returning [3].
 * 
 *     candidateSignature = getSignatureInstantiation(uninstantiatedSig, typeArgumentTypes)
 *         We create an instantiated signature with the type arguments we just inferred
 *         and erasing the type parameters. The parameter symbol for the new `x` runs
 *         through `instantiateSymbol` with (in this case) a UnaryTypeMapper mapping from
 *         T (retrieved from `uninstantiatedSig`) to 3 (retrieved from `typeArgumentTypes`).
 *         The same type mapper is saved on the signature itself in case it’s needed for
 *         the return type (spoilers: it will be needed).
 * 
 *     getSignatureApplicabilityError(candidateSignature)
 *         Check to make sure our actual argument type is assignable to the parameter type
 *         we’ve finally inferred for `x`. Nothing too interesting happens here: the
 *         parameter type from the new signature we just instantiated is eventually
 *         retrieved by invoking the mapper, and the argument type is retrieved with
 *         checkExpressionWithContextualType (again).
 * 
 *     It all works out and there are no other overloads, so we return (and cache) the
 *     instantiated signature.
 * 
 *   getReturnTypeOfSignature(newly instantiated signature)
 *     - `signature.target` holds a reference to the uninstantiated signature
 *     - The return type of that is trivially known to be `T`
 *     - `signature.mapper` is the UnaryTypeMapper from T to 3
 *     We call instantiateType with those and get 3.
 * 
 * That’s it!
 */