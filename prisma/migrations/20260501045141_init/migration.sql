-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('BRAND_NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('IN_STOCK', 'SOLD');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'EFT', 'SNAPSCAN', 'YOCO', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockItem" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,
    "imei" TEXT NOT NULL,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "status" "StockStatus" NOT NULL DEFAULT 'IN_STOCK',
    "addedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "stockItemId" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "buyerPhone" TEXT NOT NULL,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "images" TEXT[],
    "soldBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StockItem_imei_key" ON "StockItem"("imei");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_stockItemId_key" ON "Sale"("stockItemId");

-- AddForeignKey
ALTER TABLE "StockItem" ADD CONSTRAINT "StockItem_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_stockItemId_fkey" FOREIGN KEY ("stockItemId") REFERENCES "StockItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_soldBy_fkey" FOREIGN KEY ("soldBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
