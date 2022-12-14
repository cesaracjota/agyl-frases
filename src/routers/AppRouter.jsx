import React from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from '../components/layout/Dashboard';
import AboutContent from '../pages/admin/about/index';
import CategoriasPage from '../pages/admin/categorias';
import FrasesPage from '../pages/admin/frases';
import HomeContent from '../pages/admin/home';
import SettingsPage from '../pages/admin/settings';
import PersonasPage from '../pages/admin/personas';
import LoginPage from '../pages/auth/Login';
import NotFoundPage from '../pages/404/NotFoundPage';
import RegisterPage from '../pages/auth/Register';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<PrivateRoutes />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/inicio" element={<HomeContent />} />
                <Route path="/acerca-de" element={<AboutContent />} />
                <Route path="/frases" element={<FrasesPage />} />
                <Route path='/categorias' element={<CategoriasPage />} />
                <Route path='/usuarios' element={<PersonasPage />} />
                <Route path='/settings' element={<SettingsPage />} />
            </Route>
            <Route element={<PublicRoute />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            {/* <Navigate to="/login" /> */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}