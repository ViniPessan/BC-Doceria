import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { FormaPagamento, TipoPedido, StatusPedido } from "@prisma/client";

// Função para transformar pedido em formato limpo
function transformarPedido(pedido: any) {
  return {
    id: pedido.id,
    nomeCliente: pedido.nomeCliente,
    telefone: pedido.telefone,
    endereco: pedido.endereco,
    tipoPedido: pedido.tipoPedido,
    formaPagamento: pedido.formaPagamento,
    valorTotal: pedido.valorTotal,
    status: pedido.status,
    observacoes: pedido.observacoes,
    createdAt: pedido.createdAt,
    updatedAt: pedido.updatedAt,
    itens: pedido.itens.map((item: any) => ({
      id: item.id,
      produtoId: item.produtoId,
      nomeProduto: item.produto.nome,        // ← Nome direto no item
      categoria: item.produto.categoria,
      imagem: item.produto.imagem,
      quantidade: item.quantidade,
      preco: item.preco,
      tamanho: item.tamanho,
      massa: item.massa,
      recheios: item.recheios,
      cobertura: item.cobertura,
      decoracoes: item.decoracoes
    }))
  };
}

// Criar novo pedido
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      nomeCliente,
      endereco,
      tipoPedido,
      formaPagamento,
      valorTotal,
      observacoes,
      itens
    } = body;

    // Validações básicas
    if (!nomeCliente || !tipoPedido || !formaPagamento || !valorTotal || !itens || itens.length === 0) {
      return NextResponse.json(
        { error: "Dados obrigatórios não fornecidos" },
        { status: 400 }
      );
    }

    // Mapear strings para enums corretos
    const mapFormaPagamento = (forma: string): FormaPagamento => {
      const map: Record<string, FormaPagamento> = {
        'Dinheiro': 'DINHEIRO',
        'Pix': 'PIX',
        'Cartão': 'CARTAO',
        'DINHEIRO': 'DINHEIRO',
        'PIX': 'PIX',
        'CARTAO': 'CARTAO'
      };
      return map[forma] || 'DINHEIRO';
    };

    const mapTipoPedido = (tipo: string): TipoPedido => {
      const map: Record<string, TipoPedido> = {
        'entrega': 'ENTREGA',
        'retirada': 'RETIRADA',
        'ENTREGA': 'ENTREGA',
        'RETIRADA': 'RETIRADA'
      };
      return map[tipo] || 'RETIRADA';
    };

    // Criar pedido no banco
    const novoPedido = await prisma.pedido.create({
      data: {
        nomeCliente,
        endereco: endereco || null,
        tipoPedido: mapTipoPedido(tipoPedido),
        formaPagamento: mapFormaPagamento(formaPagamento),
        valorTotal,
        observacoes: observacoes || null,
        status: StatusPedido.PENDENTE,
        itens: {
          create: itens.map((item: any) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            preco: item.preco,
            tamanho: item.tamanho || null,
            massa: item.massa || null,
            recheios: item.recheios || [],
            cobertura: item.cobertura || null,
            decoracoes: item.decoracoes || [],
          }))
        }
      },
      include: {
        itens: {
          include: {
            produto: {
              select: {
                id: true,
                nome: true,
                categoria: true,
                imagem: true
              }
            }
          }
        }
      }
    });

    // Retornar pedido transformado
    const pedidoLimpo = transformarPedido(novoPedido);
    return NextResponse.json(pedidoLimpo, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao criar pedido" },
      { status: 500 }
    );
  }
}

// Buscar pedidos (para futuro painel admin)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    const whereClause = status ? { status: status as any } : {};

    const pedidos = await prisma.pedido.findMany({
      where: whereClause,
      include: {
        itens: {
          include: {
            produto: {
              select: {
                id: true,
                nome: true,
                categoria: true,
                imagem: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transformar todos os pedidos
    const pedidosLimpos = pedidos.map(transformarPedido);
    return NextResponse.json(pedidosLimpos);

  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao buscar pedidos" },
      { status: 500 }
    );
  }
}