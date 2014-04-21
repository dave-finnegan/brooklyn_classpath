
var drop = 1;
var stat = 1;
var noload = 0;
var dbg = 0;

var ts = 1388552400;
var tsi = 60;
var bsiz = 1000;
var qcnts = "1 2 4";
var qids = "280,564,950,342";


if (typeof(mdbh) == "undefined") {
    var mdbh = "54.186.200.250";
}
if (typeof(mdbp) == "undefined") {
    var mdbp = 27017;
}
var mdbn = "ts-metrics";

var dbc = "ts";

var bcnt = 50000;
var zcnt = 1000;
var dbn = "ts-b50000-z1000";

load("timeSeriesTest.js");

