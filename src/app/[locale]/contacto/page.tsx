'use client'; // Necesario para usar hooks como useState y manejar eventos del formulario

import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react'; 

// Definimos el color naranja de Gabunni para reutilizarlo
const GABUNNI_ORANGE = '#dc730b'; // Naranja brillante
// URL de imagen de fondo para la cabecera (Se utiliza la ruta local en la carpeta public/images)
const HERO_BACKGROUND_IMAGE = '/images/saludable.jpg'; // <-- RUTA LOCAL ACTUALIZADA


export default function ContactoPage() {
  const [formData, setFormData] = useState({ 
    nombre: '', 
    apellido: '',  
    mensaje: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    // Simulación de envío a una API
    setTimeout(() => {
        console.log('Formulario enviado:', formData);
        setMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        setFormData({ nombre: '', apellido: '', email: '', mensaje: '' }); 
        setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 🖼️ Cabecera de Contacto con Logo y Título */}
      <div 
        className="py-20 text-center text-white relative overflow-hidden shadow-2xl bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_BACKGROUND_IMAGE}')` }} // <-- Ahora usa la imagen local
      >
        {/* Capa oscura (overlay) para asegurar que el texto se lea bien */}
        <div className="absolute inset-0 bg-gray-900 opacity-80"></div> 
        
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold tracking-tight mb-4">
            Contacto
          </h1>
          <p className="text-xl text-gray-300">
            Estamos listos para responder tus preguntas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* 📐 Estructura Principal: Grid de 1/3 (Info) y 2/3 (Formulario) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: Información y Contactos (2/5) */}
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 border-l-4 pl-4" style={{ borderColor: GABUNNI_ORANGE }}>
              Información de Gabunni
            </h2>
            <p className="text-gray-600 text-lg">
              Si prefieres no usar el formulario, puedes encontrarnos a través de los siguientes canales:
            </p>

            {/* Tarjetas de Contacto con Estilo de Resalte */}
            {[
              { icon: Phone, title: 'Llámanos', detail: '+52 55 1234 5678', link: 'tel:+525512345678' },
              { icon: Mail, title: 'Escríbenos', detail: 'contacto@gabunni.com', link: 'mailto:contacto@gabunni.com' },
              { icon: MapPin, title: 'Visítanos', detail: 'Ciudad de México, México', link: '#' },
            ].map((item, index) => (
              <a 
                key={index} 
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                <item.icon className="h-8 w-8 mr-4" style={{ color: GABUNNI_ORANGE }} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500">{item.detail}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Columna Derecha: Formulario de Contacto (3/5) */}
          <div className="lg:col-span-2 bg-white p-10 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Enviar un Mensaje
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Campo Nombre */}
                <InputField 
                    id="nombre" 
                    name="nombre" 
                    label="Nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    placeholder="Tu nombre" 
                />
                
                {/* Campo Apellido */}
                <InputField 
                    id="apellido" 
                    name="apellido" 
                    label="Apellido" 
                    value={formData.apellido} 
                    onChange={handleChange} 
                    placeholder="Tu apellido" 
                />
                
                
              </div>

              {/* Campo Mensaje */}
              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">Tu mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Escribe tu pregunta o mensaje"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: GABUNNI_ORANGE }}
                  required
                ></textarea>
              </div>

              {/* Botón Enviar */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-3 rounded-lg text-lg font-bold transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                style={{ backgroundColor: GABUNNI_ORANGE, hoverBackgroundColor: '#e8841a' }}
              >
                {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Enviar Mensaje'}
              </button>

              {/* Mensaje de Estado */}
              {message && (
                <p className={`mt-4 p-3 rounded-lg text-center ${message.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      
      {/* Estilo para el fondo de patrón (solo CSS, no se usa Tailwind directamente para el patrón) */}
      <style jsx global>{`
        .bg-pattern {
            background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0);
            background-size: 20px 20px;
        }
        button[type="submit"]:hover:not(:disabled) {
            background-color: #e8841a !important;
        }
        textarea:focus, input:focus {
            border-color: ${GABUNNI_ORANGE} !important;
            box-shadow: 0 0 0 3px rgba(220, 115, 11, 0.5) !important;
        }
      `}</style>
    </div>
  );
}

// Componente auxiliar para un input más limpio
interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, name, label, value, onChange, placeholder, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            required
        />
    </div>
);