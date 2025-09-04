import axios from "axios";

const getEmployees = async () => {
    const response = await axios.get("api/list");
    return response;
};

export { getEmployees }