#!/bin/bash

[ $# -ne 1 ] && echo "Usage: mhost:mport" && exit 1
mdbh=`echo $1|sed "s@:.*@@"`
mdbp=`echo $1|sed "s@.*:@@"`

# load - don't rebuild just for multiple queries!
for bcnt in 1000 50000; do
    for zcnt in 0 25 50 100 200 300 500 1000; do
        script="ts-b${bcnt}-z${zcnt}.js"
        echo "Creating $script"
        echo ""                                     > $script
        echo "var drop = 1;"                        >> $script
        echo "var stat = 1;"                        >> $script
        echo "var noload = 0;"                      >> $script
        echo "var dbg = 0;"                         >> $script
        echo ""                                     >> $script
        echo "var ts = 1388552400;"                 >> $script
        echo "var tsi = 60;"                        >> $script
        echo "var bsiz = 1000;"                     >> $script
        echo "var qcnts = \"1 2 4\";"               >> $script
        echo "var qids = \"280,564,950,342\";"      >> $script
        echo ""                                     >> $script
        echo ""                                     >> $script
        echo "if (typeof(mdbh) == \"undefined\") {" >> $script
        echo "    var mdbh = \"$mdbh\";"            >> $script
        echo "}"                                    >> $script
        echo "if (typeof(mdbp) == \"undefined\") {" >> $script
        echo "    var mdbp = $mdbp;"                >> $script
        echo "}"                                    >> $script
        echo "var mdbn = \"ts-metrics\";"           >> $script
        echo ""                                     >> $script
        echo "var dbc = \"ts\";"                    >> $script
        echo ""                                     >> $script
        echo "var bcnt = $bcnt;"                    >> $script
        echo "var zcnt = $zcnt;"                    >> $script
        echo "var dbn = \"ts-b${bcnt}-z${zcnt}\";"  >> $script
        echo ""                                     >> $script
        echo "load(\"timeSeriesTest.js\");"         >> $script
        echo ""                                     >> $script
    done
done

