/*
  Warnings:

  - You are about to drop the column `itens` on the `pedidos` table. All the data in the column will be lost.
  - The `status` column on the `pedidos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `tipoPedido` to the `pedidos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `formaPagamento` on the `pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."FormaPagamento" AS ENUM ('DINHEIRO', 'PIX', 'CARTAO');

-- CreateEnum
CREATE TYPE "public"."StatusPedido" AS ENUM ('PENDENTE', 'CONFIRMADO', 'PRODUCAO', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."TipoPedido" AS ENUM ('ENTREGA', 'RETIRADA');

-- AlterTable
ALTER TABLE "public"."pedidos" DROP COLUMN "itens",
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "tipoPedido" "public"."TipoPedido" NOT NULL,
DROP COLUMN "formaPagamento",
ADD COLUMN     "formaPagamento" "public"."FormaPagamento" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."StatusPedido" NOT NULL DEFAULT 'PENDENTE';

-- CreateTable
CREATE TABLE "public"."itens_pedido" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "tamanho" TEXT,
    "massa" TEXT,
    "recheios" TEXT[],
    "cobertura" TEXT,
    "decoracoes" TEXT[],

    CONSTRAINT "itens_pedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."itens_pedido" ADD CONSTRAINT "itens_pedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "public"."pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_pedido" ADD CONSTRAINT "itens_pedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
