import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';


const Clientes = () => {

    const [clientes, setClientes ] = useState([]);
    const [showPassword, setShowPassword] = useState([]);

    useEffect(()=>{
        const fetchClientes = async() =>{
            try {
                const api = 'COLOCA-TU-API';
                const local = 'http://localhost:3000/dev/users/'
                const response = await fetch(api);
                const data = await response.json();
                console.log(data?.users);
                setClientes(data?.users)
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchClientes();
    }, [])

    const handlePassVisibility = (index) =>{
        const updatedShowPassword = [...showPassword];
        updatedShowPassword[index] = !updatedShowPassword[index];
        setShowPassword(updatedShowPassword);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Lista de clientes</h1>
                {/* Aquí puedes mostrar la lista de clientes */}
                {clientes.length > 0 ? (
                    <table className="table-auto border-collapse w-full">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">N°</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Password</th>
                                <th className="border px-4 py-2">Rol</th>
                                <th className="border px-4 py-2">Avatar</th>
                            </tr>
                        </thead>
                    <tbody>
                      {clientes.map((cliente, index) => (
                        <tr key={cliente.pk}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{cliente.email}</td>
                            <td className="border px-4 py-2">
                                <span className="flex items-center">
                                    {showPassword[index] ? (
                                        <span>{cliente.password}</span>
                                    ) : (
                                        <span>{'*'.repeat(11)}</span>
                                    )}
                                <button
                                    onClick={() => handlePassVisibility(index)}
                                    className="ml-2 bg-transparent border-none outline-none focus:outline-none"
                                >
                                    {showPassword[index] ? (
                                        <HiEyeOff className="w-5 h-auto text-gray-500" />
                                    ) : (
                                        <HiEye className="w-5 h-auto text-gray-500" />
                                    )}
                                </button>
                                </span>
                            </td>
                            <td className="border px-4 py-2">{cliente.role}</td>
                            <td className="border px-4 py-2">
                                <img src={cliente.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ):(
                    <p>No hay clientes</p>
                )}
            
            <NavLink
                to="/"
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                Regresa a Home
            </NavLink>
            </div>
        </div>
  )
}

export default Clientes