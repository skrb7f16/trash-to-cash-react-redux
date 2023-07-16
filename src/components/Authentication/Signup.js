import React, { useState } from 'react'
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {getDatabase, ref, set} from 'firebase/database'
import firebaseApp from '../../firebase-service'
export default function Signup(props) {
    const auth = getAuth()
    const [email,SetEmail]=useState("")
    const [password,SetPassword]=useState("")
    const [confirmPassword,SetConfirmPassword]=useState("")
    const [lastName,setLastName]=useState("")
    const [firstName,SetFirstName]=useState("")
    const db=getDatabase(firebaseApp,firebaseApp.options.databaseURL)
    const HandleSignup=(event)=>{
        event.preventDefault()
        createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            var user=userCredential.user
            updateProfile(user,{
                displayName:firstName+" "+lastName
            }).then(()=>{
                set(ref(db,"/Users/"+user.uid),{
                    userId:user.uid,
                    userName:user.displayName,
                    rooms:[],
                    totalCredits:0
                }).then(()=>{
                    SetEmail('')
                    SetPassword('')
                    SetConfirmPassword('')
                    SetFirstName('')
                    setLastName('')
                })
                
                
            })
        })
    }
    return (
        <div>
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(event)=>SetEmail(event.target.value)}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(event)=>SetPassword(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword2"
                            value={confirmPassword}
                            onChange={(event)=>SetConfirmPassword(event.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='firstName' className='form-label'>
                            First Name
                        </label>
                        <input
                            className='form-control'
                            id='firstName'
                            value={firstName}
                            onChange={e=>SetFirstName(e.target.value)}
                            />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='lastName' className='form-label'>
                            Last Name
                        </label>
                        <input
                            className='form-control'
                            id='lastName'
                            value={lastName}
                            onChange={e=>setLastName(e.target.value)}
                            />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={HandleSignup}>
                        Submit
                    </button>
                </form>

                <p className='card-text'>Already here</p>
                <p className="btn btn-primary" onClick={props.HandleSetAuthType}>Login</p>
            </div>
        </div>
    )
}
