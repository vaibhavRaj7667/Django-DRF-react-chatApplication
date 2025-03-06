import axios from 'axios';

export const Refresh = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    try {
        let response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refresh_token
        });

        localStorage.setItem("access_token", response.data.access);

        console.log("bro",response.data.access)
        
    } catch (error) {
        console.log(error);
    }
};
