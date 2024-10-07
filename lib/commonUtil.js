import axios from "axios";

const getRandomName = async () => {
    const randomNameResponse = await axios.get(`${process.env.VITE_API_BASE_URL}/common/random`);
    return randomNameResponse.data;
};

export { getRandomName };