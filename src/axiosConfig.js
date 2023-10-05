import axios from 'axios'
import Login from './Components/Login'

let instance = axios.create({
    headers:{
        "Content-Type":'application/x-www-form-urlencoded', 
        'Authorization':'null'
    }
})

instance.defaults.headers.common['Authorization'] = null

export function setDefaultHeader(authVal){
    instance.defaults.headers.common['Authorization']  = 'Bearer' + authVal
}

