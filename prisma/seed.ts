import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Função auxiliar para deletar com segurança
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

  // Limpar dados existentes (com segurança)
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

  // 1. INSERIR MASSAS (baseado no cardápio)
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

  // 2. INSERIR RECHEIOS (SEM precoExtra - será específico por produto)
  console.log('📝 Inserindo recheios...')
  await prisma.recheio.createMany({
    data: [
      { nome: 'Creme de Ninho' },
      { nome: 'Morango' },
      { nome: 'Brigadeiro Preto' },
      { nome: 'Brigadeiro Branco' },
      { nome: 'Mousse de Chocolate' },
      { nome: 'Brigadeiro de Nozes' },
      { nome: 'Nutella' }, // Preço será específico por produto
      { nome: 'Maracujá' },
      { nome: 'Ameixa' },
      { nome: 'Doce de Leite' },
      { nome: 'Abacaxi' },
      { nome: 'Brigadeiro de Limão' },
      { nome: 'Brigadeiro de Paçoca' },
      { nome: 'Beijinho' },
    ]
  })

  // 3. INSERIR COBERTURAS (SEM precoExtra - será específico por produto)
  console.log('🎂 Inserindo coberturas...')
  await prisma.cobertura.createMany({
    data: [
      { nome: 'Chantininho' },
      { nome: 'Mousse de Chocolate' }, // Para bolo na taça
      { nome: 'Mousse' }, // Para bolo aniversário (nome diferente conforme cardápio)
      { nome: 'Nutella' }, // Preço será específico por produto
      { nome: 'Ganache' }, // Preço será específico por produto
      { nome: 'Sem Cobertura' }, // Para bolo caseiro
    ]
  })

  // 4. INSERIR DECORAÇÕES (REMOVIDO Ganache Premium)
  console.log('✨ Inserindo decorações...')
  await prisma.decoracao.createMany({
    data: [
      { nome: 'Papelaria', preco: 18 },
      { nome: 'Decoração Colorida', preco: 5 },
      { nome: 'KitKat', preco: 32 }, // "à partir de 32"
      { nome: 'Flor', preco: 20 },
      // ❌ REMOVIDO: { nome: 'Ganache Premium', preco: 40 },
    ]
  })

  // 5. INSERIR PRODUTOS PRINCIPAIS
  console.log('🍰 Inserindo produtos...')

  // BOLO DE ANIVERSÁRIO
  const boloAniversario = await prisma.produto.create({
    data: {
      nome: 'Bolo de Aniversário',
      descricao: 'Bolo personalizado com massa à escolha, 2 recheios e 1 cobertura',
      categoria: 'BOLO_ANIVERSARIO',
      imagem: "/uploads/aniversario.jpg",
      ativo: true,
    }
  })

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
      imagem: "/uploads/taca.jpg",
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
      descricao: 'Bolo tradicional caseiro com massa à escolha',
      categoria: 'BOLO_CASEIRO',
      imagem: "/uploads/caseiro.jpg",
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

  // SOBREMESAS
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

  // 6. RELACIONAMENTOS COM PREÇOS ESPECÍFICOS CONFORME CARDÁPIO
  console.log('🔗 Criando relacionamentos com preços específicos...')

  // Buscar elementos
  const massas = await prisma.massa.findMany()
  const recheios = await prisma.recheio.findMany()
  const coberturas = await prisma.cobertura.findMany()
  const decoracoes = await prisma.decoracao.findMany()

  // MASSAS - BOLO DE ANIVERSÁRIO (apenas algumas conforme cardápio)
  const massasAniversario = massas.filter(m => 
    ['RED_VELVET', 'BRANCA', 'CHOCOLATE', 'CENOURA'].includes(m.tipo)
  )
  
  for (const massa of massasAniversario) {
    await prisma.produtoMassa.create({
      data: { produtoId: boloAniversario.id, massaId: massa.id }
    })
  }

  // MASSAS - BOLO CASEIRO (todas as massas)
  for (const massa of massas) {
    await prisma.produtoMassa.create({
      data: { produtoId: boloCaseiro.id, massaId: massa.id }
    })
  }

  // RECHEIOS E COBERTURAS COM PREÇOS ESPECÍFICOS

  // BOLO NA TAÇA - Recheios conforme cardápio
  const recheiosBoloTaca = [
    { nome: 'Creme de Ninho', precoExtra: 0 },
    { nome: 'Morango', precoExtra: 0 },
    { nome: 'Brigadeiro Preto', precoExtra: 0 },
    { nome: 'Brigadeiro Branco', precoExtra: 0 },
    { nome: 'Mousse de Chocolate', precoExtra: 0 },
    { nome: 'Brigadeiro de Nozes', precoExtra: 0 },
    { nome: 'Nutella', precoExtra: 30 }, // +30,00 conforme cardápio
    { nome: 'Maracujá', precoExtra: 0 },
    { nome: 'Ameixa', precoExtra: 0 },
    { nome: 'Doce de Leite', precoExtra: 0 },
    { nome: 'Abacaxi', precoExtra: 0 },
    { nome: 'Brigadeiro de Limão', precoExtra: 0 },
    { nome: 'Brigadeiro de Paçoca', precoExtra: 0 },
    { nome: 'Beijinho', precoExtra: 0 }
  ]

  for (const recheioData of recheiosBoloTaca) {
    const recheio = recheios.find(r => r.nome === recheioData.nome)
    if (recheio) {
      await prisma.produtoRecheio.create({
        data: { 
          produtoId: boloTaca.id, 
          recheioId: recheio.id,
          precoExtra: recheioData.precoExtra
        }
      })
    }
  }

  // BOLO NA TAÇA - Coberturas conforme cardápio  
  const coberturasBoloTaca = [
    { nome: 'Chantininho', precoExtra: 0 },
    { nome: 'Mousse de Chocolate', precoExtra: 0 },
    { nome: 'Nutella', precoExtra: 20 }, // +20,00 conforme cardápio
    { nome: 'Ganache', precoExtra: 30 }, // +30,00 conforme cardápio
  ]

  for (const coberturaData of coberturasBoloTaca) {
    const cobertura = coberturas.find(c => c.nome === coberturaData.nome)
    if (cobertura) {
      await prisma.produtoCobertura.create({
        data: { 
          produtoId: boloTaca.id, 
          coberturaId: cobertura.id,
          precoExtra: coberturaData.precoExtra
        }
      })
    }
  }

  // BOLO ANIVERSÁRIO - Recheios conforme cardápio (SEM Nutella)
  const recheiosBoloAniversario = [
    { nome: 'Creme de Ninho', precoExtra: 0 },
    { nome: 'Morango', precoExtra: 0 },
    { nome: 'Brigadeiro Preto', precoExtra: 0 },
    { nome: 'Brigadeiro Branco', precoExtra: 0 },
    { nome: 'Mousse de Chocolate', precoExtra: 0 }, // "Mousse de Choc" no cardápio
    { nome: 'Brigadeiro de Nozes', precoExtra: 0 },
    { nome: 'Maracujá', precoExtra: 0 },
    { nome: 'Ameixa', precoExtra: 0 },
    { nome: 'Doce de Leite', precoExtra: 0 },
    { nome: 'Abacaxi', precoExtra: 0 },
    { nome: 'Brigadeiro de Paçoca', precoExtra: 0 },
    { nome: 'Beijinho', precoExtra: 0 }
    // ❌ Nutella não aparece nos recheios do bolo aniversário no cardápio
  ]

  for (const recheioData of recheiosBoloAniversario) {
    const recheio = recheios.find(r => r.nome === recheioData.nome)
    if (recheio) {
      await prisma.produtoRecheio.create({
        data: { 
          produtoId: boloAniversario.id, 
          recheioId: recheio.id,
          precoExtra: recheioData.precoExtra
        }
      })
    }
  }

  // BOLO ANIVERSÁRIO - Coberturas conforme cardápio
  const coberturasBoloAniversario = [
    { nome: 'Chantininho', precoExtra: 0 },
    { nome: 'Mousse', precoExtra: 0 }, // "Mousse" (não "Mousse de Chocolate")
    { nome: 'Nutella', precoExtra: 30 }, // +30,00 conforme cardápio
    { nome: 'Ganache', precoExtra: 40 }, // +40,00 conforme cardápio
  ]

  for (const coberturaData of coberturasBoloAniversario) {
    const cobertura = coberturas.find(c => c.nome === coberturaData.nome)
    if (cobertura) {
      await prisma.produtoCobertura.create({
        data: { 
          produtoId: boloAniversario.id, 
          coberturaId: cobertura.id,
          precoExtra: coberturaData.precoExtra
        }
      })
    }
  }

  // DECORAÇÕES - só para bolo de aniversário
  for (const decoracao of decoracoes) {
    await prisma.produtoDecoracao.create({
      data: { produtoId: boloAniversario.id, decoracaoId: decoracao.id }
    })
  }

  console.log('✅ Seed concluído - CONFORME CARDÁPIO!')
  console.log(`📊 Dados inseridos:`)
  console.log(`   - ${massas.length} massas`)
  console.log(`   - ${recheios.length} recheios`)
  console.log(`   - ${coberturas.length} coberturas`) 
  console.log(`   - ${decoracoes.length} decorações`)
  console.log(`   - Produtos: Bolos e ${sobremesas.length} sobremesas`)
  console.log('')
  console.log('🎯 Preços específicos aplicados:')
  console.log('   🧁 Bolo na Taça:')
  console.log('      - Nutella recheio: +R$ 30')
  console.log('      - Nutella cobertura: +R$ 20')
  console.log('      - Ganache cobertura: +R$ 30')
  console.log('   🎂 Bolo Aniversário:')
  console.log('      - Nutella cobertura: +R$ 30 (sem Nutella nos recheios)')
  console.log('      - Ganache cobertura: +R$ 40')
  console.log('   ❌ Ganache Premium removido das decorações')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })