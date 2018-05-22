const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function upperJSONKey(jsonObj) {
  for (var key in jsonObj) {
    if (/^[A-Z]+|_$/.test(key)) {
      jsonObj[key.toLowerCase()] = jsonObj[key];
      delete (jsonObj[key]);
    }
  }
  return jsonObj;
};
function upperListKey(list) {
  var a = list.map(function (value, key, arr) {
    return upperJSONKey(value);
  })
  return a;
}
module.exports = {
  formatTime: formatTime,
  upperJSONKey: upperJSONKey,
  upperListKey: upperListKey
}
