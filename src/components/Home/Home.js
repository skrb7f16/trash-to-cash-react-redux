import React from 'react'
import { Link } from 'react-router-dom'
import homepage from '../../assets/homepage.jpg'
import { getAuth } from 'firebase/auth'
export default function Home() {
  
  return (
    <>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={homepage} className="d-block w-100" alt="..." style={{ height: '90vh', opacity:'60%' }} />
          </div>

        </div>
        <div className='carousel-caption'>
        <Link type="submit" className="btn border-dark" to={'/items'} style={{'position':'relative',top:'-3vh'}}>
          <h1>
          Get Started
            </h1>
        </Link>
      </div>
      </div>
      

    </>
  )
}
