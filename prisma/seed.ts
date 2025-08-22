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
  await prisma.produtoMassa.deleteMany()  // NOVO
  await prisma.produtoTamanho.deleteMany()
  await prisma.produto.deleteMany()
  await prisma.decoracao.deleteMany()
  await prisma.cobertura.deleteMany()
  await prisma.recheio.deleteMany()
  await prisma.massa.deleteMany()  // NOVO

  // 1. INSERIR MASSAS (baseado no cardápio)
  console.log('🍞 Inserindo massas...')
  const massas = await prisma.massa.createMany({
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

  // 2. INSERIR RECHEIOS (baseado no cardápio)
  console.log('📝 Inserindo recheios...')
  const recheios = await prisma.recheio.createMany({
    data: [
      { nome: 'Creme de Ninho', precoExtra: 0 },
      { nome: 'Morango', precoExtra: 0 },
      { nome: 'Brigadeiro Preto', precoExtra: 0 },
      { nome: 'Brigadeiro Branco', precoExtra: 0 },
      { nome: 'Mousse de Chocolate', precoExtra: 0 },
      { nome: 'Brigadeiro de Nozes', precoExtra: 0 },
      { nome: 'Nutella', precoExtra: 30 }, // Bolo aniversário +30
      { nome: 'Maracujá', precoExtra: 0 },
      { nome: 'Ameixa', precoExtra: 0 },
      { nome: 'Doce de Leite', precoExtra: 0 },
      { nome: 'Abacaxi', precoExtra: 0 },
      { nome: 'Brigadeiro de Limão', precoExtra: 0 },
      { nome: 'Brigadeiro de Paçoca', precoExtra: 0 },
      { nome: 'Beijinho', precoExtra: 0 },
      { nome: 'Confeti', precoExtra: 0 }, // Para bolo caseiro
    ]
  })

  // 3. INSERIR COBERTURAS (baseado no cardápio)
  console.log('🎂 Inserindo coberturas...')
  const coberturas = await prisma.cobertura.createMany({
    data: [
      { nome: 'Chantininho', precoExtra: 0 },
      { nome: 'Mousse de Chocolate', precoExtra: 0 },
      { nome: 'Nutella', precoExtra: 20 }, // Bolo aniversário +20
      { nome: 'Ganache', precoExtra: 30 }, // Bolo aniversário +30
      { nome: 'Ganache Premium', precoExtra: 40 }, // Decoração no cardápio
      { nome: 'Sem Cobertura', precoExtra: 0 },
    ]
  })

  // 4. INSERIR DECORAÇÕES (baseado no cardápio)
  console.log('✨ Inserindo decorações...')
  const decoracoes = await prisma.decoracao.createMany({
    data: [
      { nome: 'KitKat', preco: 32 }, // "a partir de 32"
      { nome: 'Flor', preco: 20 },
      { nome: 'Papelaria', preco: 18 },
      { nome: 'Decoração Colorida', preco: 5 },
      { nome: 'Ganache Premium', preco: 40 },
    ]
  })

  // 5. INSERIR PRODUTOS PRINCIPAIS
  console.log('🍰 Inserindo produtos...')

  // BOLO DE ANIVERSÁRIO (tem massa, 2 recheios, 1 cobertura, decorações)
  const boloAniversario = await prisma.produto.create({
    data: {
      nome: 'Bolo de Aniversário',
      descricao: 'Bolo personalizado com massa à escolha, 2 recheios e 1 cobertura',
      categoria: 'BOLO_ANIVERSARIO',
      imagem: "/uploads/aniversario.jpg",
      ativo: true,
    }
  })

  // Tamanhos do bolo de aniversário (do cardápio)
  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: boloAniversario.id, tamanho: '15CM', preco: 75, fatias: 7 },
      { produtoId: boloAniversario.id, tamanho: '20CM', preco: 150, fatias: 20 },
      { produtoId: boloAniversario.id, tamanho: '25CM', preco: 220, fatias: 30 },
    ]
  })

  // BOLO NA TAÇA (NÃO tem massa, 2 recheios, 1 cobertura, sem decorações)
  const boloTaca = await prisma.produto.create({
    data: {
      nome: 'Bolo na Taça',
      descricao: 'Delicioso bolo servido na taça com 2 recheios e 1 cobertura',
      categoria: 'BOLO_TACA',
      imagem: "/uploads/taca.jpg",
      ativo: true,
    }
  })

  // Tamanhos do bolo na taça (do cardápio)
  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: boloTaca.id, tamanho: '1KG', preco: 65, fatias: 10 },
      { produtoId: boloTaca.id, tamanho: '2KG', preco: 130, fatias: 20 },
    ]
  })

  // BOLO CASEIRO (tem massa, sem recheios específicos, sistema de coberturas diferente)
  const boloCaseiro = await prisma.produto.create({
    data: {
      nome: 'Bolo Caseiro',
      descricao: 'Bolo tradicional caseiro com massa à escolha',
      categoria: 'BOLO_CASEIRO',
      imagem: "/uploads/caseiro.jpg",
      ativo: true,
    }
  })

  // Tamanhos do bolo caseiro são baseados em quantidade de coberturas (do cardápio)
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
      imagem: "/uploads/docinhos.jpg",
      ativo: true,
    }
  })

  await prisma.produtoTamanho.createMany({
    data: [
      { produtoId: docinhos.id, tamanho: '50UN', preco: 60, fatias: null },
      { produtoId: docinhos.id, tamanho: '100UN', preco: 120, fatias: null },
    ]
  })

  // SOBREMESAS (do cardápio)
  const sobremesas = [
    { nome: 'Banoffee', preco: 60, imagem: '/uploads/sobremesas/banoffee.jpg' },
    { nome: 'Torta de Limão', preco: 60, imagem: '/uploads/sobremesas/torta-limao.jpg' },
    { nome: 'Gelado de Abacaxi', preco: 70, imagem: '/uploads/sobremesas/gelado-abacaxi.jpg' },
    { nome: 'Maracujá Trufado', preco: 80, imagem: '/uploads/sobremesas/maracuja-trufado.jpg' },
    { nome: 'Bombom de Morango', preco: 80, imagem: '/uploads/sobremesas/bombom-morango.jpg' },
    { nome: 'Bombom de Uva', preco: 80, imagem: '/uploads/sobremesas/bombom-uva.jpg' },
    { nome: 'Manjar', preco: 80, imagem: '/uploads/sobremesas/manjar.jpg' },
    { nome: 'Pavê', preco: 80, imagem: '/uploads/sobremesas/pave.jpg' },
    { nome: 'Merengue', preco: 60, imagem: '/uploads/sobremesas/merengue.jpg' },
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

  // 6. RELACIONAR PRODUTOS COM MASSAS/RECHEIOS/COBERTURAS
  console.log('🔗 Criando relacionamentos...')

  // Buscar IDs dos elementos criados
  const todasMassas = await prisma.massa.findMany()
  const todosRecheios = await prisma.recheio.findMany()
  const todasCoberturas = await prisma.cobertura.findMany()
  const todasDecoracoes = await prisma.decoracao.findMany()

  // BOLO DE ANIVERSÁRIO - massas permitidas: RED_VELVET, BRANCA, CHOCOLATE, CENOURA
  const massasAniversario = todasMassas.filter(m => 
    ['RED_VELVET', 'BRANCA', 'CHOCOLATE', 'CENOURA'].includes(m.tipo)
  )
  
  for (const massa of massasAniversario) {
    await prisma.produtoMassa.create({
      data: { produtoId: boloAniversario.id, massaId: massa.id }
    })
  }

  // BOLO CASEIRO - todas as massas
  for (const massa of todasMassas) {
    await prisma.produtoMassa.create({
      data: { produtoId: boloCaseiro.id, massaId: massa.id }
    })
  }

  // Recheios para bolos (exceto bolo caseiro que não usa recheios específicos)
  const bolosComRecheios = [boloAniversario.id, boloTaca.id]
  
  for (const boloId of bolosComRecheios) {
    // Adicionar recheios (filtrando conforme cardápio se necessário)
    for (const recheio of todosRecheios) {
      // Nutella com preço extra só para bolo de aniversário
      if (recheio.nome === 'Nutella' && boloId !== boloAniversario.id) {
        // Para bolo na taça, Nutella não tem preço extra
        await prisma.produtoRecheio.create({
          data: { produtoId: boloId, recheioId: recheio.id }
        })
      } else if (recheio.nome !== 'Confeti' || boloId === boloAniversario.id) {
        // Confeti só no cardápio do bolo caseiro, mas vamos adicionar em todos
        await prisma.produtoRecheio.create({
          data: { produtoId: boloId, recheioId: recheio.id }
        })
      }
    }
    
    // Adicionar coberturas
    for (const cobertura of todasCoberturas) {
      await prisma.produtoCobertura.create({
        data: { produtoId: boloId, coberturaId: cobertura.id }
      })
    }
  }

  // Decorações só para bolo de aniversário
  for (const decoracao of todasDecoracoes) {
    await prisma.produtoDecoracao.create({
      data: { produtoId: boloAniversario.id, decoracaoId: decoracao.id }
    })
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log(`📊 Dados inseridos:`)
  console.log(`   - ${todasMassas.length} massas`)
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