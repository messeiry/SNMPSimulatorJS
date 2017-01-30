var snmp = require ("net-snmp");
// Default options



var varbinds = [
    {
        oid: "1.3.6.1.2.1.1.5.0",
        type: snmp.ObjectType.OctetString,
        value: new Buffer ("host1"),
    }, {
        oid: "1.3.6.1.2.1.1.6.0",
        type: snmp.ObjectType.OctetString,
        value: new Buffer ("host1"),
    }
];




    	console.log('---- THE VARBINDS TO SET ---------');
    	console.log(varbinds);
    	console.log('----------------------------------');


var options = {
    port: 5000,
    retries: 1,
    timeout: 5000,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version1
};
var session = snmp.createSession ("localhost", "any", options);

session.set(varbinds, function (error, varbinds) {
	//console.log(session)
	if (error) {
        console.error ("ERROR in SET OPR:>>>>" + error.toString ());
    } else {
        for (var i = 0; i < varbinds.length; i++) {
        	console.log('VAR=====' + varbinds[i].oid + "===" + varbinds[i].value );
            // for version 1 we can assume all OIDs were successful
            //console.log (varbinds[i].oid + "|" + varbinds[i].value);
        
            // for version 2c we must check each OID for an error condition
            if (snmp.isVarbindError (varbinds[i]))
                console.error ("error>>" + snmp.varbindError (varbinds[i]));
            else
                console.log ("Info>>" + varbinds[i].oid + "|" + varbinds[i].value);
        }
    }
});




/*
var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"];
session.get (oids, function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]))
            else
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
    }
});

*/