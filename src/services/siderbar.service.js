import { FaClipboardCheck, FaQuoteRight, FaUsers } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { RiHome5Fill } from "react-icons/ri";

export const sidebarService = [
    {
        titulo: 'Inicio',
        icono : RiHome5Fill,
        submenu: false,
        path: '/inicio'
    },
    {
        titulo: 'Categorias',
        icono : FaClipboardCheck,
        submenu: false,
        path : '/categorias'
    },
    {
        titulo: 'Frases',
        icono : FaQuoteRight,
        submenu: false,
        path : '/frases'
    },
    {
        titulo: 'Usuarios',
        icono : FaUsers,
        path : '/usuarios'
    },
    {
        titulo: 'Configuraciones',
        icono : MdSettings,
        path : '/settings'
    }
]