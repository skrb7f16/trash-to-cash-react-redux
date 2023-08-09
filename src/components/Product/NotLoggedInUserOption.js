import React from 'react'
import { Link } from 'react-router-dom'
export default function NotLoggedInUserOption() {
  return (
    <Link className="btn btn-success" to="/auth">Please Loging to Buy</Link>
  )
}
