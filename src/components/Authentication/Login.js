import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
export default function Login(props) {
    const auth = getAuth()
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const dispatch = useDispatch()
    const HandleLogin = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password).then((userCred) => {
            console.log("loged in")
            SetEmail('')
            SetPassword('')
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
                            onChange={(event) => SetEmail(event.target.value)}
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
                            onChange={(event) => SetPassword(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={HandleLogin}>
                        Submit
                    </button>
                </form>

                <p className='card-text'>New here </p>
                <p className="btn btn-primary" onClick={props.HandleSetAuthType}>Signup</p>
            </div>
        </div>
    )
}
