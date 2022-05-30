import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
        <h4>LandingPage</h4>
        <button>
            <NavLink exact to="/home" >BRING THE DOGGIES!!!
            </NavLink>
        </button>
        
    </div>
  )
}
