"use client";

// Importamos React, useState y los iconos de Lucide
import React, { useState } from 'react';
import { User, Heart, Archive, ShoppingBag, Edit, Trash2 } from 'lucide-react';

// --- Interfaz de datos del usuario ---
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'Hombre' | 'Mujer' | string;
  dob: string;
}

// --- Tipo para las pestañas de navegación ---
type NavTab = 'perfil' | 'compras' | 'historial' | 'favoritos';

// --- Datos de ejemplo ---
const initialUser: UserData = {
  firstName: 'Usuario',
  lastName: 'Usuario',
  email: 'usuario@gmail.com',
  phone: '123456789',
  gender: 'Hombre',
  dob: '00/00/0000',
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function UserProfilePage() {
  
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState<NavTab>('perfil');
  
  // Estados para manejar la edición del perfil
  const [user, setUser] = useState<UserData>(initialUser);
  const [editedUser, setEditedUser] = useState<UserData>(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  // --- Manejadores de eventos del formulario ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({ ...prev, gender: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(editedUser); // Guarda los cambios
    setIsEditing(false); // Sale del modo edición
    console.log('Datos actualizados:', editedUser);
    // Aquí iría la llamada a la API para guardar en la base de datos
    alert('¡Datos actualizados!');
  };

  const handleCancelEdit = () => {
    setEditedUser(user); // Revierte los cambios
    setIsEditing(false); // Sale del modo edición
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Eliminando cuenta...');
      // Lógica para eliminar la cuenta
    }
  };

  return (
    // Fondo gris claro para toda la página
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Título principal */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Mi Perfil
        </h1>

        {/* Layout de Grid (Columna de Navegación + Columna de Contenido) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* --- Columna Izquierda (Navegación) --- */}
          <aside className="lg:col-span-1 space-y-6">
            
            {/* Tarjeta de Identidad */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-5xl font-bold mx-auto mb-4 border-4 border-white shadow-lg">
                {user.firstName[0]}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>

            {/* Tarjeta de Navegación */}
            <nav className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <ul className="space-y-1">
                <NavButton
                  label="Perfil"
                  icon={<User className="w-5 h-5" />}
                  isActive={activeTab === 'perfil'}
                  onClick={() => setActiveTab('perfil')}
                />
                <NavButton
                  label="Mis Compras"
                  icon={<ShoppingBag className="w-5 h-5" />}
                  isActive={activeTab === 'compras'}
                  onClick={() => setActiveTab('compras')}
                />
                <NavButton
                  label="Historial"
                  icon={<Archive className="w-5 h-5" />}
                  isActive={activeTab === 'historial'}
                  onClick={() => setActiveTab('historial')}
                />
                <NavButton
                  label="Favoritos"
                  icon={<Heart className="w-5 h-5" />}
                  isActive={activeTab === 'favoritos'}
                  onClick={() => setActiveTab('favoritos')}
                />
              </ul>
            </nav>
          </aside>

          {/* --- Columna Derecha (Contenido Dinámico) --- */}
          <main className="lg:col-span-3">
            {/* Renderizado condicional basado en la pestaña activa */}
            {activeTab === 'perfil' && (
              <ProfileForm
                user={user}
                editedUser={editedUser}
                isEditing={isEditing}
                onEditClick={() => setIsEditing(true)}
                onCancelClick={handleCancelEdit}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
                onRadioChange={handleRadioChange}
                onDeleteClick={handleDeleteAccount}
              />
            )}
            {activeTab === 'compras' && <PurchaseHistory />}
            {activeTab === 'historial' && <OrderHistory />}
            {activeTab === 'favoritos' && <FavoriteProducts />}
          </main>

        </div>
      </div>
    </div>
  );
}

// --- Componente de Botón de Navegación ---
function NavButton({ label, icon, isActive, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-3 rounded-lg text-left font-medium hover:bg-orange-50 hover:text-orange-700 transition-all duration-200
          ${isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700'}`}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </button>
    </li>
  );
}

// --- Componente del Formulario de Perfil ---
function ProfileForm({
  user, editedUser, isEditing, onEditClick, onCancelClick, 
  onSubmit, onInputChange, onRadioChange, onDeleteClick 
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      
      {/* Cabecera del formulario con botón de Editar */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Información de tu cuenta
        </h2>
        {!isEditing && (
          <button
            onClick={onEditClick}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </button>
        )}
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* Campo Nombre */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">Nombre(s)</label>
            <input 
              type="text" id="firstName" name="firstName"
              value={isEditing ? editedUser.firstName : user.firstName} 
              onChange={onInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-200 
                ${isEditing ? 'border-gray-300 bg-white' : 'border-transparent bg-gray-50 text-gray-800'}`}
            />
          </div>
          
          {/* Campo Apellidos */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">Apellidos</label>
            <input 
              type="text" id="lastName" name="lastName"
              value={isEditing ? editedUser.lastName : user.lastName} 
              onChange={onInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-200 
                ${isEditing ? 'border-gray-300 bg-white' : 'border-transparent bg-gray-50 text-gray-800'}`}
            />
          </div>

          {/* Campo Correo */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" id="email" name="email"
              value={isEditing ? editedUser.email : user.email} 
              onChange={onInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-200 
                ${isEditing ? 'border-gray-300 bg-white' : 'border-transparent bg-gray-50 text-gray-800'}`}
            />
          </div>

          {/* Campo Celular */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Celular</label>
            <input 
              type="tel" id="phone" name="phone"
              value={isEditing ? editedUser.phone : user.phone} 
              onChange={onInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-200 
                ${isEditing ? 'border-gray-300 bg-white' : 'border-transparent bg-gray-50 text-gray-800'}`}
            />
          </div>
          
          {/* Campo Género */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Género</label>
            <div className="mt-2 flex space-x-6">
              <label className="flex items-center">
                <input type="radio" name="gender" value="Hombre" 
                  checked={isEditing ? editedUser.gender === 'Hombre' : user.gender === 'Hombre'} 
                  onChange={onRadioChange}
                  disabled={!isEditing}
                  className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300" 
                />
                <span className="ml-2 text-gray-700">Hombre</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="Mujer" 
                  checked={isEditing ? editedUser.gender === 'Mujer' : user.gender === 'Mujer'}
                  onChange={onRadioChange}
                  disabled={!isEditing}
                  className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300" 
                />
                <span className="ml-2 text-gray-700">Mujer</span>
              </label>
            </div>
          </div>

          {/* Campo Fecha de Nacimiento */}
          <div>
            <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-1">Fecha de nacimiento</label>
            <input 
              type="text" id="dob" name="dob"
              placeholder="DD/MM/AAAA"
              value={isEditing ? editedUser.dob : user.dob} 
              onChange={onInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors duration-200 
                ${isEditing ? 'border-gray-300 bg-white' : 'border-transparent bg-gray-50 text-gray-800'}`}
            />
          </div>
        </div>

        {/* --- Botones de Acción (Visibles solo en modo edición) --- */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row justify-end items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200 mt-8">
            <button 
              type="button" 
              onClick={onCancelClick}
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </form>
      
      {/* Botón de Eliminar Cuenta (Visible fuera de modo edición) */}
      {!isEditing && (
        <div className="flex justify-start pt-8 border-t border-gray-200 mt-8">
          <button 
            type="button" 
            onClick={onDeleteClick}
            className="flex items-center text-red-600 hover:text-red-800 font-semibold text-sm transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar mi cuenta permanentemente
          </button>
        </div>
      )}
    </div>
  );
}

// --- Componente Placeholder para "Mis Compras" ---
function PurchaseHistory() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Mis Compras</h2>
      <p className="text-gray-600">
        Aquí aparecerán tus pedidos activos o en proceso. ¡Aún no tienes ninguno!
      </p>
      {/* Aquí podrías mapear una lista de pedidos activos */}
    </div>
  );
}

// --- Componente Placeholder para "Historial" ---
function OrderHistory() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Historial de Pedidos</h2>
      <p className="text-gray-600">
        Aquí aparecerá un registro de todos los pedidos que has completado.
      </p>
      {/* Aquí podrías mapear una lista de pedidos pasados */}
    </div>
  );
}

// --- Componente Placeholder para "Favoritos" ---
function FavoriteProducts() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Productos Favoritos</h2>
      <p className="text-gray-600">
        ¡Aún no has guardado ningún producto como favorito! Toca el corazón
        en un producto para agregarlo aquí.
      </p>
      {/* Aquí podrías mapear una cuadrícula de productos favoritos */}
    </div>
  );
}