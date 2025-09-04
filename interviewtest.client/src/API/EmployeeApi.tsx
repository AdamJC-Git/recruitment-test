import axios from "axios";

//get employees list
const getEmployees = async () => {
    const response = await axios.get("api/list");
    return response;
};

//add employee
const addEmployee = async (props) => {
    console.log(props);
    await axios({
        method: 'post',
        url: 'api/list',
        params: {
            name: props.name,
            value: props.value
        }
    });
};

//edit employee
const editEmployee = async (name: string) => {
    const res = await axios({
        method: 'get',
        url: 'api/list/' + name,
        params: {
            employeeName: name,
        },
    });
    return res.data;
}

//update employee
const updateEmployee = async (props) => {
    await axios({
        method: 'put',
        url: 'api/list',
        params: {
            name: props.name,
            value: props.value
        }
    });
};

//delete employee
const deleteEmployee = async (name: string) => {
    await axios({
        method: 'delete',
        url: 'api/list',
        params: {
            name: name
        }
    });
}

export { getEmployees, addEmployee, editEmployee, updateEmployee, deleteEmployee }