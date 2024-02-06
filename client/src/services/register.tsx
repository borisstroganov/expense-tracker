import axios from 'axios';
import constants from '../static/static.json'
import { RegisterResponse, ServerError } from "../../../common/types";

export const register = async (email: string, name: string, password: string): Promise<RegisterResponse | ServerError> => {
    const response = await axios({
        method: 'post',
        url: constants.URL + "/register",
        data: {
            email: email,
            name: name,
            password: password
        }
    })
        .then(r => r.data as RegisterResponse)
        .catch((error) => {
            if (error.response) {
                return error.response.data as ServerError;
            } else if (error.request) {
                return { message: "No response" };
            }
            console.log('Error', error.message);
            return { message: error.message }
        });

    return response;
}