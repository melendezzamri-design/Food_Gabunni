import React, { useState } from 'react';

// --- Interfaz de datos del usuario ---
// Usamos una interfaz para asegurar que los datos del usuario 
// tengan el tipado correcto en TypeScript.
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'Hombre' | 'Mujer' | string; // Permite 'Hombre', 'Mujer' u 'Otro'
  dob: string; // Fecha de nacimiento (string por simplicidad)
}

// --- Componente de Perfil ---
const UserProfile: React.FC = () => {
  // Datos de ejemplo del usuario. 
  // En una aplicación real, esto vendría de una API o un estado global.
  const [user, setUser] = useState<UserData>({
    firstName: 'Usuario',
    lastName: 'Usuario',
    email: 'usuario@gmail.com',
    phone: '123456789',
    gender: 'Hombre',
    dob: '00/00/0000',
  });

  // --- Manejadores de eventos (Ejemplos) ---
  // Esta función manejaría la lógica de envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos actualizados:', user);
    // Aquí iría la lógica para enviar los datos a un backend
    alert('¡Datos actualizados!');
  };

  // Esta función manejaría la eliminación de la cuenta
  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Eliminando cuenta...');
      // Lógica de eliminación
    }
  };

  return (
    // Fondo gris claro para toda la página, con padding
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Título principal de la página */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Mi perfil
        </h1>

        {/* Layout de Grid: 
          - 1 columna en móviles (grid-cols-1)
          - 3 columnas en pantallas grandes (lg:grid-cols-3)
          - Con un espacio (gap) de 6 unidades
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* --- Columna Izquierda (Identidad y Navegación) --- */}
          {/* Ocupa 1 de las 3 columnas en pantallas grandes (lg:col-span-1) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Tarjeta de Identidad del Usuario */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              {/* Icono de usuario (Avatar) */}
              <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-5xl font-bold mx-auto mb-4">
                U
              </div>
              <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            {/* Tarjeta de Navegación del Perfil */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <nav className="space-y-2">
                {/* NOTA: Idealmente, estos <a> serían componentes <Link> 
                  de 'react-router-dom' 
                */}
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-md font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                >
                  {/* Aquí iría un ícono (ej. de Heroicons) */}
                  <span className="w-6 h-6">{/* 📦 */}</span>
                  <span>Pedidos</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-md font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                >
                  <span className="w-6 h-6">{/* 📜 */}</span>
                  <span>Historial</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-md font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                >
                  <span className="w-6 h-6">{/* 💳 */}</span>
                  <span>Info gasto</span>
                </a>
              </nav>
            </div>
          </div>

          {/* --- Columna Derecha (Formulario de Información) --- */}
          {/* Ocupa 2 de las 3 columnas en pantallas grandes (lg:col-span-2) */}
          <div className="lg:col-span-2">
            
            {/* Tarjeta del Formulario */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Información de tu cuenta
              </h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Grid para los campos del formulario */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Nombre(s) */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre(s)</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      defaultValue={user.firstName} 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                    />
                  </div>
                  
                  {/* Apellidos */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellidos</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      defaultValue={user.lastName} 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                    />
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input 
                      type="email" 
                      id="email" 
                      defaultValue={user.email} 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                    />
                  </div>

                  {/* Celular */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Celular</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      defaultValue={user.phone} 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                    />
                  </div>
                  
                  {/* Género */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Género</label>
                    <div className="mt-2 flex space-x-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="Hombre" 
                          defaultChecked={user.gender === 'Hombre'} 
                          className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300" 
                        />
                        <span className="ml-2 text-gray-700">Hombre</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="Mujer" 
                          defaultChecked={user.gender === 'Mujer'} 
                          className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300" 
                        />
                        <span className="ml-2 text-gray-700">Mujer</span>
                      </label>
                    </div>
                  </div>

                  {/* Fecha de nacimiento */}
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                    <input 
                      type="text" 
                      id="dob" 
                      placeholder="DD/MM/AAAA"
                      defaultValue={user.dob} 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                    />
                  </div>
                </div>

                {/* --- Botones de Acción --- */}
                <div className="flex flex-col sm:flex-row justify-end items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={handleDeleteAccount}
                    className="w-full sm:w-auto text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    Eliminar mi cuenta
                  </button>
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto px-6 py-2 bg-orange-600 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                  >
                    Actualizar datos
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;