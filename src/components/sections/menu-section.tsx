"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sandwich, GlassWater, Citrus } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing"; 

// --- Objeto de Mapeo de Categorías (Sin cambios) ---
const categoryData = {
  Chapatas: {
    icon: <Sandwich className="h-6 w-6 text-white" />,
    imageUrl: "/images/Chapata.jpeg", 
    description: "Nuestras chapatas son la combinación perfecta de pan crujiente y rellenos frescos. Sabores tradicionales y gourmet, preparadas al momento.", 
  },
  Bebidas: {
    icon: <GlassWater className="h-6 w-6 text-white" />,
    imageUrl: "/images/bebidas.jpg", 
    description: "Amplia selección de bebidas frías y calientes. Incluye cafés premium, tés herbales y refrescos, ideales para cualquier momento del día.",
  },
  Jugos: {
    icon: <Citrus className="h-6 w-6 text-white" />,
    imageUrl: "/images/jugoss.jpg", 
    description: "Nuestros jugos y batidos naturales, recién hechos. Combina frutas de temporada para una dosis de energía y vitaminas.",
  },
};

export default function MenuSection() {
  const t = useTranslations("menu"); 
  
  const categories = ["Chapatas", "Bebidas", "Jugos"] as const;

  return (
    // 🔑 AJUSTE 1: Aumentamos el padding top a pt-8 para separar la línea superior del borde del componente
    <div id="menu-overview" className="container mx-auto px-4 pt-8 pb-0"> 
      
      {/* 🔑 AJUSTE 2: LÍNEA NARANJA SUPERIOR - Grosor (border-b-4) y Separación (mb-12) */}
      <div className="w-full flex justify-center mb-12"> 
        <div className="w-1/3 border-b-4 border-orange-500"></div> 
      </div>

      {/* Título de la Sección */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">{t("title")}</h2>
        <p className="text-muted-foreground mt-2 text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Grid de Tarjetas de Categoría (Sin cambios) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((category) => {
          const data = categoryData[category];
          
          return (
            <Card
              key={category}
              className="relative overflow-hidden group border-none shadow-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
            >
                <Link href={`#${category.toLowerCase()}`} className="block">
                    <div className="relative h-60 w-full">
                      <Image
                        src={data.imageUrl} 
                        alt={t(`categories.${category.toLowerCase()}`)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                    </div>
                    <CardHeader className="absolute bottom-0 left-0 p-4 sm:p-6 text-white z-10 w-full">
                      <div className="flex items-center space-x-2 mb-1">
                        {data.icon}
                        <CardTitle className="font-headline text-3xl sm:text-4xl">
                          {t(`categories.${category.toLowerCase()}` as any)}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-200 text-sm sm:text-base">
                        {data.description}
                      </CardDescription>
                    </CardHeader>
                </Link>
              <div className="absolute inset-0"></div>
            </Card>
          );
        })}
      </div>

      {/* Botón de Navegación Central */}
      {/* Ajustamos a mt-12 para dar más separación de las tarjetas */}
      <div className="mt-12 text-center"> 
        <Link href="#menu" passHref>
          <Button 
            size="lg" 
            className="h-12 px-8 text-lg font-semibold bg-orange-500 hover:bg-orange-600 transition-colors duration-300 shadow-xl"
          >
            Menú 
          </Button>
        </Link>
      </div>

      {/* 🔑 AJUSTE 3: LÍNEA NARANJA INFERIOR - Grosor (border-b-4) y Separación (mt-12) */}
      <div className="w-full flex justify-center mt-12 mb-8">
        <div className="w-1/3 border-b-4 border-orange-500"></div>
      </div>
      
    </div>
  );
}