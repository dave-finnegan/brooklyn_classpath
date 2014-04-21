
// mongo query.js

var db_nm = "gnx";
var prop_n = 0;
var prop_v = 0;

if (typeof(dbnm) != "undefined") { db_nm = dbnm; }
if (typeof(pn) != "undefined") { prop_n = pn; }
if (typeof(pv) != "undefined") { prop_v = pv; }

db = db.getSiblingDB(db_nm);

var crit = {};
var doc = {};

crit = {};
crit["prop"+prop_n] = prop_v;
doc = db.raw.find (crit).explain();
//print ("raw:");
//printjson(doc)
print ("raw: query_cnt: "+doc['nscanned']+ " query_dur: " + doc['millis']);
db.metrics.update ({index:"raw"}, {$set: {query_cnt: doc['nscanned'], query_dur:doc['millis']}})

crit = {};
crit["n"] = "prop"+prop_n;
crit["v"] = prop_v;
doc = db.generic.find ( { "props" : {$elemMatch: crit} }).explain();
//print ("generic:");
//printjson (doc);
print ("generic: query_cnt: "+doc['nscanned']+ " query_dur: " + doc['millis']);
db.metrics.update ({index:"generic"}, {$set: {query_cnt: doc['nscanned'], query_dur:doc['millis']}})

crit = {};
crit["prop"+prop_n] = prop_v;
doc = db.blob.find ( { "props" : crit }).explain() ;
//print ("blob:");
//printjson(doc);
print ("blob: query_cnt: "+doc['nscanned']+ " query_dur: " + doc['millis']);
db.metrics.update ({index:"blob"}, {$set: {query_cnt: doc['nscanned'], query_dur:doc['millis']}})
