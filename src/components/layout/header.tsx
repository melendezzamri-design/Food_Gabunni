"use client";

import { ShoppingBag, User } from "lucide-react"; 

const Button = ({ children, onClick, className, style, variant, size, disabled, "aria-label": ariaLabel }) => (
    <button 
        onClick={onClick} 
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${className} ${variant === 'ghost' ? 'bg-transparent' : ''}`}
        style={style}
        disabled={disabled}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);
import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // ⭐️ CAMBIO 1: Inicializar el estado en 'true' por defecto.
  // Esto asegura que el servidor y el cliente rendericen lo mismo al inicio.
  const [isOnline, setIsOnline] = useState(true);

  // Lógica para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]); 

  // ⭐️ CAMBIO 2: useEffect para detectar el modo offline/online
  useEffect(() => {
    
    // Primero, actualizamos al estado real del navegador
    // Esto se ejecuta DESPUÉS del renderizado inicial, evitando el error de hidratación
    setIsOnline(navigator.onLine);

    // Función para actualizar el estado cuando vuelve la conexión
    const handleOnline = () => {
      console.log("Conexión restaurada (online)");
      setIsOnline(true);
    };

    // Función para actualizar el estado cuando se pierde la conexión
    const handleOffline = () => {
      console.log("Conexión perdida (offline)");
      setIsOnline(false);
    };

    // Añadir los "escuchadores" de eventos
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Función de limpieza
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  const headerClasses = `
    sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
    ${scrolled 
      ? 'bg-[#333333] shadow-xl' 
      : 'bg-transparent'
    }
  `;
  
  const textPrimaryColor = scrolled ? 'text-white' : 'text-gray-800'; 

  const t = (key) => {
    switch(key) {
      case "siteName": return "Gabunni";
      default: return key; 
    }
  };

  const GABUNNI_ORANGE = '#dc730b';
  
  const navLinks = [
    { href: "#menu", displayLabel: "MENÚ" },
    { href: "/contacto", displayLabel: "Contactos" }, 
    { href: "/nosotros", displayLabel: "Nosotros" }, 
  ];
  
  const LOGO_SRC = "/images/Gabus.png"; 

  const handleCartClick = () => {
    console.log("Abriendo el carrito de compras...");
  };
  
  const handleLogin = () => {
    console.log("Redirigiendo a Iniciar Sesión...");
  };
  const handleRegister = () => {
    console.log("Redirigiendo a Registro...");
  };

  return (
    <header className={headerClasses}>
      
      {/* Banner de Modo Offline (Ahora no causará error) */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-center p-2 font-semibold text-sm">
          Estás en modo offline. Revisa tu conexión a internet.
        </div>
      )}

      <div className="container mx-auto px-4">
        
        <div className="flex h-24 items-center justify-between"> 
          
          {/* LOGO */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-1"> 
              <div className="flex items-center">
                <div className="flex items-center bg-transparent"> 
                  <img
                    src={LOGO_SRC} 
                    alt={t("siteName")} 
                    width={120} 
                    height={120} 
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            </a>
          </div>
          
          {/* Navegación y Acciones */}
          <div className="flex items-center space-x-6">
            
            {/* Navegación */}
            <nav className={`flex items-center space-x-6 text-lg font-semibold transition-colors duration-300 ${textPrimaryColor}`}>
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="hover:opacity-80 transition-opacity" 
                >
                  {link.displayLabel}
                </a>
              ))}
            </nav>
            
            {/* Botones */}
            <div className="flex items-center space-x-3"> 
              
              {/* 🛒 Botón de Carrito */}
              <Button 
                variant="ghost" 
                onClick={handleCartClick}
                aria-label="Ver Carrito"
                style={{ color: GABUNNI_ORANGE }} 
                className="hover:bg-gray-700 p-2" 
              >
                <ShoppingBag className="h-6 w-6" />
              </Button>
              
              {/* Lógica condicional */}
              {isLoggedIn ? (
                // --- SI EL USUARIO INICIÓ SESIÓN ---
                <a 
                  href="/usuario"
                  className={`flex items-center border-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 
                    ${scrolled ? 'text-white' : 'text-gray-800'}`}
                  style={{ borderColor: GABUNNI_ORANGE }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Mi Perfil
                </a>
                
              ) : (
                
                // --- SI EL USUARIO NO HA INICIÓ SESIÓN ---
                <>
                  <Button 
                    variant="outline" 
                    onClick={handleLogin}
                    className="border border-gray-400 bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                  >
                    Inicia Sesión
                  </Button>

                  <Button 
                    variant="default" 
                    onClick={handleRegister}
                    className="hidden sm:inline-flex text-white font-bold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: GABUNNI_ORANGE }}
                  >
                    Registrate
                  </Button>
                </>
              )}
              
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Franja Inferior Naranja --- */}
      <div className="w-full h-2" style={{ backgroundColor: GABUNNI_ORANGE }}></div>
    </header>
  );
}