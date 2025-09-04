import axios from "axios";

const deleteEmployee = async (name: string) => {
    await axios({
        method: 'delete',
        url: 'api/list',
        params: {
            name: name
        }
    });
}

export { deleteEmployee };