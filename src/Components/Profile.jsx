import React, { useState, useEffect } from 'react';
import '../Stylesheets/Profile.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateId, updateUserEmail, updatePlannedTasksId, updateName, updateToken } from '../Slices/userSlice';
import { IsValidEmail } from '../Utilities/HelperFunctions';

const Profile = () => {
    const dataFromSelector = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [clientInputs, updateClientInputs] = useState({
        "Name": "",
        "Email": "",
        "Password": ""
    });

    useEffect(() => {
        updateClientInputs({
            "Name": dataFromSelector.name,
            "Email": dataFromSelector.email,
            "Password": ""
        })
    }, [dataFromSelector])

    const domain = useSelector((state) => state.domain.value);
    const [errorMessage, updateErrorMessage] = useState("");

    // input handling
    const updateInputName = (e) => {
        updateClientInputs({...clientInputs, "Name": e.target.value})
    }

    const updateEmail = (e) => {
        updateClientInputs({...clientInputs, "Email": e.target.value})
    }

    const updatePassword = (e) => {
        updateClientInputs({...clientInputs, "Password": e.target.value})
    }

    // on update button click
    const onSubmitStop = (e) => {
        e.preventDefault();

        if(!IsValidEmail(clientInputs.Email)) {
            updateErrorMessage("Please make sure all fields are answered and valid.");
            return;
        }

        let config = {
            headers: { Authorization: `Bearer ${dataFromSelector.token}` }
        }

        let clientInputsObj = {
            "Name": clientInputs.Name,
            "Email": clientInputs.Email,
            "Password": clientInputs.Password
        }

        axios.put(`https://${domain}/api/User/${dataFromSelector.id}`, clientInputsObj, config)
        .then(function(response) {
            updateErrorMessage("Records have been updated!");

            let { Name, Email } = clientInputs;

            dispatch(updateName(Name));
            dispatch(updateUserEmail(Email));
        })
        .catch(function(err) {
            console.log(err);
            console.log(clientInputs);
            updateErrorMessage("There was an error updating your records. Please check your inputs again.");
        })
    }

    // reset the state of the redux
    const resetReduxState = () => {
        dispatch(updateId(-1));
        dispatch(updateUserEmail(""));
        dispatch(updateName(""));
        dispatch(updatePlannedTasksId(-1));
        dispatch(updateToken(""))
    }

    // delete the account based on id
    const deleteAccount = (e) => {
        let config = {
            headers: { Authorization: `Bearer ${dataFromSelector.token}` }
        }

        axios.delete(`https://${domain}/api/User/${dataFromSelector.id}`, config)
        .then(function(response) {
            updateErrorMessage("Account has been deleted");
            localStorage.clear();
            resetReduxState();
        })
        .catch(function(err) {
            console.log(err);
            updateErrorMessage("There was an error deleting your account. Please try again later.")
        })
    }

    return (
        <div className="profile-form-container">
            <form className="profile-form">
                <strong>Profile</strong><br/><br/>
                <label htmlFor="name">
                    Name<br/>
                    <input type="text" name="name" id="name" onChange={updateInputName} value={clientInputs.Name} /><br/>
                </label>
                <br/>
                <label htmlFor="email">
                    Email<br/>
                    <input type="text" name="email" id="email" onChange={updateEmail} value={clientInputs.Email} /><br/>
                </label>
                <br/>
                <label htmlFor="password">
                    Password<br/>
                    <input type="password" name="password" id="password" onChange={updatePassword} /><br/>
                </label>
                <button name="submit" onClick={onSubmitStop}>Update</button>
                <Link to="/" className="redirect-buttons" onClick={deleteAccount}>Delete Account</Link>

                {errorMessage !== "" && (
                <>
                    <br/><br/>
                    <div className="error-message-profile">
                        {errorMessage}
                    </div>
                </>
                )}
            </form>
        </div>
    )
}

export default Profile;