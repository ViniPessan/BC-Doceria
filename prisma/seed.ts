import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.itemCarrinho.deleteMany()
  await prisma.carrinho.deleteMany()
  await prisma.produtoDecoracao.deleteMany()
  await prisma.produtoCobertura.deleteMany()
  await prisma.produtoRecheio.deleteMany()
  await prisma.produtoTamanho.deleteMany()
  await prisma.produto.deleteMany()
  await prisma.decoracao.deleteMany()
  await prisma.cobertura.deleteMany()
  await prisma.recheio.deleteMany()

  // 1. INSERIR RECHEIOS
  console.log('📝 Inserindo recheios...')
  const recheios = await prisma.recheio.createMany({
    data: [
      { nome: 'Creme de Ninho', precoExtra: 0 },
      { nome: 'Morango', precoExtra: 0 },
      { nome: 'Brigadeiro Preto', precoExtra: 0 },
      { nome: 'Brigadeiro Branco', precoExtra: 0 },
      { nome: 'Mousse de Chocolate', precoExtra: 0 },
      { nome: 'Brigadeiro de Nozes', precoExtra: 0 },
      { nome: 'Nutella', precoExtra: 30 },
      { nome: 'Maracujá', precoExtra: 0 },
      { nome: 'Ameixa', precoExtra: 0 },
      { nome: 'Doce de Leite', precoExtra: 0 },
      { nome: 'Abacaxi', precoExtra: 0 },
      { nome: 'Brigadeiro de Limão', precoExtra: 0 },
      { nome: 'Brigadeiro de Paçoca', precoExtra: 0 },
      { nome: 'Beijinho', precoExtra: 0 },
    ]
  })

  // 2. INSERIR COBERTURAS
  console.log('🎂 Inserindo coberturas...')
  const coberturas = await prisma.cobertura.createMany({
    data: [
      { nome: 'Chantininho', precoExtra: 0 },
      { nome: 'Mousse de Chocolate', precoExtra: 0 },
      { nome: 'Nutella', precoExtra: 20 },
      { nome: 'Ganache', precoExtra: 30 },
      { nome: 'Sem Cobertura', precoExtra: 0 },
    ]
  })

  // 3. INSERIR DECORAÇÕES
  console.log('✨ Inserindo decorações...')
  const decoracoes = await prisma.decoracao.createMany({
    data: [
      { nome: 'KitKat', preco: 32 },
      { nome: 'Flor', preco: 20 },
      { nome: 'Papelaria', preco: 18 },
      { nome: 'Decoração Colorida', preco: 5 },
      { nome: 'Ganache Premium', preco: 40 },
    ]
  })

  // 4. INSERIR PRODUTOS PRINCIPAIS
  console.log('🍰 Inserindo produtos...')

  // BOLO DE ANIVERSÁRIO
  const boloAniversario = await prisma.produto.create({
    data: {
      nome: 'Bolo de Aniversário',
      descricao: 'Bolo personalizado com 2 recheios à sua escolha e 1 cobertura',
      categoria: 'BOLO_ANIVERSARIO',
      imagem:"uploads/aniversario.jpg",
      ativo: true,
    }
  })

  // Tamanhos do bolo de aniversário
  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: boloAniversario.id, tamanho: '15CM', preco: 75, fatias: 7 },
      { produtoId: boloAniversario.id, tamanho: '20CM', preco: 150, fatias: 20 },
      { produtoId: boloAniversario.id, tamanho: '25CM', preco: 220, fatias: 30 },
    ]
  })

  // BOLO NA TAÇA
  const boloTaca = await prisma.produto.create({
    data: {
      nome: 'Bolo na Taça',
      descricao: 'Delicioso bolo servido na taça com 2 recheios e 1 cobertura',
      categoria: 'BOLO_TACA',
      imagem:"uploads/taca.jpg",
      ativo: true,
    }
  })

  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: boloTaca.id, tamanho: '1KG', preco: 65, fatias: 10 },
      { produtoId: boloTaca.id, tamanho: '2KG', preco: 130, fatias: 20 },
    ]
  })

  // BOLO CASEIRO
  const boloCaseiro = await prisma.produto.create({
    data: {
      nome: 'Bolo Caseiro',
      descricao: 'Bolo tradicional caseiro com sabores clássicos',
      categoria: 'BOLO_CASEIRO',
      imagem:"uploads/caseiro.jpg",
      ativo: true,
    }
  })

  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: boloCaseiro.id, tamanho: 'Sem Cobertura', preco: 35, fatias: 8 },
      { produtoId: boloCaseiro.id, tamanho: '1 Cobertura', preco: 40, fatias: 8 },
      { produtoId: boloCaseiro.id, tamanho: '2 Coberturas', preco: 45, fatias: 8 },
    ]
  })

  // DOCINHOS
  const docinhos = await prisma.produto.create({
    data: {
      nome: 'Docinhos Variados',
      descricao: 'Brigadeiros, beijinhos e outras delícias',
      categoria: 'DOCINHOS',
      ativo: true,
    }
  })

  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: docinhos.id, tamanho: '50UN', preco: 60, fatias: null },
      { produtoId: docinhos.id, tamanho: '100UN', preco: 120, fatias: null },
    ]
  })

  // SOBREMESAS
  const sobremesas = [
    { nome: 'Banoffee', preco: 60 },
    { nome: 'Torta de Limão', preco: 60 },
    { nome: 'Gelado de Abacaxi', preco: 70 },
    { nome: 'Maracujá Trufado', preco: 80 },
    { nome: 'Bombom de Morango', preco: 80 },
    { nome: 'Bombom de Uva', preco: 80 },
    { nome: 'Manjar', preco: 80 },
    { nome: 'Pavê', preco: 80 },
    { nome: 'Merengue', preco: 60 },
  ]

  for (const sobremesa of sobremesas) {
    await prisma.produto.create({
      data: {
        nome: sobremesa.nome,
        categoria: 'SOBREMESAS',
        preco: sobremesa.preco,
        ativo: true,
      }
    })
  }

  // 5. RELACIONAR PRODUTOS COM RECHEIOS/COBERTURAS
  console.log('🔗 Criando relacionamentos...')

  // Buscar IDs dos recheios e coberturas
  const todosRecheios = await prisma.recheio.findMany()
  const todasCoberturas = await prisma.cobertura.findMany()
  const todasDecoracoes = await prisma.decoracao.findMany()

  // Bolos podem ter todos os recheios
  const bolosIds = [boloAniversario.id, boloTaca.id, boloCaseiro.id]
  
  for (const boloId of bolosIds) {
    // Adicionar todos os recheios
    for (const recheio of todosRecheios) {
      await prisma.produtoRecheio.create({
        data: { produtoId: boloId, recheioId: recheio.id }
      })
    }
    
    // Adicionar todas as coberturas
    for (const cobertura of todasCoberturas) {
      await prisma.produtoCobertura.create({
        data: { produtoId: boloId, coberturaId: cobertura.id }
      })
    }

    // Adicionar decorações (só para bolos de aniversário)
    if (boloId === boloAniversario.id) {
      for (const decoracao of todasDecoracoes) {
        await prisma.produtoDecoracao.create({
          data: { produtoId: boloId, decoracaoId: decoracao.id }
        })
      }
    }
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log(`📊 Dados inseridos:`)
  console.log(`   - ${todosRecheios.length} recheios`)
  console.log(`   - ${todasCoberturas.length} coberturas`) 
  console.log(`   - ${todasDecoracoes.length} decorações`)
  console.log(`   - Produtos: Bolos e ${sobremesas.length} sobremesas`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })