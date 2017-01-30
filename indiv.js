// to kill a process running in a port :
// sudo kill `sudo lsof -t -i:161`
/*
 snmpget -v 2c -c any localhost:5000 .1.3.6.1.2.1.1.5.0
 iso.3.6.1.2.1.1.5.0 = STRING: "ubuntu"

 $ snmpset -v 2c -c any localhost:5000  .1.3.6.1.2.1.1.5.0 s "Editable"
 iso.3.6.1.2.1.1.5.0 = STRING: "ubuntu"

 $ snmpwalk -v 2c -c public localhost:5000



 JSON Data :L
 {
 ".1.3.6.1.2.1.1.5": "the initial value",
 ".1.3.6.1.2.1.1.6": "Second initial value"
 }


 */

var os = require('os');
var snmp = require('snmpjs');
var fs = require('fs');

var agent = snmp.createAgent();
agent.bind({ family: 'udp4', port: 5000 });


var contents = fs.readFileSync("simdata.json");
var data = JSON.parse(contents);

//console.log(data);

/*var data = {
 ".1.3.6.1.2.1.1.5":"the initial value",
 ".1.3.6.1.2.1.1.6":"Second initial value"
 };

 if (data.hasOwnProperty('.1.3.6.1.2.1.1.5')) {
 console.log(data['.1.3.6.1.2.1.1.5']);
 }

 */

// prg == provider request
// the set operation normaly get the _op = 3 and get usually have _op = 0
// check for value to be set which is only sent in SET operation mode


key1  = ".1.3.6.1.2.1.1.5";
key2 = ".1.3.6.1.2.1.1.6";


 agent.request({ oid: key1, handler: function (prq) {
     console.log(prq.oid);
     var val;
     if (prq.op == "3") {
     if (prq.hasOwnProperty('value') && prq.value != undefined) {
     data[key1] = prq.value.value.toString();
     fs.writeFileSync("simdata.json", JSON.stringify(data) );
     val = snmp.data.createData({ type: 'OctetString', value: prq.value.value });
     }

     } else {
     console.log("::::: this is a GET Operation ============================="     + prq.oid);
     val = snmp.data.createData({ type: 'OctetString', value: data[key1] });
     }
     snmp.provider.writableScalar(prq, val);
     } }
 );


agent.request({ oid: key2, handler: function (prq) {
    console.log(prq.oid);
        var val;
        if (prq.op == "3") {
            if (prq.hasOwnProperty('value') && prq.value != undefined) {
                data[key2] = prq.value.value.toString();
                fs.writeFileSync("simdata.json", JSON.stringify(data) );
                val = snmp.data.createData({ type: 'OctetString', value: prq.value.value });
            }

        } else {
            console.log("::::: this is a GET Operation =============================XX" + prq.oid);
            val = snmp.data.createData({ type: 'OctetString', value: data[key2] });
        }
        snmp.provider.writableScalar(prq, val);
    } }
);