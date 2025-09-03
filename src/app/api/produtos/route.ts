import prisma from "@/lib/prisma";
import { Categoria } from "@prisma/client";
import { NextResponse } from "next/server";


// GET /api/produtos - Buscar todos os produtos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get('categoria') // ?categoria=BOLO_ANIVERSARIO

    // Validar se a categoria existe no enum
    const whereClause = categoria && Object.values(Categoria).includes(categoria as Categoria)
      ? {
          categoria: categoria as Categoria,
          ativo: true
        }
      : {
          ativo: true
        }

    const produtos = await prisma.produto.findMany({
      where: whereClause,
      include: {
        tamanhos: true,
        massas: {              // NOVO: Incluir massas
          include: {
            massa: true
          }
        },
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

    console.log(`Buscando produtos com categoria: ${categoria}`)
    console.log(`Produtos encontrados: ${produtos.length}`)
    
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