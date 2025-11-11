"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image"; 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactSection() {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: t("address"),
      text: t("addressText"),
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: t("phone"),
      text: t("phoneText"),
      href: "tel:555-123-4567",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: t("hours"),
      text: t("hoursText"),
    },
  ];

  return (
    // 🔑 CAMBIO CLAVE 1: Eliminamos el padding superior (pt-0)
    <div id="contact" className="container mx-auto px-4 pt-0 pb-16"> 
      
      {/* Título y Subtítulo de la Sección de Contacto (Visítanos) */}
      {/* 🔑 CAMBIO CLAVE 2: Reducimos el margen inferior (mb-4) y quitamos el margen superior (mt-0) 
          Esto acerca el título al elemento anterior (el botón "Menú"). */}
      <div className="text-center mt-0 mb-4">
        <h2 className="text-4xl font-bold font-headline">{t("title")}</h2>
        <p className="text-muted-foreground mt-2 text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* 1. SECCIÓN DE CONTACTO Y MAPA (Estructura Original) */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
        {/* Columna Izquierda: Información de Contacto */}
        <div className="space-y-6">
          {contactInfo.map((info) => (
            <div key={info.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">{info.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{info.title}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.text}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Columna Derecha: Mapa */}
        <Card className="overflow-hidden shadow-lg h-80 md:h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.088890289768!2d-84.07842777174624!3d9.929849509890656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e3c1a3b1a3e3%3A0x8a3b1a3b1a3b1a3b!2sSan%20Jos%C3%A9%2C%20Costa%20Rica!5e0!3m2!1sen!2scr!4v1678912345678!5m2!1sen!2scr" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Gabunni Eats"
          ></iframe>
        </Card>
      </div>
    </div>
  );
}