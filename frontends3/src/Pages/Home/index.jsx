import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">¡Bienvenido a nuestro proyecto!</h1>
        <p className="text-lg">
          Aquí puedes encontrar una explicación detallada de lo que estamos desarrollando.
        </p>
        <NavLink
          to="/clientes"
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Ver clientes
        </NavLink>
      </div>
    </div>
  )
}

export default Home