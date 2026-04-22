/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "pan",

  extras: $ => [
    /[\s\uFEFF\u2060\u200B]/,
    $.comment,
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat($.message_declaration),

    message_declaration: $ => seq(
      field("side", $.side),
      field("prefix", $.symbol),
      ":",
      field("message", $.symbol),
      field("parameters", $.parameter_list),
      ";",
    ),

    side: _ => choice(
      "client",
      "server",
    ),

    parameter_list: $ => seq(
      "(",
      optional(commaSep1($.parameter)),
      ")",
    ),

    parameter: $ => seq(
      field("type", $.type_name),
      optional(field("name", $.identifier)),
    ),

    type_name: $ => choice(
      $.builtin_type,
      $.symbol,
    ),

    builtin_type: _ => choice(
      "bool",
      "id",
      "char64",
      "int8",
      "int16",
      "int32",
      "int64",
      "float",
      "double",
      "string",
      "blob",
    ),

    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,

    // prefix/type:
    symbol: _ => token(/[A-Za-z_][A-Za-z0-9_.]{0,7}/),

    comment: _ => token(seq("#", /[^\n]*/)),
  },
});

/**
 * @param {RuleOrLiteral} rule
 */
function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}
