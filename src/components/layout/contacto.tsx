import React, { useState } from 'react';
// En una aplicación de React real, aquí importarías los iconos
// Por ejemplo: import { FaShoppingCart, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// Para el ejemplo, usaremos nombres de clase de Font Awesome.

const ContactoPage: React.FC = () => {
const [formData, setFormData] = useState({
    nombre: 'Jane',
    apellido: 'Smitherton',
    email: 'correoelectronico@dominiooficialdejane.net',
    mensaje: '',
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Lógica para enviar el formulario aquí
};

return (
    <>
    <style>
        {`
          /* --- Estilos CSS (Incorporados para conveniencia) --- */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            background-color: #31313e; /* Fondo oscuro del body */
        }

          /* --- Navbar --- */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 50px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .logo {
            display: flex;
            align-items: center;
            font-size: 1.2em;
            color: #ff8c00;
            font-weight: bold;
        }
        .logo img {
            width: 40px; 
            height: 40px; 
            margin-right: 10px;
        }
        .nav-links {
            list-style: none;
            display: flex;
            gap: 20px;
            margin: 0;
            padding: 0;
        }
        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
        }
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .nav-actions i {
            font-size: 1.5em;
            color: #ff8c00;
        }
        .btn-sesion {
            background: none;
            border: none;
            padding: 8px 15px;
            cursor: pointer;
            color: #333;
        }
        .btn-registro {
            background-color: #ff8c00;
            color: white;
            border: none;
            padding: 8px 15px;
            cursor: pointer;
            border-radius: 3px;
        }

          /* --- Hero (Sección Contacto con Imagen de Fondo) --- */
        .hero-contacto {
            background-image: url('data:image/png;base64,...'); /* Sustituir por la URL de la imagen de fondo */
            background-size: cover;
            background-position: center;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            margin-bottom: 50px; /* Espacio para el efecto flotante */
        }
        .hero-contacto h1 {
            font-size: 3em;
            font-weight: normal;
        }

          /* --- Contenido Principal de Contacto (Grid de 2 columnas) --- */
        .contenido-contacto {
            display: grid;
            grid-template-columns: 1fr 1fr; /* Estructura principal de 2 columnas */
            gap: 40px;
            max-width: 1000px;
            margin: -100px auto 50px auto; /* Efecto flotante sobre la imagen */
            padding: 20px;
        }

          /* --- Contenedor del Formulario --- */
        .contact-form-container {
            background-color: white;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .contact-form-container h3 {
            font-size: 1.5em;
            font-weight: normal;
            margin-bottom: 20px;
        }
        .form-group-inline {
            display: flex;
            gap: 20px;
          }
          .input-group {
            margin-bottom: 15px;
            flex-grow: 1;
            width: 100%;
          }
          .input-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
          }
          .contact-form input,
          .contact-form textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            box-sizing: border-box; 
            background-color: white;
            color: #333;
          }
          .contact-form textarea {
            resize: vertical;
          }
          .btn-enviar {
            background-color: black;
            color: white;
            padding: 12px 25px;
            border: none;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: bold;
            width: 100%;
            margin-top: 10px;
          }

          /* --- Contenedor de Información de Contacto --- */
          .contact-info-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .info-box {
            background-color: #f0f0f0; 
            padding: 30px;
            text-align: center;
            flex-grow: 1;
          }
          .info-box i {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 10px;
          }
          .info-box h4 {
            margin: 0;
            font-size: 1.2em;
            font-weight: bold;
            color: #333;
          }
          .info-box p {
            margin: 5px 0 0 0;
            color: #666;
          }

          /* --- Footer --- */
          footer {
            background-color: #31313e;
            color: #ccc;
            padding: 40px 50px;
            width: 100%;
            box-sizing: border-box;
          }
          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          footer h4 {
            font-size: 1.2em;
            margin-bottom: 15px;
            width: 100%; /* Ocupa todo el ancho en la parte superior */
            color: #fff;
          }
          .footer-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 50px;
            width: 60%; 
          }
          .footer-links div {
            line-height: 1.8;
          }
          .footer-links div span {
            font-weight: bold;
            color: #fff;
          }
          .footer-links a {
            display: block;
            color: #ccc;
            text-decoration: none;
          }
          .social-icons {
            margin-top: 20px;
            width: 100%;
          }
          .social-icons a {
            color: #ccc;
            font-size: 1.5em;
            margin-right: 15px;
            text-decoration: none;
          }

          /* --- Responsive --- */
          @media (max-width: 768px) {
            .navbar {
              flex-direction: column;
            }
            .nav-links {
              margin: 10px 0;
            }
            .contenido-contacto {
              grid-template-columns: 1fr;
              margin-top: 0; 
            }
            .form-group-inline {
              flex-direction: column;
            }
            .footer-links {
              grid-template-columns: 1fr;
              width: 100%;
            }
          }
        `}
      </style>

      <header>
        <nav className="navbar">
          <div className="logo">
            {/*  */}
            <img src="logo-gabunni.png" alt="Gabunni" />
            <span>Gabunni & Comida Rápida Saludable</span>
          </div>
          <ul className="nav-links">
            <li><a href="#">MENÚ</a></li>
            <li><a href="#">Contactos</a></li>
            <li><a href="#">Nosotros</a></li>
          </ul>
          <div className="nav-actions">
            <i className="fa-solid fa-shopping-cart"></i>
            <button className="btn-sesion">Inicia Sesión</button>
            <button className="btn-registro">Regístrate</button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-contacto">
          <h1>Contacto</h1>
        </section>

        <section className="contenido-contacto">
          <div className="contact-form-container">
            <h3>Contactarme</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group-inline">
                <div className="input-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            
              <div className="input-group">
                <label htmlFor="mensaje">Tu mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  placeholder="Escribe tu pregunta o mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn-enviar">
                Enviar
              </button>
            </form>
          </div>

          <div className="contact-info-container">
            <div className="info-box">
              <i className="fa-solid fa-phone-alt"></i>
              <h4>Número de teléfono</h4>
              <p>Teléfono</p>
            </div>
            
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
        <h4>Nombre del sitio</h4>
          
        <div className="footer-links">
            <div>
            <span>Tema</span>
            <a href="#">Página</a>
            <a href="#">Página</a>
            <a href="#">Página</a>
            </div>
            <div>
            <span>Tema</span>
            <a href="#">Página</a>
            <a href="#">Página</a>
            <a href="#">Página</a>
            </div>
            <div>
              <span>Tema</span>
              <a href="#">Página</a>
              <a href="#">Página</a>
              <a href="#">Página</a>
            </div>
          </div>

          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactoPage;