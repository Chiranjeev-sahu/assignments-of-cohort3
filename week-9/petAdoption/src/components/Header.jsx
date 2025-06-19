import React from 'react'
import "./header.css"
const Header = ({message}) => {
  return (
    <div className='app-header'>{message}</div>
  )
}

export default Header