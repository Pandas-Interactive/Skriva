const axios = require('axios');
const fs = require('fs');
const { ulr } = require('inspector');
const qs = require('querystring');

// * curl - X "POST" - H "Authorization: Basic ZjM4ZjAw...WY0MzE=" - d grant_type = client_credentials https://accounts.spotify.com/api/token
const clientID = '1f28d5f656e24e26b7f7990e8fdeb2ce' 
const clientSecret = '7962b92c173f4c9690b09035ebf499ea'
const GetAccToken = (clientID, clientSecret) =>{
    //? base64 encoding
    let msg = `${clientID}:${clientSecret}`
    let base64_msg = Buffer.from(msg).toString('base64');

    //?making the request
    let authHeader ={
        'Authorization': `Basic ${base64_msg}`
    }
    const authData = {
        grant_type: 'client_credentials'
    }

    //? sending request
    axios.post('https://accounts.spotify.com/api/token', qs.stringify(authData), {
        headers: authHeader
    }).then(response => {
        console.log(response.data.access_token);
    });

}
//end
//?type, 
//curl -X "GET" "https://api.spotify.com/v1/users/" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "
const GetUser = () =>{

}