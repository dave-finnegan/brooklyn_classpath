
// mongo --eval "var dbnm='gnx'; var dcnt=10000; var pcnt=500; var icnt=6;" load.js

// dmf: write output to mongod collection

var db_nm = "gnx";
var doc_cnt = 100;
var prop_cnt = 250;
var inx_cnt = 6;

if (typeof(dbnm) != "undefined") { db_nm = dbnm; }
if (typeof(dcnt) != "undefined") { doc_cnt = dcnt; }
if (typeof(pcnt) != "undefined") { prop_cnt = pcnt; }
if (typeof(icnt) != "undefined") { inx_cnt = icnt; }

db = db.getSiblingDB(db_nm);

//
// drop and re-create collections
//

var beg;
var end;
var dur;

// raw
db.raw.drop();
for (var inx=0; inx<inx_cnt; ++inx) {
    var criteria = {};
    criteria["prop"+inx] = 1;
    db.raw.ensureIndex(criteria);
}

// generic
db.generic.drop();
db.generic.ensureIndex({'props.n':1,'props.v':1});

// blob
db.blob.drop();
db.blob.ensureIndex({props: 1});


//
// insert docs
//

// raw insert
beg = new Date().getTime();
for (var i=0; i<doc_cnt; ++i) {
    var doc = {};
    for (var j=0; j<prop_cnt; ++j) {
        doc["prop"+j] = Math.floor(Math.random() * 1000);
        //doc["prop"+j] = j;
    }
    //printjson (doc);
    db.raw.insert(doc);
}
end = new Date().getTime();
dur = (end - beg)/1000;
db.metrics.insert({index:"raw",load_dur:dur});
print ("raw: load_dur: " + dur);


// generic insert
beg = new Date().getTime();
for (var i=0; i<doc_cnt; ++i) {
    var doc = {};
    var arr = [];
    for (var j=0; j<prop_cnt; ++j) {
        var val = Math.floor(Math.random() * 1000);
        //var val = j;
        doc["prop"+j] = val;
    };
    for (var k=0; k<inx_cnt; ++k) {
        arr.push({n: "prop" + k, v: doc["prop"+k] })
    };
    doc["props"] = arr;
    //printjson(doc);
    db.generic.insert(doc);
}
end = new Date().getTime();
dur = (end - beg)/1000;
print ("generic: load_dur: " + dur);
db.metrics.insert({index:"generic",load_dur:dur});


// blob insert
beg = new Date().getTime();
for (var i=0; i<doc_cnt; ++i) {
    var doc = {};
    var arr = [];
    for (var j=0; j<prop_cnt; ++j) {
        var val = Math.floor(Math.random() * 1000);
        //var val = j;
        doc["prop"+j] = val;
    };
    for (var k=0; k<inx_cnt; ++k) {
        var pdoc = {};
        pdoc["prop" + k] =  doc["prop"+k];
        arr.push(pdoc)
    }
    doc["props"] = arr;
    //printjson(doc);
    db.blob.insert(doc);
}
end = new Date().getTime();
dur = (end - beg)/1000;
print ("blob: load_dur: " + dur);
db.metrics.insert({index:"blob",load_dur:dur});
