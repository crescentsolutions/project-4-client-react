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
    <label>First Name</label>
    <input
      placeholder="First Name"
      value={profile.firstName}
      name="firstName"
      onChange={handleChange}
    />
    <label>Last Name</label>
    <input
      placeholder="Last Name"
      value={profile.lastName}
      name="lastName"
      onChange={handleChange}
    />
    <label>Telephone</label>
    <input
      placeholder="Telephone"
      value={profile.telephone}
      name="telephone"
      onChange={handleChange}
    />
    <label>Web Host</label>
    <input
      placeholder="Web Host"
      value={profile.webHost}
      name="webHost"
      onChange={handleChange}
    />
    <label>Domain Name</label>
    <input
      placeholder="Domain Name"
      value={profile.domainName}
      name="domainName"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ProfileForm
