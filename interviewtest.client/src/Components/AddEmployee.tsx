import EmployeeModel from "../Model/EmployeeModel";
//import Employee from "./Employee";
import { useState } from "react";
interface Props {
    employee: EmployeeModel
}
function AddEmployee(props) {
    const [newEmployeeName, setNewEmployeeName] = useState("");
    const [newEmployeeValue, setNewEmployeeValue] = useState("");

    const handleAddEmployeeFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        //const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
        //const value = (e.currentTarget.elements.namedItem('newValue') as HTMLInputElement).value;                     
        const name = newEmployeeName;
        const value = newEmployeeValue; 

        //create a new object of type EmployeeModel and assign name and value before passing it to EmployeeList
        const empModel: EmployeeModel = { name: name, value: parseInt(value) };

        console.log("name: " + empModel.name + ", value: " + empModel.value);

        setNewEmployeeName("");
        setNewEmployeeValue("");

        return props.handleAddEmployee(empModel);    
    }

    //create useState values for name and value to send back to list page???/

    return (
        <div className="col-12 text-white p-1" style={{ borderRadius: "20px", border: "1px solid #555" }}>
            <form onSubmit={handleAddEmployeeFormSubmit}>
                <div className="row p-2">
                    <div className="col-12 h6">Add Employee</div>
                    <div className="col-12 col-md-4 p-2">
                        <input className="form-control form-control-sm" placeholder="Name..." name="name"
                            value={newEmployeeName} onChange={(e) => setNewEmployeeName(e.target.value)}></input>
                    </div>
                    <div className="col-12 col-md-4 p-2">
                        <input className="form-control form-control-sm" placeholder="Value..." name="newValue"
                            value={newEmployeeValue} onChange={(e) => setNewEmployeeValue(e.target.value)}></input>
                    </div>                                 

                    <div className="col-12 col-md-4 p-2">
                        <button className="btn btn-primary btn-sm form-control">Create</button>
                    </div>
                </div>
            </form>
            <br/>
        </div>
  );
}

export default AddEmployee;