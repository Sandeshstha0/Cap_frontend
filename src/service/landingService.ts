import axios from "axios";


export const getPost = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/public");
    return response.data;
  };
  