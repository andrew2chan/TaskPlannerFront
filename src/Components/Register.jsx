import React, { useState } from 'react';
import '../Stylesheets/Register.css';

const Register = () => {
    const [clientInputs, updateClientInputs] = useState({
        "Name": "",
        "Email": "",
        "Password": ""
    });
    const [errorMessage, updateErrorMessage] = useState("");

    const updateName = (e) => {
        updateClientInputs({...clientInputs, "Name": e.target.value})
    }

    const updateEmail = (e) => {
        updateClientInputs({...clientInputs, "Email": e.target.value})
    }

    const updatePassword = (e) => {
        updateClientInputs({...clientInputs, "Password": e.target.value})
    }

    const onSubmitStop = (e) => {
        let reg = /^.+@.+[.].+$/ig;
        let validEmail = reg.test(clientInputs.Email);

        validEmail ? updateErrorMessage("") : updateErrorMessage("Please enter a valid email.");
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

export default Register;