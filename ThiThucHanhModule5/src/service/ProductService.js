import axios from "axios";

const URL_PRODUCTS = "http://localhost:8080/products";
export const getAllProducts = async (name, id) => {
    try {
        let url = `http://localhost:8080/products?_sort=name&_order=asc`;
        let response;
        if (id) {
            url += `&categories=${id}`;
        }
        if (name) {
            url += `&name_like=${name}`;
        }
        response = await axios.get(url);
        return response.data;


    } catch (e) {
        return []
    }
}
export const saveProduct = async (product) => {
    try {
        await axios.post(URL_PRODUCTS, product)

        return true
    } catch (e) {
        return false
    }
}

