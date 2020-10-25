import axios from 'axios';

const token = 'OW4t0Yn9dMyqAxF6AlFwgneUrAqR4jiI';
const options = {
  headers: {
          'AuthToken': token 
        }  
}
export function getRequest(url) {   
    return axios.get(url, options);
}

export function postRequest(url, body){
    return axios.post(url, body, options);
}


  // API Key: OW4t0Yn9dMyqAxF6AlFwgneUrAqR4jiI