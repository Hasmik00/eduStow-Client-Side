import Axios from 'axios';

const getToken = ({
    email,
    password,
    name,
}) => {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();

            params.append('email', email);
            params.append('password', password);
            if(name) {
                params.append('name', name);
            }
        
        Axios.post(
            `${process.env.REACT_APP_SERVER_URL}/user/${name?'signup':'login'}`,
           params,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        )
            .then(({ data }) => {
                
                resolve(data);
            })
            .catch((error) => {
                console.log(error, 'err')
                if (error.response) {
                    return reject(error.response.data.error);
                } else if (error.request) {
                    return reject(error.message || 'No connection');
                } else {
                    return reject('An error occurred');
                }
            });
    });
};

export default getToken;