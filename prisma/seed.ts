import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  async function safeDelete(model: any, modelName: string) {
    try {
      const result = await model.deleteMany()
      console.log(`✅ ${modelName}: ${result.count} registros deletados`)
    } catch (error: any) {
      if (error.code === 'P2021') {
        console.log(`⚠️ ${modelName}: Tabela não existe (ignorando)`)
      } else {
        throw error
      }
    }
  }

  console.log('🧹 Limpando dados existentes...')
  await safeDelete(prisma.itemCarrinho, 'ItemCarrinho')
  await safeDelete(prisma.carrinho, 'Carrinho')
  await safeDelete(prisma.produtoDecoracao, 'ProdutoDecoracao')
  await safeDelete(prisma.produtoCobertura, 'ProdutoCobertura')
  await safeDelete(prisma.produtoRecheio, 'ProdutoRecheio')
  await safeDelete(prisma.produtoMassa, 'ProdutoMassa')
  await safeDelete(prisma.produtoTamanho, 'ProdutoTamanho')
  await safeDelete(prisma.produto, 'Produto')
  await safeDelete(prisma.decoracao, 'Decoracao')
  await safeDelete(prisma.cobertura, 'Cobertura')
  await safeDelete(prisma.recheio, 'Recheio')
  await safeDelete(prisma.massa, 'Massa')

  // 1. Massas
  console.log('🍞 Inserindo massas...')
  await prisma.massa.createMany({
    data: [
      { nome: 'Red Velvet', tipo: 'RED_VELVET', precoExtra: 0 },
      { nome: 'Branca', tipo: 'BRANCA', precoExtra: 0 },
      { nome: 'Chocolate', tipo: 'CHOCOLATE', precoExtra: 0 },
      { nome: 'Cenoura', tipo: 'CENOURA', precoExtra: 0 },
      { nome: 'Milho', tipo: 'MILHO', precoExtra: 0 },
      { nome: 'Fubá', tipo: 'FUBA', precoExtra: 0 },
      { nome: 'Limão', tipo: 'LIMAO', precoExtra: 0 },
      { nome: 'Formigueiro', tipo: 'FORMIGUEIRO', precoExtra: 0 },
      { nome: 'Laranja', tipo: 'LARANJA', precoExtra: 0 },
      { nome: 'Iogurte', tipo: 'IOGURTE', precoExtra: 0 },
    ]
  })

  // 2. Recheios
  console.log('📝 Inserindo recheios...')
  await prisma.recheio.createMany({
    data: [
      { nome: 'Creme de Ninho' },
      { nome: 'Morango' },
      { nome: 'Brigadeiro Preto' },
      { nome: 'Brigadeiro Branco' },
      { nome: 'Mousse de Chocolate' },
      { nome: 'Brigadeiro de Nozes' },
      { nome: 'Nutella' },
      { nome: 'Maracujá' },
      { nome: 'Ameixa' },
      { nome: 'Doce de Leite' },
      { nome: 'Abacaxi' },
      { nome: 'Brigadeiro de Limão' },
      { nome: 'Brigadeiro de Paçoca' },
      { nome: 'Beijinho' },
    ]
  })

  // 3. Coberturas
  console.log('🎂 Inserindo coberturas...')
  await prisma.cobertura.createMany({
    data: [
      { nome: 'Chantininho' },
      { nome: 'Mousse de Chocolate' },
      { nome: 'Mousse' },
      { nome: 'Nutella' },
      { nome: 'Ganache' },
      { nome: 'Sem Cobertura' },
      { nome: 'Creme de Ninho' },
      { nome: 'Morango' },
      { nome: 'Brigadeiro Preto' },
      { nome: 'Brigadeiro Branco' },
      { nome: 'Brigadeiro de Limão' },
      { nome: 'Maracujá' },
      { nome: 'Ameixa' },
      { nome: 'Abacaxi' },
      { nome: 'Brigadeiro de Paçoca' },
      { nome: 'Beijinho' },
      { nome: 'Confeti' },
    ]
  })

  // 4. Decorações
  console.log('✨ Inserindo decorações...')
  await prisma.decoracao.createMany({
    data: [
      { nome: 'Papelaria', preco: 18 },
      { nome: 'Decoração Colorida', preco: 5 },
      { nome: 'KitKat', preco: 32 },
      { nome: 'Flor', preco: 20 },
    ]
  })

  // 5. Produtos principais
  console.log('🍰 Inserindo produtos...')
  const boloAniversario = await prisma.produto.create({
    data: {
      nome: 'Bolo de Aniversário',
      descricao: 'Bolo personalizado com 2 recheios, 1 cobertura e até 4 decorações à escolha',
      categoria: 'BOLO_ANIVERSARIO',
      imagem: "/bolos/aniversario.jpg",
      ativo: true,
    }
  })
  const boloTaca = await prisma.produto.create({
    data: {
      nome: 'Bolo na Taça',
      descricao: 'Delicioso bolo servido na taça com 2 recheios e 1 cobertura',
      categoria: 'BOLO_TACA',
      imagem: "/bolos/taca.jpg",
      ativo: true,
    }
  })
  const boloCaseiro = await prisma.produto.create({
    data: {
      nome: 'Bolo Caseiro',
      descricao: 'Bolo tradicional caseiro com massa à escolha',
      categoria: 'BOLO_CASEIRO',
      imagem: "/bolos/caseiro.jpg",
      ativo: true,
    }
  })

  // Tamanhos
  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: boloAniversario.id, tamanho: '15CM', preco: 75, fatias: 7 },
      { produtoId: boloAniversario.id, tamanho: '20CM', preco: 150, fatias: 20 },
      { produtoId: boloAniversario.id, tamanho: '25CM', preco: 220, fatias: 30 },

      { produtoId: boloTaca.id, tamanho: '1KG', preco: 65, fatias: 10 },
      { produtoId: boloTaca.id, tamanho: '2KG', preco: 130, fatias: 20 },

      { produtoId: boloCaseiro.id, tamanho: 'Sem Cobertura', preco: 35, fatias: 8 },
      { produtoId: boloCaseiro.id, tamanho: '1 Cobertura', preco: 40, fatias: 8 },
      { produtoId: boloCaseiro.id, tamanho: '2 Coberturas', preco: 45, fatias: 8 },
    ]
  })

  // Docinhos individuais por sabor
  console.log('🍬 Inserindo docinhos...')
  const docinhosSabores = [
    { nome: 'Brigadeiro', imagem: '/docinhos/brigadeiro.jpg', precoExtra: 0 },
    { nome: 'Ninho com Nutella', imagem: '/docinhos/ninho-nutella.jpg', precoExtra: 30 },
    { nome: 'Beijinho', imagem: '/docinhos/beijinho.jpg', precoExtra: 0 },
    { nome: 'Ninho', imagem: '/docinhos/Ninho.jpg', precoExtra: 0 },
    { nome: 'Brigadeiro de Paçoca', imagem: '/docinhos/brigadeiro-pacoca.jpg', precoExtra: 0 },
    { nome: 'Brigadeiro de Churros', imagem: '/docinhos/brigadeiro-churros.jpg', precoExtra: 0 },
    { nome: 'Brigadeiro de Morango', imagem: '/docinhos/brigadeiro-morango.webp', precoExtra: 0 },
  ]

  for (const docinho of docinhosSabores) {
    const produto = await prisma.produto.create({
      data: {
        nome: docinho.nome,
        categoria: 'DOCINHOS',
        imagem: docinho.imagem,
        ativo: true,
      }
    })
    
    // Preços: base R$60 (50UN) e R$120 (100UN) + extra fixo para Nutella
    const preco50 = 60 + docinho.precoExtra
    const preco100 = 120 + docinho.precoExtra // Extra fixo para ambos tamanhos
    
    await prisma.produtoTamanho.createMany({
      data: [
        { produtoId: produto.id, tamanho: '50UN', preco: preco50, fatias: null },
        { produtoId: produto.id, tamanho: '100UN', preco: preco100, fatias: null },
      ]
    })
  }

  // Sobremesas - preços corrigidos
  console.log('🧁 Inserindo sobremesas...')
  const sobremesas = [
    { nome: 'Banoffee', preco: 60, imagem: '/sobremesas/banoffee.jpg' },
    { nome: 'Torta de Limão', preco: 60, imagem: '/sobremesas/torta-limao.jpg' },
    { nome: 'Gelado de Abacaxi', preco: 60, imagem: '/sobremesas/gelado-abacaxi.jpg' },
    { nome: 'Maracujá Trufado', preco: 70, imagem: '/sobremesas/maracuja-trufado.jpg' },
    { nome: 'Bombom de Morango', preco: 80, imagem: '/sobremesas/bombom-morango.jpeg' },
    { nome: 'Bombom de Uva', preco: 80, imagem: '/sobremesas/bombom-uva.jpg' },
    { nome: 'Manjar', preco: 80, imagem: '/sobremesas/manjar.jpg' },
    { nome: 'Pavê', preco: 80, imagem: '/sobremesas/pave.jpg' },
    { nome: 'Merengue', preco: 80, imagem: '/sobremesas/merengue.jpg' },
  ]
  for (const sobremesa of sobremesas) {
    await prisma.produto.create({
      data: {
        nome: sobremesa.nome,
        categoria: 'SOBREMESAS',
        preco: sobremesa.preco,
        imagem: sobremesa.imagem,
        ativo: true,
      }
    })
  }

  // 6. RELACIONAMENTOS COM PREÇOS ESPECÍFICOS
  console.log('🔗 Criando relacionamentos com preços específicos...')
  const massas = await prisma.massa.findMany()
  const recheios = await prisma.recheio.findMany()
  const coberturas = await prisma.cobertura.findMany()
  const decoracoes = await prisma.decoracao.findMany()

  // Massas
  const massasAniversario = massas.filter(m =>
    ['RED_VELVET', 'BRANCA', 'CHOCOLATE', 'CENOURA'].includes(m.tipo)
  )
  for (const massa of massasAniversario) {
    await prisma.produtoMassa.create({ data: { produtoId: boloAniversario.id, massaId: massa.id } })
  }
  for (const massa of massas) {
    await prisma.produtoMassa.create({ data: { produtoId: boloCaseiro.id, massaId: massa.id } })
  }

  // Recheios e coberturas BOLO NA TAÇA
  const recheiosBoloTaca = [
    { nome: 'Creme de Ninho', precoExtra: 0 }, { nome: 'Morango', precoExtra: 0 }, { nome: 'Brigadeiro Preto', precoExtra: 0 },
    { nome: 'Brigadeiro Branco', precoExtra: 0 }, { nome: 'Mousse de Chocolate', precoExtra: 0 }, { nome: 'Brigadeiro de Nozes', precoExtra: 0 },
    { nome: 'Nutella', precoExtra: 30 }, { nome: 'Maracujá', precoExtra: 0 }, { nome: 'Ameixa', precoExtra: 0 },
    { nome: 'Doce de Leite', precoExtra: 0 }, { nome: 'Abacaxi', precoExtra: 0 }, { nome: 'Brigadeiro de Limão', precoExtra: 0 },
    { nome: 'Brigadeiro de Paçoca', precoExtra: 0 }, { nome: 'Beijinho', precoExtra: 0 }
  ]
  for (const r of recheiosBoloTaca) {
    const rec = recheios.find(x => x.nome === r.nome)
    if (rec) await prisma.produtoRecheio.create({ data: { produtoId: boloTaca.id, recheioId: rec.id, precoExtra: r.precoExtra } })
  }
  const coberturasBoloTaca = [
    { nome: 'Chantininho', precoExtra: 0 }, { nome: 'Mousse de Chocolate', precoExtra: 0 },
    { nome: 'Nutella', precoExtra: 20 }, { nome: 'Ganache', precoExtra: 30 }
  ]
  for (const c of coberturasBoloTaca) {
    const cov = coberturas.find(x => x.nome === c.nome)
    if (cov) await prisma.produtoCobertura.create({ data: { produtoId: boloTaca.id, coberturaId: cov.id, precoExtra: c.precoExtra } })
  }

  // Recheios e coberturas BOLO ANIVERSÁRIO
  const recheiosBoloAniversario = [
    { nome: 'Creme de Ninho', precoExtra: 0 }, { nome: 'Morango', precoExtra: 0 }, { nome: 'Brigadeiro Preto', precoExtra: 0 },
    { nome: 'Brigadeiro Branco', precoExtra: 0 }, { nome: 'Mousse de Chocolate', precoExtra: 0 }, { nome: 'Brigadeiro de Nozes', precoExtra: 0 },
    { nome: 'Maracujá', precoExtra: 0 }, { nome: 'Ameixa', precoExtra: 0 }, { nome: 'Doce de Leite', precoExtra: 0 },
    { nome: 'Abacaxi', precoExtra: 0 }, { nome: 'Brigadeiro de Paçoca', precoExtra: 0 }, { nome: 'Beijinho', precoExtra: 0 }
  ]
  for (const r of recheiosBoloAniversario) {
    const rec = recheios.find(x => x.nome === r.nome)
    if (rec) await prisma.produtoRecheio.create({ data: { produtoId: boloAniversario.id, recheioId: rec.id, precoExtra: r.precoExtra } })
  }
  const coberturasBoloAniversario = [
    { nome: 'Chantininho', precoExtra: 0 }, { nome: 'Mousse', precoExtra: 0 },
    { nome: 'Nutella', precoExtra: 30 }, { nome: 'Ganache', precoExtra: 40 }
  ]
  for (const c of coberturasBoloAniversario) {
    const cov = coberturas.find(x => x.nome === c.nome)
    if (cov) await prisma.produtoCobertura.create({ data: { produtoId: boloAniversario.id, coberturaId: cov.id, precoExtra: c.precoExtra } })
  }

  // Coberturas BOLO CASEIRO
  const coberturasBoloCaseiro = [
    { nome: 'Creme de Ninho', precoExtra: 0 },
    { nome: 'Morango', precoExtra: 0 },
    { nome: 'Brigadeiro Preto', precoExtra: 0 },
    { nome: 'Brigadeiro Branco', precoExtra: 0 },
    { nome: 'Mousse de Chocolate', precoExtra: 0 },
    { nome: 'Brigadeiro de Limão', precoExtra: 0 },
    { nome: 'Nutella', precoExtra: 5 },
    { nome: 'Maracujá', precoExtra: 0 },
    { nome: 'Ameixa', precoExtra: 0 },
    { nome: 'Abacaxi', precoExtra: 0 },
    { nome: 'Brigadeiro de Paçoca', precoExtra: 0 },
    { nome: 'Beijinho', precoExtra: 0 },
    { nome: 'Confeti', precoExtra: 0 },
  ]
  for (const c of coberturasBoloCaseiro) {
    const cov = coberturas.find(x => x.nome === c.nome)
    if (cov) await prisma.produtoCobertura.create({ data: { produtoId: boloCaseiro.id, coberturaId: cov.id, precoExtra: c.precoExtra } })
  }

  // Decorações só para bolo aniversário
  for (const decor of decoracoes) {
    await prisma.produtoDecoracao.create({ data: { produtoId: boloAniversario.id, decoracaoId: decor.id } })
  }

  console.log('✅ Seed concluído - CONFORME CARDÁPIO!')
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })