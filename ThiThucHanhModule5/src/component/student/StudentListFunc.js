import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import * as studentService from "../../service/StudentService"
import {Link} from "react-router-dom";
import * as classService from "../../service/ClassService";

function StudentListFunc() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [initialStudents, setInitialStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [top,setTop] = useState("");

    useEffect(() => {
        getAllStudents()
        getClass()
    }, [name, startDate, endDate,top])
    const getAllStudents = async () => {
        let data = await studentService.getAllStudents(name, startDate, endDate,top);
        setStudents(data);
        if (initialStudents.length === 0) {
            setInitialStudents(data);
        }
    }


    const handleDelete = (id) => {
        let isSuccess = studentService.deleteStudent(id)
        if (isSuccess) {
            setStudents(students.filter(student => student.id !== id))
            toast.success("Deleted successfully")
        } else {
            toast.error("Deleted failed")
        }
    };
    const getClass = async () => {
        let res = await classService.getClass()
        setClasses(res)

    }
    const getClassName = (id) => {
        const className = classes.find(cls => cls.id === id);
        return className ? className.name : "unknown";
    }

    function handleRefresh() {
        setStudents(initialStudents);
        setName('');
        setStartDate('');
        setEndDate('');

    }
    return (
        <>
            <div className="d-flex mb-3">
                <input className="form-control form-control-sm mb-3 mt-3 ms-5 w-25"
                       placeholder="Search by name"
                       value={name} onChange={(e) => setName(e.target.value)}/>
                <select className="form-select form-select-sm mb-3 mt-3 ms-5 w-25" onChange={(e)=>setTop(e.target.value)}
                        value={top}>
                    <option value="">Top Students</option>
                    <option value="1">Top 1</option>
                    <option value="3">Top 3</option>
                    <option value="5">Top 5</option>
                    <option value="10">Top 10</option>
                </select>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control form-control-sm mb-3 mt-3 ms-5 w-25"
                    placeholder="Ngày bắt đầu"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control form-control-sm mb-3 mt-3 ms-5 w-25"
                    placeholder="Ngày kết thúc"
                />
                <button type="button" onClick={handleRefresh}
                        className="form-control-sm mb-3 mt-3 ms-5 btn btn-success"><span
                    className="material-symbols-outlined">refresh</span></button>

            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Class</th>
                    <th>Point</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    students
                        .map((item, index) =>
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{getClassName(item.class)}</td>
                                <td>{item.point}</td>
                                <td>{item.date}</td>
                                <td>
                                    <Link to={`/edit/${item.id}`} type="button" className="btn btn-primary"><span
                                        className="material-symbols-outlined">edit</span></Link>
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal"
                                            data-bs-target={`#deleteModal${item.id}`}
                                            onClick={() => setSelectedStudent(item)}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                    {selectedStudent && selectedStudent.id === item.id && (
                                        <div className="modal fade show" id={`deleteModal${item.id}`} tabIndex="-1"
                                             aria-labelledby="deleteModalLabel"
                                             style={{display: 'block'}} aria-hidden="false">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="deleteModalLabel">Are you sure
                                                            you want to delete a student named {item.name}?</h5>
                                                        <button type="button" className="btn-close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                                onClick={() => setSelectedStudent(null)}></button>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary"
                                                                data-bs-dismiss="modal"
                                                                onClick={() => setSelectedStudent(null)}>Close
                                                        </button>
                                                        <button type="button" className="btn btn-danger"
                                                                onClick={() => handleDelete(item.id)}>Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )
                }
                </tbody>
            </table>
        </>
    )
}

export default StudentListFunc;