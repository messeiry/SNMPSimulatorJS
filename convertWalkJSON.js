var fs = require('fs');

fs.readFile('sample.walk', function(err, data) {

    if(err) throw err;
    var array = data.toString().split("\n");
    var jsonStr ='';
    for(i in array) {
        var oid     = array[i].split("=")[0].trim();

        try {
            var vtype    = array[i].split("=")[1].split(":")[0].trim();
            var val = array[i].split("=")[1].split(":")[1].replace("\""," ").replace("\""," ").trim();
        } catch(err) {

        }
        //console.log(i)
        //jsonStr.concat("\"" + oid + "\":" + "\"" + val + "\", ");

        //if (vtype == "STRING")
            console.log("\"" + oid + "\": " + "[" + "\"" + vtype + "\""+ "," + "\"" + val + "\"], ");


    }

    console.log(jsonStr);

});