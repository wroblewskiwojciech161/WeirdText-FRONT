import axios from "axios";
import {urlBasePath} from "./constants"

// connection with API - methods
// fetch data using axios get response

export function getCoding(type,params, onSuccess, onError) {

  axios
    .get(`${urlBasePath}${type}`,{
      params:params
      
      
    })
    .then(response => {
      onSuccess(response.data);
     
    })
    .catch(error => {
      onError(error.name + ":" + error.message);
    });
}


