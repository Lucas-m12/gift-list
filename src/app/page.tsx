"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ConfirmationDialog } from "./confirmation-dialog";
import { ProductsList } from "./products-list";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleItemToggle = useCallback((itemId: string) => {
    setSelectedItems(
      prev => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId])
    )
  }, []);

  const categories = [
    { id: "kitchen", name: "Cozinha" },
    { id: "bedroom", name: "Quarto" },
    { id: "living-room", name: "Sala" },
    { id: "bathroom", name: "Banheiro" },
  ];

  const products = [
    { 
      id: "1", name: "Dinheiro", categories: ["kitchen", "bedroom", "living-room", "bathroom"] 
    },
    { id: "2", name: "Espresso Machine", categories: ["kitchen"] },
    { id: "3", name: "Luxury Bedding Set", categories: ["bedroom"] },
    { id: "4", name: "Smart Lighting System", categories: ["bedroom"] },
    { id: "5", name: "Sectional Sofa", categories: ["living-room"] },
    { id: "6", name: "Smart TV", categories: ["living-room"] },
    { id: "7", name: "Towel Warmer", categories: ["bathroom", "living-room"] },
    { id: "8", name: "Rainfall Shower Head", categories: ["bathroom"] },
    { id: "9", name: "Dining Table Set", categories: ["dining"] },
    { id: "10", name: "Wine Cooler", categories: ["dining"] },
    { id: "11", name: "Robot Vacuum", categories: ["living-room"] },
    { id: "12", name: "Air Purifier", categories: ["bedroom"] },
  ];

  const handleSubmit = async (name: string) => {
    try {
      const response = await fetch('/api', {
        method: "POST",
        body: JSON.stringify({
          name,
          selectedItems
        }),
      });
      if (!response.ok) {
        
      }
      setSelectedItems([]);
      setIsDialogOpen(false);
      router.push('/finish');
    } catch (error) {
      console.error({error});
    }
  }

  return (
    <section className="bg-white flex flex-col max-h-screen">
      {/* <header>
        <div className="logo" />
      </header> */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Presentes de casamento ❤️</h1>
        <div className="flex flex-col items-center gap-2 mb-6">
          <h3 className="text-md text-gray-600 text-center">Para te ajudar, use essa imagem como inspiração:</h3>
          <Image 
            src="/example.png"
            alt="exemplo"
            width={200}
            height={100}
          />
        </div>
        <section 
          className="w-full max-h-full lg:w-2/3 flex items-center justify-center flex-col"
        >
          <Tabs>
            <TabsList 
              defaultValue={categories[0].id} 
              className="mb-2"
            >
              {
                categories.map(category => (
                  <TabsTrigger 
                    value={category.id} 
                    key={category.id}
                  >
                    {category.name}
                  </TabsTrigger>
                ))
              }
            </TabsList>
            {
              categories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  <ProductsList 
                    products={
                      products.filter((product) => product.categories.includes(category.id))
                    }
                    selectedItems={selectedItems}
                    onItemToggle={handleItemToggle}
                  />
                </TabsContent>
              ))
            }
          </Tabs>
        </section>
        <Button 
          className="mt-6 w-full lg:w-2/3" 
          onClick={() => setIsDialogOpen(true)} 
          disabled={selectedItems.length === 0}
        >
          Confirmar seleção do presente
        </Button>
      </main>
      <ConfirmationDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleSubmit}
        selectedItems={
          selectedItems.map((id) => products.find((p) => p.id === id)?.name ?? "")
        }
      />
    </section>
  );
}
