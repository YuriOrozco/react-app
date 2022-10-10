import axios from 'axios';
//Se crea una variable que contenga el link de donde se van a obtener los usuarios
const baseURL ="http://localhost:3001/users";
//Se crea una variable asincrona que regresa el link completo para obtener el usuario y el password
export const getUserByUsernameAndPassword=
async(username, password) => {
    const response=await axios.get(baseURL+ `?username=${username}&password=${password}`);
    return response.data;
}
