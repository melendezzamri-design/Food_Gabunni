import { useTranslations } from "next-intl";
// ❌ Eliminamos: import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  const t = useTranslations("hero");
  // ❌ Eliminamos la lógica de PlaceHolderImages: const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full">
      
      {/* 🖼️ IMPLEMENTACIÓN DE LA IMAGEN ESTATICA 'chapata.jpg' */}
      <Image
        // 🔑 CAMBIO CLAVE: Usamos la ruta estática directa
        src="/images/chapata.jpg" 
        alt={t("title")} // Usamos el título traducido como texto alternativo
        fill // Propiedad 'fill' mantiene el comportamiento de cubrir todo el contenedor
        className="object-cover"
        priority // Para cargar la imagen principal lo antes posible
      />
      
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow">
          {t("subtitle")}
        </p>
        <a href="#menu" className="mt-8">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {t("cta")}
          </Button>
        </a>
      </div>
    </section>
  );
}