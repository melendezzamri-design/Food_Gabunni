"use client";

import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import type { OrderItem } from "@/lib/types";
import { Button } from "./ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { ScrollArea } from "./ui/scroll-area";

interface OrderSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  clearOrder: () => void;
}

export function OrderSheet({
  isOpen,
  onOpenChange,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  clearOrder,
}: OrderSheetProps) {
  const t = useTranslations("cart");
  const tMenu = useTranslations("menu");
  const tCommon = useTranslations("common");
  const tContact = useTranslations("contact");
  
  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>
            {t("subtitle")}
          </SheetDescription>
        </SheetHeader>
        <Separator />
        {orderItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6 space-y-4">
                {orderItems.map((item) => {
                  const image = PlaceHolderImages.find(
                    (img) => img.id === item.imageId
                  );
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive/70 hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>{tCommon("total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="lg"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      {tCommon("placeOrder")}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t("confirmOrder")}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t("confirmMessage", { phone: tContact("phoneText") })}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{tCommon("keepShopping")}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onOpenChange(false);
                          clearOrder();
                        }}
                      >
                        {tCommon("gotIt")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">{t("empty")}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => onOpenChange(false)}
            >
              {t("startOrdering")}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
