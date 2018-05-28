var http = require('http.js')
var util = require('util.js')

let getFirst = function(self) {
  http.httpPost('/app/common/area/subcollection','',{},function(res) {
    if(res.code == '000000') {
      
    }
  })
}

let getNext = function(code, self) {
  http.httpPost('/app/common/area/subcollection', {id: code}, {}, function (res) {
    if (res.code == '000000') {
      
    }
  })
}

module.exports = {
  getFirst,
  getNext
}