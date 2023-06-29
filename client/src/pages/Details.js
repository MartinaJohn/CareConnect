import React from 'react'

const Details = () => {
  const auth = localStorage.getItem('users')
  const profileData=JSON.parse(auth)
  console.log(profileData)
  return (
    <div>Details</div>
  )
}

export default Details