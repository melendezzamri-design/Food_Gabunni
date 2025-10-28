"use client";

import { useTranslations } from "next-intl";
import { menuItems } from "@/lib/menu-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sandwich, GlassWater, Citrus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { MenuItem, OrderItem } from "@/lib/types";
import { OrderSheet } from "../order-sheet";
import { useToast } from "@/hooks/use-toast";

const categoryIcons = {
  Chapatas: <Sandwich className="mr-2" />,
  Bebidas: <GlassWater className="mr-2" />,
  Jugos: <Citrus className="mr-2" />,
};

export default function MenuSection() {
  const t = useTranslations("menu");
  const tCart = useTranslations("cart");
  const tCommon = useTranslations("common");
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToOrder = (item: MenuItem) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
    toast({
      title: tCart("addedToCart", { item: item.name }),
      description: tCart("reviewOrder"),
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.id !== itemId));
  };

  const clearOrder = () => {
    setOrder([]);
    toast({
      title: tCart("orderPlaced"),
      description: tCart("thankYou"),
    });
  };

  const categories = ["Chapatas", "Bebidas", "Jugos"] as const;
  const totalItems = order.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">{t("title")}</h2>
        <p className="text-muted-foreground mt-2 text-lg">
          {t("subtitle")}
        </p>
      </div>
      <Tabs defaultValue="Chapatas" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-12">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-base h-full">
              {categoryIcons[category]}
              {t(`categories.${category.toLowerCase()}` as any)}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => {
                  const image = PlaceHolderImages.find(
                    (img) => img.id === item.imageId
                  );
                  return (
                    <Card
                      key={item.id}
                      className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                        </div>
                        <div className="p-6 pb-2">
                           <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
                          <CardDescription className="mt-2 h-10">{item.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow p-6 pt-2">
                        <p className="text-xl font-bold text-primary">
                          ${item.price.toFixed(2)}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full"
                          onClick={() => handleAddToOrder(item)}
                        >
                          {tCommon("addToOrder")}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full h-16 w-16 shadow-2xl"
            onClick={() => setSheetOpen(true)}
          >
            <ShoppingBag className="h-7 w-7" />
            <span className="sr-only">{tCommon("viewCart")}</span>
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          </Button>
        </div>
      )}
      <OrderSheet
        isOpen={isSheetOpen}
        onOpenChange={setSheetOpen}
        orderItems={order}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        clearOrder={clearOrder}
      />
    </div>
  );
}
