"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ConfirmationDialog } from "./confirmation-dialog";
import { ProductsList } from "./products-list";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [products, setProducts] = useState<{id: string, name: string, categories: string[]}[]>([]);
  const router = useRouter();

  const handleItemToggle = useCallback((itemId: string) => {
    setSelectedItems(
      prev => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId])
    )
  }, []);

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
        console.error("error: " + response?.status);
      }
      setSelectedItems([]);
      setIsDialogOpen(false);
      
      router.refresh();
    } catch (error) {
      console.error({error});
    }
  };

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/get-categories");
      const data = await result.json();
      setCategories(data);
    })()
  }, []);
  
  useEffect(() => {
    (async () => {
      const result = await fetch("/api/get-products");
      const data = await result.json();
      setProducts(data);
    })()
  }, []);

  return (
    <section className="bg-white flex flex-col max-h-screen">
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
              defaultValue={categories[0]?.id ?? ""} 
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
