import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const [firstNameReg, setFirstName] = useState([]);
    const [lastNameReg, setLastName] = useState([]);
    const [emailReg, setEmail] = useState([]);
    const [passwordReg, setPassword] = useState([]);
    const [phoneNumberReg, setPhoneNumber] = useState([]);
    const [nationalIdReg,setNationalId]= useState([]);
    const [usernameReg,setUsername]= useState([]);
    let [error, setError] = useState([]);
    const navigate = useNavigate();

    const register = async () => {
        if (firstNameReg == '' || lastNameReg == '' || emailReg == '' || passwordReg == '' || phoneNumberReg == '' || nationalIdReg=='' || usernameReg=='') {
            setError('Please enter all required fields')
        } else {
            await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstNameReg,
                    lastName: lastNameReg,
                    email: emailReg,
                    password: passwordReg,
                    phoneNumber: phoneNumberReg,
                    username:usernameReg,
                    nationalId:nationalIdReg
                }),
            }).then(res => {
                if (res.ok) {
                    console.log()
                    return res.json();
                } else
                    throw Error(res.status);
            }).then(result => {
                const status = result.data;
                console.log(`status is ${result.data}`)
                if (status === 'success')
                    navigate('/');
                else {
                    setError(status);
                    console.log(error);
                }
            }).catch(e => {
                console.log('ERROR 1: ', e);
            })
        }
    };
    const goToLogin = () => {

    };

    return (
        <div className="App">
            <div className="registration">
                <h1>Sign Up</h1>
                <label>First Name</label>
                <input type='text' onChange={(event) => {
                    setFirstName(event.target.value);
                }}
                />
                <label>Last Name</label>
                <input type='text' onChange={(event) => {
                    setLastName(event.target.value);
                }}
                />
                <label>Email</label>
                <input type='text' onChange={(event) => {
                    setEmail(event.target.value);
                }}
                />
                <label>Password</label>
                <input type='text' onChange={(event) => {
                    setPassword(event.target.value);
                }}
                />
                <label>Phone Number</label>
                <input type='text' onChange={(event) => {
                    setPhoneNumber(event.target.value);
                }}
                />
                <label>National Id</label>
                <input type='text' onChange={(event) => {
                    setNationalId(event.target.value);
                }}
                />
                <label>Username</label>
                <input type='text' onChange={(event) => {
                    setUsername(event.target.value);
                }}
                />
                <button onClick={register}>Sign Up</button>
                <button onClick={goToLogin}>Log In Instead</button>
            </div>
            <div>{error}</div>
        </div>
    );
}

export default SignUp;
