/*
  Warnings:

  - You are about to drop the column `productsId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_productsId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "productsId";

-- CreateTable
CREATE TABLE "_categoriesToproducts" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_categoriesToproducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_categoriesToproducts_B_index" ON "_categoriesToproducts"("B");

-- AddForeignKey
ALTER TABLE "_categoriesToproducts" ADD CONSTRAINT "_categoriesToproducts_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoriesToproducts" ADD CONSTRAINT "_categoriesToproducts_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
