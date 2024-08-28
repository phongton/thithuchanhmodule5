import axios from "axios";

const URL_Category =" http://localhost:8080/categories"
export const getCategory = async () => {
    try{
        let res = await axios.get(URL_Category)
        return res.data
    }catch(e){
        console.log(e);
    }

}

