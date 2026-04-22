Tree-sitter bindings for pan message format
-------------------------------------------

Tree-sitter grammar for the [pan protocol](https://github.com/random-username-here/mipt-ded-bardak/tree/master/pan) specification language.

## Status

Early version. Parses PAN message declarations and provides basic highlighting queries.

## Features

- `client` / `server` message declarations
- `prefix:type(args...);` syntax
- comments starting with `#`
- optional argument names
- built-in PAN scalar types
- Neovim highlight queries

## Example

```pan
# It is your turn
server turns:turn();

# Move by (dx, dy)
client gmap:move(int8 dx, int8 dy);

# Server response
server gmap:r.vis(id unitId, char64 unitType, int8 dx, int8 dy);
````

## Development

Install dependencies:

```sh
npm install
```

Generate parser:

```sh
npx tree-sitter generate
```

Parse a sample file:

```sh
npx tree-sitter parse examples/person.pan
```

Run tests:

```sh
npx tree-sitter test
```

## References

The original author of the message format is [@random-username-here](https://github.com/random-username-here).
