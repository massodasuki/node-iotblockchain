
const axios = require('axios')

var mongoose = require('mongoose');
var Biodata = mongoose.model('Biodata');

const host = '';

// USE BY CRONS
function getOneBiodata ()
{   
    var bio;
   //  get the first  data from monggo
    Biodata.findOne({}, function(error, data) {
    bio = data;
    console.log(data); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
   
    });

    return bio;
}


function sendOneBiodata(host, payload)
{ 
    // send data to BigchainDB
    var payload;

    const instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    })

    response = await instance.post(host, payload);
    return response;
  
}

function deleteOneBiodata (id)
{
    // delete data from monggo
    Biodata.findByIdAndRemove(id, function(err,data)
    {
        if(!err){
            if (data === 1) {
                console.log("Fail");
            }
            else {
                console.log(data + " deleted");
            }
        }
    });
  
}

function transferBiodata (host)
{
    var payload = getOneBiodata();
    sendOneBiodata(host, payload);
    deleteOneBiodata(payload.id);

}

// module.exports.getOneBiodata = getOneBiodata;
// module.exports.sendOneBiodata = sendOneBiodata;
// module.exports.deleteOneBiodata = deleteOneBiodata;
module.exports.transferBiodata = transferBiodata;