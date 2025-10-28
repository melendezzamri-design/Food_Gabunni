export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Chapatas" | "Bebidas" | "Jugos";
  imageId: string;
};

export type OrderItem = MenuItem & {
  quantity: number;
};
