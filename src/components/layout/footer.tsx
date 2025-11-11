import { useTranslations } from "next-intl";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image"; // ¡Asegúrate de tener esta importación!

export default function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const currentYear = new Date().getFullYear();
  // Definimos el color naranja de Gabunni
  const GABUNNI_ORANGE = '#dc730b'; 

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Nombre del Sitio (Usando Gabunni fijo de la respuesta anterior) */}
          <Link href="/" className="flex items-center space-x-2 font-headline"> 
            
            <Image
              src="/images/gabusito.jpeg" 
              alt=""
              width={40} 
              height={40} 
              className="object-contain"
            />
            
            <span className="text-xl font-bold" style={{ color: GABUNNI_ORANGE }}>
              Gabunni 
            </span>
            
          </Link>
          
          {/* Descripción del Sitio */}
          <p className="max-w-md mx-auto mt-2 text-sm text-muted-foreground">
            {t("description")}
          </p>
          
          {/* --- ENLACES DE NAVEGACIÓN (Contacto y Perfil) --- */}
          {/* ⭐️ CAMBIO: Convertí el 'div' en un 'flex' para alinear los enlaces */}
          <div className="flex items-center space-x-6 mt-4">
            <Link
              href="/contacto"
              className="text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
              style={{ color: GABUNNI_ORANGE }} 
            >
              {tCommon("contact")} 
            </Link>

            {/* ⭐️ NUEVO ENLACE A PERFIL DE USUARIO ⭐️ */}
            <Link
              href="/usuario" // Esta es la ruta a tu página de usuario
              className="text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
              style={{ color: GABUNNI_ORANGE }} 
            >
              Mi Perfil {/* O podrías usar tCommon("profile") si lo tienes en tus traducciones */}
            </Link>
          </div>
          {/* --------------------------- */}

          {/* Enlaces a Redes Sociales */}
          <div className="flex justify-center mt-6">
            <Link
              href="#"
              className="mx-4 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="mx-4 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="mx-4 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <hr className="my-6 border-border" />

        {/* Derechos de Autor */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Gabunni. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}