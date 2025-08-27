-- CreateEnum
CREATE TYPE "public"."Categoria" AS ENUM ('BOLO_ANIVERSARIO', 'BOLO_TACA', 'BOLO_CASEIRO', 'DOCINHOS', 'SOBREMESAS');

-- CreateEnum
CREATE TYPE "public"."MassaBolo" AS ENUM ('RED_VELVET', 'BRANCA', 'CHOCOLATE', 'CENOURA', 'MILHO', 'FUBA', 'LIMAO', 'FORMIGUEIRO', 'LARANJA', 'IOGURTE');

-- CreateTable
CREATE TABLE "public"."produtos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoria" "public"."Categoria" NOT NULL,
    "preco" DOUBLE PRECISION,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "imagem" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produto_tamanhos" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "tamanho" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "fatias" INTEGER,

    CONSTRAINT "produto_tamanhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."massas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "public"."MassaBolo" NOT NULL,
    "precoExtra" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "massas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produto_massas" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "massaId" INTEGER NOT NULL,

    CONSTRAINT "produto_massas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."recheios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "recheios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produto_recheios" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "recheioId" INTEGER NOT NULL,
    "precoExtra" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "produto_recheios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coberturas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "coberturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produto_coberturas" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "coberturaId" INTEGER NOT NULL,
    "precoExtra" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "produto_coberturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."decoracoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "decoracoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produto_decoracoes" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "decoracaoId" INTEGER NOT NULL,

    CONSTRAINT "produto_decoracoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carrinhos" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carrinhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itens_carrinho" (
    "id" SERIAL NOT NULL,
    "carrinhoId" TEXT NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "tamanho" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,
    "massa" TEXT,
    "recheios" TEXT[],
    "cobertura" TEXT,
    "decoracoes" TEXT[],

    CONSTRAINT "itens_carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pedidos" (
    "id" SERIAL NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT,
    "formaPagamento" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "itens" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "massas_nome_key" ON "public"."massas"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produto_massas_produtoId_massaId_key" ON "public"."produto_massas"("produtoId", "massaId");

-- CreateIndex
CREATE UNIQUE INDEX "recheios_nome_key" ON "public"."recheios"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produto_recheios_produtoId_recheioId_key" ON "public"."produto_recheios"("produtoId", "recheioId");

-- CreateIndex
CREATE UNIQUE INDEX "coberturas_nome_key" ON "public"."coberturas"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produto_coberturas_produtoId_coberturaId_key" ON "public"."produto_coberturas"("produtoId", "coberturaId");

-- CreateIndex
CREATE UNIQUE INDEX "decoracoes_nome_key" ON "public"."decoracoes"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produto_decoracoes_produtoId_decoracaoId_key" ON "public"."produto_decoracoes"("produtoId", "decoracaoId");

-- AddForeignKey
ALTER TABLE "public"."produto_tamanhos" ADD CONSTRAINT "produto_tamanhos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_massas" ADD CONSTRAINT "produto_massas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_massas" ADD CONSTRAINT "produto_massas_massaId_fkey" FOREIGN KEY ("massaId") REFERENCES "public"."massas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_recheios" ADD CONSTRAINT "produto_recheios_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_recheios" ADD CONSTRAINT "produto_recheios_recheioId_fkey" FOREIGN KEY ("recheioId") REFERENCES "public"."recheios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_coberturas" ADD CONSTRAINT "produto_coberturas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_coberturas" ADD CONSTRAINT "produto_coberturas_coberturaId_fkey" FOREIGN KEY ("coberturaId") REFERENCES "public"."coberturas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_decoracoes" ADD CONSTRAINT "produto_decoracoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto_decoracoes" ADD CONSTRAINT "produto_decoracoes_decoracaoId_fkey" FOREIGN KEY ("decoracaoId") REFERENCES "public"."decoracoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_carrinho" ADD CONSTRAINT "itens_carrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "public"."carrinhos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_carrinho" ADD CONSTRAINT "itens_carrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
