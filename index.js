function flow() {
  var funcs = arguments;
  return function(key, path) {
    var length = funcs.length;
    var index;
    for (index = 0; index < length; index++) {
      key = funcs[index](key, path);
    }
    return key;
  }
}

function prefix(str) {
  return function(key) {
    return str + key;
  }
}

function upper(key) {
  return key.toUpperCase();
}

function snake(key) {
  return key.replace(/\W+/g, '_');
}

function joinPath(key, path) {
  return path ? path + '.' + key : key;
}

function parseOption(option) {
  switch (typeof option) {
    case 'string': return flow(joinPath, prefix(option));
    case 'function': return option;
    case 'undefined': return joinPath;
    default: throw new Error(
      'mirror-keys: option parameter should be a string, function or undefined.'
    );
  }
}

function mirror(obj, path, reflect) {
  var result = {};
  var key;
  var val;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      result[key] = (
        val == null
          ? reflect(key, path)
          : typeof val === 'object' ? mirror(val, joinPath(key, path), reflect) : val
      );
    }
  }

  return result;
}

function mirrorKeys(obj, option) {
  var create = parseOption(option);
  return mirror(obj, '', create);
}

mirrorKeys.flow = flow;
mirrorKeys.prefix = prefix;
mirrorKeys.upper = upper;
mirrorKeys.snake = snake;
mirrorKeys.joinPath = joinPath;

module.exports = mirrorKeys;
