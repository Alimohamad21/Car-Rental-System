import axios from "axios";
import React, {useState} from "react";

function SignUp() {
    const [firstNameReg,setFirstName] = useState([]);
    const [lastNameReg,setLastName] = useState([]);
    const [emailReg,setEmail] = useState([]);
    const [passwordReg,setPassword] = useState([]);
    const [phoneNumberReg,setPhoneNumber] = useState([]);

    const register = () => {
        axios.post("http://localhost:3001/users" , {
            firstName:firstNameReg,
            lastName:lastNameReg,
            email:emailReg,
            password:passwordReg,
            phoneNumber:phoneNumberReg
        }).then((response)=>{
            console.log(response);
        })
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
                <input type='number' onChange={(event) => {
                    setPhoneNumber(event.target.value);
                }}
                />
                <button onClick={register} >Sign Up</button>
                <button onClick={goToLogin} >Log In Instead</button>
            </div>
        </div>
    );
}

export default SignUp;