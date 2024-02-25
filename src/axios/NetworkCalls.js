import axiosInstance from ".";
import axios from "axios";

export const CarbonCalculationAPI = async (endpoint, params) => {
  const encodedParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    encodedParams.set(key, value);
  });

  const options = {
    method: "POST",
    url: endpoint,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx",
      "X-RapidAPI-Key": "1f3b8d5dacmsh6bf602285891b53p14f25bjsn72378f96b84f",
      "X-RapidAPI-Host": "carbonsutra1.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const GetAllData = async (endpoint) => {
  try {
    const { data } = await axiosInstance.get(endpoint);
    // console.log("data: ", data);
    if (data?.status) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: "No data found" };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data.message || "An error occurred",
    };
  }
};

export const GetSingleData = async (endpoint) => {
  try {
    const { data } = await axiosInstance.get(endpoint);
    if (data?.data) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: "No data found" };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data.message || "An error occurred",
    };
  }
};

export const DeleteSingleData = async (endpoint) => {
  try {
    const { data } = await axiosInstance.delete(endpoint);

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const PostData = async (endpoint, body) => {
  console.log("Body: ", body);
  try {
    const response = await axiosInstance.post(endpoint, body);
    console.log("Response: ", response)
    // return data;
  } catch (error) {
    return error.message;
  }
};

export const EditData = async (endpoint, body) => {
  try {
    const { data } = await axiosInstance.put(endpoint, body);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
