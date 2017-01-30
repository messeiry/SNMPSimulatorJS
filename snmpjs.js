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

the data types:
 ObjectIdentifier
 TimeTicks
 OctetString
 Integer
 IpAddress
 Counter32
 Unsigned32
 Opaque
 Counter64


*/

var counter = 0;

for (var key in data) {
    agent.request({oid: key, handler: handleAll });
    counter ++;
    console.log(counter + "-" + key);
}

function handleAll (prq) {
    var key = "." + prq.oid.slice(0,-2);
        if (prq.op == "3") {
            if (prq.hasOwnProperty('value') && prq.value != undefined) {
                data[key] = prq.value.value.toString();
                fs.writeFileSync("simdata.json", JSON.stringify(data) );
                snmp.provider.writableScalar(prq, snmp.data.createData({ type: 'OctetString', value: prq.value.value }) );
            }

        } else {
            var theJSONType = data["." + prq.node.oid.toString()][0] ;
            snmp.provider.writableScalar(prq, snmp.data.createData({type: convertDataType(theJSONType).toString(), value: data["." + prq.node.oid][1]}));
        }

}

/*
 ObjectIdentifier
 TimeTicks
 OctetString
 Integer
 IpAddress
 Counter32
 Unsigned32
 Opaque
 Counter64
*/


function convertDataType(walkDataType) {
    //var simDataType = 'OctetString';
    var simDataType;
    switch (walkDataType) {
        case "STRING":
            simDataType = "OctetString";
            break;
        case "Timeticks":
            simDataType = "OctetString";
            break;
        case "INTEGER":
            simDataType = "Integer";
            break;
        case "IpAddress":
            simDataType = "IpAddress";
            break;
        case "Counter32":
            simDataType = "Counter32";
            break;
        case "Unsigned32":
            simDataType = "Unsigned32";
            break;
        case "Counter64":
            simDataType = "Counter64";
            break;
        case "Opaque":
            simDataType = "Opaque";
            break;
        case "OID":
            simDataType = "ObjectIdentifier";
            break;
        case "Gauge32":
            simDataType = "Integer";
            break;
        default:
            simDataType = "OctetString";
    }

    return simDataType;
}



agent.bind({ family: 'udp4', port: 5000 });

/*
agent.request({ oid: key, handler: function (prq) {
        var val;
        if (prq.op == "3") {
            if (prq.hasOwnProperty('value') && prq.value != undefined) {
                data[key] = prq.value.value.toString();
                fs.writeFileSync("simdata.json", JSON.stringify(data) );
                val = snmp.data.createData({ type: 'OctetString', value: prq.value.value });
            }

        } else {
            console.log("::::: this is a GET Operation =============================");
            val = snmp.data.createData({ type: 'OctetString', value: data[key] });
        }
        snmp.provider.writableScalar(prq, val);
    } }
);
*/


/*
agent.addProviders(key);
var val = snmp.data.createData({ type: 'OctetString', value: prq.value.value });
*/


