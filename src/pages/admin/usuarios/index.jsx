import React from 'react'
import Usuarios from '../../../components/admin/usuarios/Usuarios'
import Dashboard from '../../../components/layout/Dashboard';

const UsuariosPage = () => {
    return ( <Dashboard componente={<Usuarios />} /> )
}

export default UsuariosPage