import axios from "axios";

const URL_ClASS =" http://localhost:8080/class"
export const getClass = async () => {
    try{
        let res = await axios.get(URL_ClASS)
        return res.data
    }catch(e){
        console.log(e);
    }

}
export const getClassById = async (id) => {
    try{
        let res = await axios.get(URL_ClASS+"/"+id)
        return res.data
    }catch(e){
        return []
    }

}
