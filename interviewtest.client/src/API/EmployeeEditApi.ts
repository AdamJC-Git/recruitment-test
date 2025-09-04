import axios from "axios";

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

export { editEmployee };