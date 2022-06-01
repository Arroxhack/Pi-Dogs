import React from 'react'
import SearchBar from './SearchBar'
import Breeds from './Breeds'
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <button>
        <NavLink exact to="/home/createDog">Crear perro</NavLink>
      </button>
      <SearchBar/>
      <Breeds/>
    </div>
  )
}

