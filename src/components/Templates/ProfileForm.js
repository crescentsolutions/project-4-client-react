import React from 'react'
import { Link } from 'react-router-dom'

const ProfileForm = ({ profile, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Company Name</label>
    <input
      placeholder="Company Name"
      value={profile.companyName}
      name="companyName"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ProfileForm
