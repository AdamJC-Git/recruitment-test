import EmployeeModel from "../Model/EmployeeModel";
import { useState } from "react";
interface Props {
    employee: EmployeeModel
}
function EditEmployee(props) {
    const [newEmployeeName, setNewEmployeeName] = useState(props.employee.name);
    const [newEmployeeValue, setNewEmployeeValue] = useState(props.employee.value);

    console.log(props);
    const handleEditEmployeeFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                    
        const name = newEmployeeName;
        const value = newEmployeeValue;

        //create a new object of type EmployeeModel and assign name and value before passing it to EmployeeList
        const empModel: EmployeeModel = { name: name, value: parseInt(value) };

        console.log(empModel);

        setNewEmployeeName("");
        setNewEmployeeValue("");

        return props.updateEmployee(empModel);
    }

    //create useState values for name and value to send back to list page???/

    return (
        <div className="col-12 text-white p-1" style={{ borderRadius: "20px", border: "1px solid #555" }}>
            <form onSubmit={handleEditEmployeeFormSubmit}>
                <div className="row p-2">
                    <div className="col-12 h6">Edit Employee</div>
                    <div className="col-12 col-md-4 p-2">
                        <input className="form-control form-control-sm" placeholder="Name..." name="name"
                            value={newEmployeeName} onChange={(e) => setNewEmployeeName(e.target.value)}
                            readOnly></input>
                    </div>
                    <div className="col-12 col-md-4 p-1">
                        <input className="form-control form-control-sm" placeholder="Value..." name="newValue"
                            value={newEmployeeValue} onChange={(e) => setNewEmployeeValue(e.target.value)}></input>
                    </div>

                    <div className="col-12 col-md-4 p-1">
                        <button className="btn btn-primary btn-sm form-control">Update</button>
                    </div>
                </div>
            </form>
            <br />
        </div>
    );
}

export default EditEmployee;