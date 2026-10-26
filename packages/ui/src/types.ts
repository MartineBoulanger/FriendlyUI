/** Keep built-in suggestions while allowing application-defined names. */
export type ExtensibleString<BuiltIn extends string> = BuiltIn | (string & {});
export type ExtensibleVariant<BuiltIn extends string> =
  ExtensibleString<BuiltIn>;
export type Size = ExtensibleString<"sm" | "md" | "lg">;
