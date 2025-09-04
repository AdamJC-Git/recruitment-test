import axios from "axios";

const updateEmployee = async (props) => {
    await axios({
        method: 'put',
        url: 'api/list',
        params: {
            name: props.name,
            value: props.value
        }
    });

    console.log("Employee updated.");
};

export { updateEmployee };