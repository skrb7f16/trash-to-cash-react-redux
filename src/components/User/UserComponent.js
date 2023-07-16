import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SetCurrentUser from '../../state/actionCreaters/UserAuthData'
import SetNavBar from '../../state/actionCreaters/NavBarSelectAction'
import SingleItem from '../Items/SingleItem'
import { getDatabase, ref, onValue } from 'firebase/database'
import firebaseApp from '../../firebase-service'


export default function UserComponent() {
  const user = useSelector(state => state.UserReducer)
  const auth = getAuth()
  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const HandleLogout = () => {
    auth.signOut().then(() => {
      dispatch(SetCurrentUser(auth.currentUser))
      dispatch(SetNavBar("home"))
      navigate("/")
    })
  }
  useEffect(() => {
    const starCountRef = ref(db, '/feeds');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data!==null){
        setItems([])
        Object.values(data).map(items=>{
          if(items.byId===auth.currentUser.uid)
          setItems(old=>[...old,items])
        });
        
      } 
    });

  },[])
  return db === null ? "LOADING" : <div>
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Hello, {user !== null ? user.displayName : "User"}</h1>
          <p>
            This is a template for a simple marketing or informational website. It
            includes a large callout called a jumbotron and three supporting pieces
            of content. Use it as a starting point to create something more unique.
          </p>
          <p>
            <Link className="btn btn-primary btn-lg" to="/addAProduct" role="button">
              Post
            </Link>
            <span className="btn btn-danger btn-lg" role="button" onClick={HandleLogout}>
              Logout
            </span>
          </p>
        </div>
      </div>
      <div className="container" style={ItemBoxStyle}>


        <hr />
        {items.length!==0 ? items.map((v, k) => {
          return <SingleItem item={v} key={k} />
        }) : <h2>No products yet added</h2>}
      </div>
    </>

  </div>
}

const ItemBoxStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  margin: '10px',
  overflowY:'overflow-y',
  width:'100vw',
 
}