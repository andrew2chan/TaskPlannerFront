import React, { useState } from 'react';
import '../Stylesheets/Login.css';
import axios from 'axios';

const Login = () => {
    let [clientInputs, updateClientInputs] = useState({
        "Email": "",
        "Password": ""
    });
    const [errorMessage, updateErrorMessage] = useState("");

    const updateEmail = (e) => {
        updateClientInputs({ ...clientInputs, Email: e.target.value});
    }

    const updatePassword = (e) => {
        updateClientInputs({ ...clientInputs, Password: e.target.value});
    }

    const onSubmitStop = (e) => {
        let reg = /^[A-Z0-9+_.-]+@[A-Z0-9-]+[.][A-Z]+$/ig;
        let validEmail = reg.test(clientInputs.Email);

        if(!validEmail) {
            updateErrorMessage("Please make sure all fields are answered and valid.");
            return;
        }

        axios.post("https://localhost:7108/api/User/getUserByEmail", clientInputs)
        .then(function(response) {
            console.log(response);
            updateErrorMessage("Login successful!");
        })
        .catch(function(error) {
            console.log(error);
            updateErrorMessage("The credentials you entered do not belong to anyone.");
        })
    }

    return(
        <div className="login-form-container">
            <form className="login-form">
                <strong>Login Form</strong><br/><br/>
                <label htmlFor="email">
                    Email<br/>
                    <input type="text" name="email" id="email" onChange={updateEmail} /><br/>
                </label>
                <br/>
                <label htmlFor="password">
                    Password<br/>
                    <input type="text" name="password" id="password" onChange={updatePassword} /><br/>
                </label>
                <button type="button" name="submit" onClick={onSubmitStop}>Submit</button>

                {errorMessage != "" && (
                <>
                    <br/><br/>
                    <div className="error-message">
                        {errorMessage}
                    </div>
                </>
                )}
            </form>
        </div>
    )
}

export default Login;