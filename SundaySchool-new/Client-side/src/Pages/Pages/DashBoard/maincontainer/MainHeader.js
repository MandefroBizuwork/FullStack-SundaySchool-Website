import React from 'react'
// import "./MainHeader.css"
import { Link } from 'react-router-dom'
function MainHeader({pagetype}) {
  return (
 
      <div className="pagetitle" style={{marginBottom: "10px"}}>
    
      <nav>
        <ol className="breadcrumb">
          <li style={{fontSize:'20px'}} className="breadcrumb-item mx-1"><Link to="/">ወደ መነሻ ገጽ</Link></li>
          <li style={{fontSize:'20px'}}>/</li>
          <li style={{fontSize:'20px'}} className="breadcrumb-item active px-2">{pagetype}</li>
        </ol>
      </nav>
      <h1><hr style={{height:"3px"}}/></h1>
    </div>
    
  )
}

export default MainHeader
