import React from 'react'

function Profile() {
  return (
    <div className='container mt-5'>
      <h1>Profile</h1>
      <div className="content container" style={{ marginLeft: "280px",marginRight:"200px", bottom: "0" }}>
        <h2>Responsive Sidebar Example</h2>
        <p>This example uses media queries to transform the sidebar into a top navigation bar on smaller screens.</p>
        <p>We've also added styling to stack and center the navigation links on very small screens.</p>
        <h3>Resize the browser window to see the effect.</h3>
        <p>Additional content here...</p>
      </div>
    </div>
  )
}

export default Profile
