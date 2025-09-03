import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const CARRINHO_COOKIE = "carrinhoId";

// Adicionar item ao carrinho ou criar novo
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      produtoId,
      quantidade,
      tamanho,
      massa,
      recheios,
      cobertura,
      decoracoes,
      preco
    } = body;

    const carrinhoId = req.cookies.get(CARRINHO_COOKIE)?.value;

    let carrinho;

    if (carrinhoId) {
      // Adicionar item ao carrinho existente
      carrinho = await prisma.carrinho.update({
        where: { id: carrinhoId },
        data: {
          itens: {
            create: {
              produtoId,
              quantidade,
              tamanho,
              massa,
              preco,
              recheios: recheios || [],
              cobertura: cobertura || undefined,
              decoracoes: decoracoes || [],
            }
          }
        },
        include: { itens: true }
      });
    } else {
      // Criar novo carrinho se não houver
      carrinho = await prisma.carrinho.create({
        data: {
          itens: {
            create: {
              produtoId,
              quantidade,
              tamanho,
              massa,
              preco,
              recheios: recheios || [],
              cobertura: cobertura || undefined,
              decoracoes: decoracoes || [],
            }
          }
        },
        include: { itens: true }
      });
    }

    const response = NextResponse.json(carrinho, { status: 201 });

    // Setar cookie de sessão se carrinho for novo
    if (!carrinhoId) {
      response.cookies.set(CARRINHO_COOKIE, carrinho.id, {
        httpOnly: true,
        path: "/", // válido para todo site
        // sem maxAge => expira quando fechar o navegador
      });
    }

    return response;

  } catch (err) {
    console.error("Erro ao adicionar ao carrinho:", err);
    return NextResponse.json(
      { error: "Não foi possível adicionar ao carrinho" },
      { status: 500 }
    );
  }
}

// Buscar carrinho atual
export async function GET(req: NextRequest) {
  try {
    const carrinhoId = req.cookies.get(CARRINHO_COOKIE)?.value;

    if (!carrinhoId) {
      return NextResponse.json({ itens: [] });
    }

    const carrinho = await prisma.carrinho.findUnique({
      where: { id: carrinhoId },
      include: {
        itens: {
          include: {
            produto: true, // detalhes do produto
          }
        }
      }
    });

    if (!carrinho) {
      return NextResponse.json({ itens: [] });
    }

    return NextResponse.json(carrinho);

  } catch (err) {
    console.error("Erro ao buscar carrinho:", err);
    return NextResponse.json(
      { error: "Não foi possível buscar o carrinho" },
      { status: 500 }
    );
  }
}
