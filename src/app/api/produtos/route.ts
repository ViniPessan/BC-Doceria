import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/produtos - Buscar todos os produtos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get('categoria') // ?categoria=BOLO_ANIVERSARIO

    const produtos = await prisma.produto.findMany({
      where: categoria ? {
        categoria: categoria as any,
        ativo: true
      } : {
        ativo: true
      },
      include: {
        tamanhos: true,
        recheios: {
          include: {
            recheio: true
          }
        },
        coberturas: {
          include: {
            cobertura: true
          }
        },
        decoracoes: {
          include: {
            decoracao: true
          }
        }
      },
      orderBy: {
        nome: 'asc'
      }
    })

    return NextResponse.json(produtos)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/produtos - Criar novo produto (para futuro painel admin)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const produto = await prisma.produto.create({
      data: {
        nome: body.nome,
        descricao: body.descricao,
        categoria: body.categoria,
        preco: body.preco,
        imagem: body.imagem,
      }
    })

    return NextResponse.json(produto, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}