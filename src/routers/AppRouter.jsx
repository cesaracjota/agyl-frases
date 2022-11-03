import React from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from '../components/layout/Dashboard';
import AboutContent from '../pages/admin/about/index';
import CategoriasPage from '../pages/admin/categorias';
import FrasesPage from '../pages/admin/frases';
import HomeContent from '../pages/admin/home';
import SettingsPage from '../pages/admin/settings';
import UsuariosPage from '../pages/admin/usuarios';
import LoginPage from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inicio" element={<HomeContent />} />
                <Route path="/acerca-de" element={<AboutContent />} />
                <Route path="/frases" element={<FrasesPage />} />
                <Route path='/categorias' element={<CategoriasPage />} />
                <Route path='/usuarios/usuarios' element={<UsuariosPage />} />
                <Route path='/settings' element={<SettingsPage />} />
            </Route>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}