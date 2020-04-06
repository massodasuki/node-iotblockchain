
const axios = require('axios')

var Biodata = require('../models/Biodata')

const host = '';

// USE BY CRONS
function getOneBiodata ()
{   
    return new Promise(function(resolve, reject){
        //  get the first  data from monggo
        Biodata.findOne({}, function(error, data) {
            if (data){
                resolve({status:200, data:data})
            }
            else if (error)
            {
                console.log(error)
                reject({status:404})
            }
        });
    })
   
}


async function sendOneBiodata(host, payload)
{ 
    return new Promise(async function(resolve,reject){

        var host = 'http://192.168.15.17:5000/bigchain'
        console.log(payload.age);
        // send data to BigchainDB
        
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
            }
        })

        response = await instance.post(host, payload);
        // return response;

        if (response) { 
            resolve({status:200, data:payload._id})
        }
    })
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
    // var payload = getOneBiodata();
    
    getOneBiodata().then(function(status){
        if (status && status.data)
        {
            console.log(status.data._id)
            return sendOneBiodata(host, status.data);
        } else {
            reject ({status:404})
        }
        
    }).catch (function(err){
        console.log(err);
    }).then(function(status){
        deleteOneBiodata(status.data._id);
    }).catch(function(err){
        console.log(err);
    }).then(function(status){
        //COMPLETE
    })
}

// module.exports.getOneBiodata = getOneBiodata;
// module.exports.sendOneBiodata = sendOneBiodata;
// module.exports.deleteOneBiodata = deleteOneBiodata;
module.exports.transferBiodata = transferBiodata;