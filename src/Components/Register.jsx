import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../Stylesheets/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IsValidEmail } from '../Utilities/HelperFunctions';

const Register = () => {
    const [clientInputs, updateClientInputs] = useState({
        "Name": "",
        "Email": "",
        "Password": ""
    });
    const domain = useSelector((state) => state.domain.value);
    const [errorMessage, updateErrorMessage] = useState("");
    const navigate = useNavigate();

    // input handling
    const updateName = (e) => {
        updateClientInputs({...clientInputs, "Name": e.target.value})
    }

    const updateEmail = (e) => {
        updateClientInputs({...clientInputs, "Email": e.target.value})
    }

    const updatePassword = (e) => {
        updateClientInputs({...clientInputs, "Password": e.target.value})
    }

    // on register submit
    const onSubmitStop = (e) => {
        if(!IsValidEmail(clientInputs.Email)) {
            updateErrorMessage("Please make sure all fields are answered and valid.");
            return;
        }

        axios.post(`https://${domain}/api/User`, clientInputs)
        .then(function(res) {
            console.log(res);
            updateErrorMessage("Account created successfully!");
            navigate("/login");
        })
        .catch(function(error) {
            console.log(error);
            updateErrorMessage("Please make sure all fields are answered and valid.");
            if(error.response && error.response.status === 422) updateErrorMessage("Email already in use");
        });
    }

    return(
        <div className="registration-form-container">
            <form className="registration-form">
                <strong>Registration Form</strong><br/><br/>
                <label htmlFor="name">
                    Name<br/>
                    <input type="text" name="name" id="name" onChange={updateName} /><br/>
                </label>
                <br/>
                <label htmlFor="email">
                    Email<br/>
                    <input type="text" name="email" id="email" onChange={updateEmail} /><br/>
                </label>
                <br/>
                <label htmlFor="password">
                    Password<br/>
                    <input type="password" name="password" id="password" onChange={updatePassword} /><br/>
                </label>
                <button type="button" name="submit" onClick={onSubmitStop}>Submit</button>

                {errorMessage !== "" && (
                <>
                    <br/><br/>
                    <div className="error-message-registration">
                        {errorMessage}
                    </div>
                </>
                )}
            </form>
        </div>
    )
}

export default Register;