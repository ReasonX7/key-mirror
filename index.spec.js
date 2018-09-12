const test = require('kludjs');
const mk = require('./index');

test('should reduce input string by flow', function () {
  const actual = mk.flow(
    mk.joinPath,
    mk.upper,
    mk.snake,
    mk.prefix('PREFIX::')
  )('strange-String', 'some.path.to');

  const expected = 'PREFIX::SOME_PATH_TO_STRANGE_STRING';

  ok(eq(actual, expected), 'converted correctly');
});

test('should create Symbol', function () {
  const actual = mk.flow(mk.joinPath, Symbol)('someKey', 'some.path.to');

  const expected = Symbol('some.path.to.someKey');

  ok(eq(typeof actual, 'symbol'), 'it is symbol');
  ok(eq(actual.toString(), expected.toString()), 'the key is correct');
});

test('should mirror keys of nested object', () => {
  const actual = mk({
    a: 'a',
    b: null,
    nested: {
      x: 'x',
      y: null,
    },
  });

  const expected = {
    a: 'a',
    b: 'b',
    nested: {
      x: 'x',
      y: 'nested.y',
    },
  };

  ok(eq(actual, expected), 'was mirrored correctly');
});

test('should mirror keys using default prefix flow', () => {
  const actual = mk({
    a: 'a',
    b: null,
    nested: {
      x: 'x',
      y: null,
    },
  }, 'PREFIX::');

  const expected = {
    a: 'a',
    b: 'PREFIX::b',
    nested: {
      x: 'x',
      y: 'PREFIX::nested.y',
    },
  };

  ok(eq(actual, expected), 'was mirrored correctly');
});

test('should mirror using custom flow', () => {
  const actual = mk({
    a: 'a',
    b: null,
    nested: {
      x: 'x',
      y: null,
    },
  }, mk.flow(mk.joinPath, key => key.replace('.', '-')));

  const expected = {
    a: 'a',
    b: 'b',
    nested: {
      x: 'x',
      y: 'nested-y',
    },
  };

  ok(eq(actual, expected), 'was mirrored correctly');
});
