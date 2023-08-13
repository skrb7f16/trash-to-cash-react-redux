import React from 'react'
import ShowAuthType from './ShowAuthType'
import google from '../../assets/google.png'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import {set,getDatabase, ref} from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import firebaseApp from '../../firebase-service'
import { useDispatch } from 'react-redux'
import SetCurrentUser from '../../state/actionCreaters/UserAuthData'
import ShowMessage from '../../state/actionCreaters/ShowMessage'
export default function Authentication() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const db=getDatabase(firebaseApp,firebaseApp.options.databaseURL)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const HandleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user=result.user
                set(ref(db,"/Users/"+user.uid),{
                    userId:user.uid,
                    userName:user.displayName,
                    rooms:[],
                    totalCredits:0
                }).then(()=>{
                    dispatch(SetCurrentUser(user))
                    dispatch(ShowMessage({"message":"Logged in success as "+user.displayName,"type":'success'},'show'))
                    navigate("/user/"+user.displayName)
                })
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className='container' style={{ width: '50vw', marginTop: '3rem', marginBottom: '2rem', minHeight: '80vh' }}>

            <div className="card border-dark">
                <div className="card-header">
                    <h1>
                        Connect with us

                    </h1>
                </div>
                <div>
                    <ShowAuthType />
                </div>
                <div className='card-footer' 
                onClick={HandleGoogleSignin}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor:'pointer' }}>
                    <img src={google} alt="..." style={{ width: '40px' }} />
                    <h2 className='text-center' >
                        Continue with google
                    </h2>
                </div>

            </div>
        </div>
    )
}
