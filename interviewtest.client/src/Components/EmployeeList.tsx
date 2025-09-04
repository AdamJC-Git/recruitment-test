import { useEffect, useState } from "react";
import EmployeeModel from "../Model/EmployeeModel";
import Employee from "./Employee";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import { addEmployee } from "../API/EmployeeAddApi";
import { deleteEmployee } from "../API/EmployeeDeleteApi";
import { editEmployee } from "../API/EmployeeEditApi";
import { updateEmployee } from "../API/EmployeeUpdateApi";
import { modifyEmployeeValues } from "../API/ModifyEmployeeValuesApi";
import { getSumOfValues } from "../API/SumOfValuesApi";

function EmployeeList() {

    interface Props {
        employee: EmployeeModel
    };

    const minSumOfValues: number = 11171;
    const [sumValuesMessage, setSumValuesMessage] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [userForEdit, setUserForEdit] = useState<EmployeeModel>();
    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        fetch("api/list")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEmployees(data);
            })
    }, []);

    const RefreshEmployeesList = () => {
        fetch("api/list")
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data);
            })
    }

    const handleAddEmployee = async (props: Props) => {
        //console.log(props);
        await addEmployee(props);
        await RefreshEmployeesList();
    };

    const handleDeleteEmployee = async (name: string) => {
        await deleteEmployee(name);
        await RefreshEmployeesList();
    };

    const handleEditEmployee = async (name: string) => {
        const employeeForEdit = await editEmployee(name);
        const res: EmployeeModel = { name: employeeForEdit.name, value: employeeForEdit.value }
        setUserForEdit(res);
        setIsUpdating(true);
    };

    const handleUpdateEmployee = async (props: Props) => {
        await updateEmployee(props);
        await RefreshEmployeesList();
        setIsUpdating(false);
    };

    const ModifyValuesinDb = async () => {
        const res: EmployeeModel[] = await modifyEmployeeValues();
        //console.log(res);
        setEmployees(res);
    };

    const GetSumOfValues = async () => {
        const sumOfValues: number = await getSumOfValues();
        console.log("Sum: " + sumOfValues);
        const t = sumOfValues >= minSumOfValues ?
            setSumValuesMessage("Sum of Values for Employees with names beginning with 'A,B,C is: " + sumOfValues) :
            setSumValuesMessage("Sum of values is less than " + minSumOfValues);              
    }

    return (
        <div>       
            <div className="h2 text-center p-2 text-primary">Employee Application</div>
            {isUpdating ? <EditEmployee employee={userForEdit}
                updateEmployee={handleUpdateEmployee} /> :
                <AddEmployee handleAddEmployee={handleAddEmployee} />}

            <br />
           <div className="row">
              <div className="col-12 col-md-8 py-2"
                      style={{ borderRadius: "10px", backgroundColor: "#323637" }}>
                  <div className="text-center text-white-50 pb-2">Employees</div>
         
                  <div className="container row">
                      {employees.map((employee, index) => (
                          <Employee employee={employee} key={index}
                              deleteEmployee={handleDeleteEmployee}
                              editEmployee={handleEditEmployee} />                       
                      ))}
                  </div>
                </div>
                <div className="col-12 col-md-4 col-md-offset-8 p-2" style={{ borderRadius: "20px", border: "1px solid #555" }}>
                    <button className="btn btn-success m-1 form-control"
                        onClick={() => ModifyValuesinDb()}>Increment Values</button>
                    <br />
                    <button className="btn btn-success m-1 form-control"
                        onClick={() => GetSumOfValues()}>Sum Values</button>
                    <br />
                    <div className="text-warning">{sumValuesMessage}</div>
                </div>
            </div>
       </div> 
  );
}

export default EmployeeList;