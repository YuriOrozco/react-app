import { render } from '@testing-library/react';
//Importamos useState para poder tener variables de estado
import { useState } from 'react';
//importamos el estilo
import './styles.css';
//importamos el servicio para poder obtener los usuarios y contraseñas
import {getUserByUsernameAndPassword} from '../../services/users'

//exportamos la función, la cual va a contener el login
export default function LoginForm() {
    //creamos las variables para establecerles el estaado inicial
    const [username, setUsername] = useState(""); //Necesita un valor inicial
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);
    const[errors,setErrors] = useState(false);
    
    //funcion para establecerle al boton de login    
    const handleSubmit = () => {
          setErrors(false);
        //Si no existe ningun error, imprimimos en consola el id del usuario y el username del mismo
        if(isValidateUsername() && isValidatePassword()){
            getUserByUsernameAndPassword(username,password).then(response =>{
                if(response && response[0]){
                    console.log(response);
                    response.forEach(user=>console.log(user.id, user.username));
                }
                else{
                    //sino cambiamos el estado del error a true
                    setErrors(true);
                }
            }
            )
        }

    }
    //funcion para errores
    function renderErrors(){
        //Si existe el error de usuario y password incorrectos, lo imprime en un parrafo
        return errors ? <p className='error'>User name or password are incorrect!!</p>
        :
        null;
    }
    //Funcion para validar el usuario
    function isValidateUsername() {
        //Se crea un arreglo en el cual se pondran el tipo de errores
        let errors = []
        //Si en el input no hay nada
        if (username === undefined || username === "") {
            //se le agrega el dato al arreglo
            errors.push("Username field required")
        }
        //Mandamos el arreglo
        setUsernameError(errors);
        return isEmpty(errors);
    }
    //Funcion que valida el password
    function isValidatePassword() {
        //Creamos un arreglo en el cual se pondran el tipo de errores
        let errors = []
        //Si el input esta vacio
        if (password === undefined || password === "") {
            //Se le agrega el dato al arreglo
            errors.push("Password field is required")
        }
        //Mandamos el arreglo
        setPasswordError(errors);
        //regresa el arreglo a la funcion isEmp
        return isEmpty(errors);
    }
    //función que obtiene el valor del input "user"
    function handleChange(e) {
        setUsername(e.target.value);

    }
    //funcion que retorna el valor del arreglo cuando es vacio
const isEmpty = (array) =>{
    return array.length===0;
}

    //Funcion para listar los errores que recibe 
    //el campo donde se esta originando el error
    const renderListErrors = (field) => {
        //Usamos un switch
        switch (field) {
            //En caso de que el usuario no exista o el campo este vacio
            case 'username':
                return usernameError
                    && usernameError.length !== 0 ?
                    usernameError.map((error, index) =>
                        <p key={index} className="error">{error}</p>)
                    :
                    null;
            //En caso de que el password no sea correcto o el campo este vacio
            case 'password':
                return usernameError
                    && passwordError.length !== 0 ?
                    passwordError.map((error, index) =>
                        <p key={index} className="error">{error}</p>)
                    :
                    null;
            default:
                return null
        }
    }

    //retorna el formulario
    return (
        <div>
            <header>
                <h1>System Login</h1>
            </header>
            {            
            errors ?
            renderErrors():
            null
            }
            <div className='mb-3 row text-center'>
                <label htmlFor="username" className='col-sm- col-form-label'>Username: </label>

                <div className="col-sm-">
                    <input value={username} onChange={handleChange} className="form-control text-center"
                        id="username"></input>
                    {
                        usernameError.length !== 0 ?
                            renderListErrors('username') : null
                    }
                </div>
            </div>
            <div className="mb-3 row text-center">
                <label htmlFor="password" className="col-md- col-form-label">Password: </label>
                <div className="col-sm- ">
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                        className="form-control text-center"
                        id="password" type={'password'}></input>
                    {
                        passwordError.length !== 0 ?
                            renderListErrors('password') : null
                    }

                </div>
            </div>

         
            <div className="col text-center">

                <button onClick={handleSubmit} className="button">Login</button>
                </div>	

        </div>
    );
}