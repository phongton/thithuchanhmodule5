import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as studentService from "../../service/ProductService";
import * as classService from "../../service/CategoryService";

function ProductCreate() {
    const [form, setForm] = useState({
        code: "",
        name: "",
        categories: "",
        quantity: 0,
        price : 0,
        description : "",
        date: new Date().toISOString().split('T')[0],
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getCategory();
    }, []);
    const getCategory = async () => {
        let res = await classService.getCategory()
        setCategories(res)
    }
    const objectValid = {
        code: Yup.string().required("Code cannot be blank")
            .matches(/^PROD-\d{4}$/, "The product code must be in the format PROD-XXXX, where XXXX is 4 digits"),
        name: Yup.string().required("Name cannot be blank")
                .min(3, "The name cannot be shorter than 3 characters"),
        quantity: Yup.number().required("Quantity cannot be left blank")
            .min(0, "The Quantity cannot be less than 0 "),
        price: Yup.number().required("Points cannot be left blank")
            .min(50000, "Point cannot be less than 50,000 VND"),
        categories: Yup.number().required("Category cannot be empty")
            .positive("Select a valid category")
            .integer("Select a valid category"),
        description: Yup.string().required("Description cannot be empty"),
        date: Yup.date().required("Registration date cannot be blank")
            .max(new Date(), "Registration date cannot be in the future"),
    }

    const saveProduct = async (value) => {
        value.price = +value.price;
        value.categories = +value.categories
        value.quantity = +value.quantity
        let isSuccess = await studentService.saveProduct(value)
        if (isSuccess) {
            toast.success("Added successfully")
            navigate("/product")
        } else {
            toast.error("Added failed")
        }
    }
    return (
        <>
            <h1 className="text-center mb-4" >Create Product</h1>
            <Formik initialValues={form} onSubmit={saveProduct} validationSchema={Yup.object(objectValid)}>
                <Form className="container">
                    <div className="mb-3">
                        <label className="form-label">Code </label>
                        <Field className="form-control" name="code"/>
                        <ErrorMessage className="error-message" name="code" component="p"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name </label>
                        <Field className="form-control" name="name"/>
                        <ErrorMessage className="error-message" name="name" component="p"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price </label>
                        <Field className="form-control" name="price"/>
                        <ErrorMessage className="error-message" name="price" component="p"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <Field as="select" className="form-control" name="categories">
                            <option value="">Category Selection</option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage className="error-message" name="categories" component="p"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity </label>
                        <Field className="form-control" name="quantity"/>
                        <ErrorMessage className="error-message" name="quantity" component="p"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Registration date</label>
                        <Field type="date" className="form-control" name="date"/>
                        <ErrorMessage className="error-message" name="date" component="p"></ErrorMessage>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description </label>
                        <Field as="textarea" className="form-control" name="description"/>
                        <ErrorMessage className="error-message" name="description" component="p"></ErrorMessage>
                    </div>
                    <div className="mb-3 text-center">
                        <button className="btn btn-primary w-50 mx-auto d-block custom-button" type="submit">Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default ProductCreate;