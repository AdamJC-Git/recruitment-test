
function Employee(props) {

    const deleteEmployeeFromDb = async (name: string) => {       
        return props.deleteEmployee(name);
    }

    const editEmployeeFromDb = async (name: string) => {
        return props.editEmployee(name);
    }

    return (
        <div className="col-md-12 col-12"> 
            <div className="row p-md-1" style={{ borderRadius: "20px", border: "1px solid #555" }}>
                       
                <div className="col-6 col-md-3">{props.employee.name}</div>
                <div className="col-6 col-md-5">{props.employee.value}</div>                
          
                <div className="col-12 col-md-2 pt-md-3">
                    <button className="btn btn-primary btn-sm m-1">
                        <i className="bi bi-pencil-square"
                            onClick={() => editEmployeeFromDb(props.employee.name)}
                            style={{ fontSize: "1rem" }}></i>
                    </button>
                    <button className="btn btn-danger btn-sm m-1">
                        <i className="bi bi-trash-fill"
                            onClick={() => deleteEmployeeFromDb(props.employee.name)}
                            style={{ fontSize: "1rem" }}></i>
                    </button>
                </div>
            </div>
        </div>
  );
}

export default Employee;