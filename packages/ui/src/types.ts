/** Keep built-in suggestions while allowing application-defined variant names. */
export type ExtensibleVariant<BuiltIn extends string> = BuiltIn | (string & {});
