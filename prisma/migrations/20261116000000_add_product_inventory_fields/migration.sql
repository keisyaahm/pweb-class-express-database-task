-- Extend Product for the React inventory interface.
ALTER TABLE "Product"
ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Lainnya',
ADD COLUMN "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "sku" TEXT,
ADD COLUMN "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
