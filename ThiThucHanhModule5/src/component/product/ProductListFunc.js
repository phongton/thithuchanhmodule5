import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import * as productService from "../../service/ProductService";

import * as categoryService from "../../service/CategoryService";
import {format} from 'date-fns';
function ProductListFunc() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [initialStudents, setInitialStudents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        getAllProduct()
        getCategory()
    }, [name,selectedCategory])
    const getAllProduct = async () => {
        let data = await productService.getAllProducts(name,selectedCategory);
        if (data.length === 0) {
            toast.warning("No products found ");
        }
        setProducts(data);
        if (initialStudents.length === 0) {
            setInitialStudents(data);
        }
    }



    const getCategory = async () => {
        let res = await categoryService.getCategory()
        setCategories(res)

    }
    const getCategoryName = (id) => {
        const categoryName = categories.find(ct => ct.id === id);
        return categoryName ? categoryName.name : "unknown";
    }

    function handleRefresh() {
        setProducts(initialStudents);
        setName('');
        setSelectedCategory('');

    }
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    }
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };


    return (
        <>
            <div className="d-flex mb-3">
                <input className="form-control form-control-sm mb-3 mt-3 ms-5 w-25"
                       placeholder="Search by name"
                       value={name} onChange={(e) => setName(e.target.value)}/>
                <select
                    className="form-control form-control-sm mb-3 mt-3 ms-5 w-25"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button type="button" onClick={handleRefresh}
                        className="form-control-sm mb-3 mt-3 ms-5 btn btn-success"><span
                    className="material-symbols-outlined">refresh</span></button>

            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID Product</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date</th>

                </tr>
                </thead>
                <tbody>
                {
                    products
                        .map((item, index) =>
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{getCategoryName(item.categories)}</td>
                                <td>{item.quantity}</td>
                                <td>{formatPrice(item.price)}</td>
                                <td>{formatDate(item.date)}</td>
                            </tr>
                        )
                }
                </tbody>
            </table>
        </>
    )
}

export default ProductListFunc;