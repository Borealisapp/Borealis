function read(primaryKey) {
    var json = localStorage.getItem(primaryKey)
    if(json != null) {
        return JSON.parse(json);
    }
    return {}
}

function set(primaryKey, secondaryKey, val) {
    const json = read(primaryKey);
    json[secondaryKey] = val;
    localStorage.setItem(primaryKey, JSON.stringify(json));
    return json;
}
exports.read = function(primaryKey) {
    return read(primaryKey)
}

exports.get = function(primaryKey, secondaryKey) {
    return read(primaryKey)[secondaryKey]
}

exports.set = function(primaryKey, secondaryKey, val) {
    return set(primaryKey, secondaryKey, val)
}

exports.setDefault = function(primaryKey, secondaryKey, val) {
    const json = read(primaryKey);
    const value = json[secondaryKey];
    if(value == null) {
        set(primaryKey, secondaryKey, val);
    }
}