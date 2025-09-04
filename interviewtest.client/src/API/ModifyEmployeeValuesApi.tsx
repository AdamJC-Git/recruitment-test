import axios from "axios";
import EmployeeModel from "../Model/EmployeeModel";

const modifyEmployeeValues = async () => {
    const res: EmployeeModel[] = await axios({
        method: 'get',
        url: 'api/list/ModifyEmployeeValues',
    });

    console.log(res.data);
    return res.data;
};

export { modifyEmployeeValues };