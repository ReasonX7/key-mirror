# mirror-keys

A flexible way to mirror object keys.

## Installation

```bash
npm i mirror-keys
```

## Usage

### Importing

Node modules:
```js
const mk = require('mirror-keys');
```

ES6 modules:
```js
import mk from 'mirror-keys';
```

### Scenarios

#### No options

Input:
```js
const output = mk({
  a: 'a',
  b: null,
  nested: {
    x: 'x',
    y: null,
  },
});
```
Output:
```js
{
  a: 'a',
  b: 'b',
  nested: {
    x: 'x',
    y: 'nested.y',
  },
}
```

#### Prefix

Input:
```js
const output = mk({
  a: 'a',
  b: null,
  nested: {
    x: 'x',
    y: null,
  },
}, 'PREFIX::');
```
Output:
```js
{
  a: 'a',
  b: 'PREFIX::B',
  nested: {
    x: 'x',
    y: 'PREFIX::NESTED_Y',
  },
}
```

#### Custom

Input:
```js
const output = mk({
  a: 'a',
  b: null,
  nested: {
    x: 'x',
    y: null,
  },
}, mk.flow(mk.joinPath, key => key.replace('.', '-')));
```
Output:
```js
{
  a: 'a',
  b: 'b',
  nested: {
    x: 'x',
    y: 'nested-y',
  },
}
```

Available modifiers:

- `mk.flow(...funcs): string` - combines modifiers into one flow.
- `mk.upper(key: string): string` - converts key to `UPPERCASE`.
- `mk.prefix(prefix: string): function` - creates a function that adds a prefix to the key.
- `mk.snake(prefix: string): string` - converts key to `snake_case`.
- `mk.joinPath(key: string, path: string): string` - adds a path to the nested key.
