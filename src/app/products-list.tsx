import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "./product";

export const ProductsList = ({ products, selectedItems, onItemToggle }: ProductsListProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
      {
        products.map(product => (
          <Card 
            key={product.id} 
            className={selectedItems.includes(product.id) ? "border-primary" : ""}
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant={selectedItems.includes(product.id) ? "default" : "outline"}
                className="w-full"
                onClick={() => onItemToggle(product.id)}
              >
                {selectedItems.includes(product.id) ? "Selecionado" : "Selecionar"}
              </Button>
            </CardContent>
          </Card>
        ))
      }
    </section>
  )
}

interface ProductsListProps {
  products: Product[];
  selectedItems: string[];
  onItemToggle: (itemId: string) => void
}