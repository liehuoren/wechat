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
function lowerJSONKey(jsonObj) {
  for (var key in jsonObj) {
    if (/^[a-z]+|_$/.test(key)) {
      jsonObj[key.toUpperCase()] = jsonObj[key];
      delete (jsonObj[key]);
    }
  }
  return jsonObj;
};
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
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  D = date.getDate() + ' ';
  h = date.getHours() + ':';
  m = date.getMinutes() + ':';
  s = date.getSeconds();
  return Y + M + D + h + m + s;
}
module.exports = {
  formatTime: formatTime,
  upperJSONKey: upperJSONKey,
  upperListKey: upperListKey,
  lowerJSONKey: lowerJSONKey,
  timestampToTime: timestampToTime
}
