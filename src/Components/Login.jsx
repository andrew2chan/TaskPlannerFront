import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateId, updateUserEmail, updateName, updatePlannedTasksId } from '../Slices/userSlice';
import '../Stylesheets/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let [clientInputs, updateClientInputs] = useState({
        "Email": "",
        "Password": ""
    });
    const domain = useSelector((state) => state.domain.value);
    const [errorMessage, updateErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateEmail = (e) => {
        updateClientInputs({ ...clientInputs, Email: e.target.value});
    }

    const updatePassword = (e) => {
        updateClientInputs({ ...clientInputs, Password: e.target.value});
    }

    const onSubmitStop = (e) => {
        let reg = /^[A-Z0-9+_.-]+@[A-Z0-9-]+[.][A-Z]+$/ig;
        let validEmail = reg.test(clientInputs.Email);

        if(!validEmail) { //test to make sure that it fits a valid email format
            updateErrorMessage("Please make sure all fields are answered and valid.");
            return;
        }

        axios.post(`https://${domain}/api/User/getUserByEmail`, clientInputs)
        .then(function(response) {
            console.log(response);

            const { id, email, name, plannedTasksId } = response.data;

            /* dispatch to update store with all the new vars we need for a user */
            dispatch(updateId(id)); 
            dispatch(updateUserEmail(email));
            dispatch(updateName(name));
            dispatch(updatePlannedTasksId(plannedTasksId));

            updateErrorMessage("Login successful!");
            navigate('/usercalendar'); //redirect to the calendar
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