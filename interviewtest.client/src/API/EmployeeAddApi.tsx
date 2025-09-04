import axios from "axios";

const addEmployee = async(props) => {
    console.log(props);
    await axios({
        method: 'post',
        url: 'api/list',
        params: {
            name: props.name,
            value: props.value
        }
    });
    console.log("Employee added.");
};

export { addEmployee };