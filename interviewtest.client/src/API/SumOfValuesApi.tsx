import axios from "axios";

const getSumOfValues = async () => {
    const sumOfValues = await axios({
        method: 'get',
        url: 'api/list/SumOfValues',
    });

    console.log(sumOfValues.data);
    return sumOfValues.data;
};

export { getSumOfValues };