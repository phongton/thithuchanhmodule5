import axios from "axios";
const URL_STUDENTS = "http://localhost:8080/students";
export const getAllStudents = async (name,startDate,endDate,top) => {
    try{
        let url = `http://localhost:8080/students?_sort=point&_order=desc`;
        let response;
        if(startDate&&endDate){
            response = await axios.get(url += `&date_gte=${startDate}&date_lte=${endDate}`)
        }else {
            response = await axios.get(url+= `&name_like=${name}`)
        }
        let students = response.data;

        if (top) {
            students = students.slice(0, top);
        }
        // console.log(response)
        return students
            // total: response.headers["x-total-count"],

    }catch (e){
        return []
    }
}

export const getAllStudent = async () => {
    let res = await axios.get(URL_STUDENTS);
    return res.data
}
export const saveStudent = async (student) => {
    try{
        await axios.post(URL_STUDENTS, student)

        return true
    }catch(e){
        return false
    }
}
export const deleteStudent = async (id) => {
    try{
        await axios.delete(URL_STUDENTS+"/"+id);
        return true
    }catch (e){
        return false
    }
}
export const findStudent = async (id) => {
    try{
        let res=await axios.get(URL_STUDENTS+"/"+id);

        return res.data

    }catch (e){
        return []
    }
}
export const updateStudent = async (data) => {
    try{
        await axios.put(URL_STUDENTS+`/${data.id}`,data);
        return true
    }catch(e){
        return false
    }
}