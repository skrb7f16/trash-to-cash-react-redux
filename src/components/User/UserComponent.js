import { getAuth } from 'firebase/auth'
import React from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { Link, useNavigate } from 'react-router-dom'
export default function UserComponent() {
  const user = useSelector(state=>state.UserReducer)
  const auth=getAuth()
  const navigate=useNavigate()
  const HandleLogout=()=>{
    auth.signOut().then(()=>{
      
      navigate("/")
    })
  }
  return (
    <div>
      <>
  <div className="jumbotron">
    <div className="container">
      <h1 className="display-3">Hello, {user.displayName}</h1>
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
  <div className="container">
    {/* Example row of columns */}
    <div className="row">
      <div className="col-md-4">
        <h2>Heading</h2>
        <p>
          Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
          tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
          massa justo sit amet risus. Etiam porta sem malesuada magna mollis
          euismod. Donec sed odio dui.{" "}
        </p>
        <p>
          <a className="btn btn-secondary" href="#" role="button">
            View details »
          </a>
        </p>
      </div>
      <div className="col-md-4">
        <h2>Heading</h2>
        <p>
          Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
          tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum
          massa justo sit amet risus. Etiam porta sem malesuada magna mollis
          euismod. Donec sed odio dui.{" "}
        </p>
        <p>
          <a className="btn btn-secondary" href="#" role="button">
            View details »
          </a>
        </p>
      </div>
      <div className="col-md-4">
        <h2>Heading</h2>
        <p>
          Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas
          eget quam. Vestibulum id ligula porta felis euismod semper. Fusce
          dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
          fermentum massa justo sit amet risus.
        </p>
        <p>
          <a className="btn btn-secondary" href="#" role="button">
            View details »
          </a>
        </p>
      </div>
    </div>
    <hr />
  </div>
</>

    </div>
  )
}
