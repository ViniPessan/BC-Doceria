# 🍰 BC Doceria

**Sua vida mais doce ✨**

Um e-commerce completo para doceria desenvolvido com Next.js, oferecendo uma experiência única para pedidos de bolos, docinhos e sobremesas artesanais.

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748)

## 🌐 Aplicação em Produção

**🔗 Acesse em: https://bc-doceria-atxe7t96i-vinipessans-projects.vercel.app/**

> 💡 **Nota**: O projeto está completo e funcionando perfeitamente. As imagens dos produtos são placeholders temporários - as **fotos profissionais dos produtos** serão adicionadas em breve.

## 📸 Screenshots

<img width="1906" height="884" alt="bc" src="https://github.com/user-attachments/assets/57e442e3-a7e0-445c-a25b-e80b330eb562" />

<img width="1900" height="869" alt="Sem título" src="https://github.com/user-attachments/assets/a8688f35-3c63-4a2a-9acc-57dffe02f356" />

<img width="1900" height="878" alt="Sem título1" src="https://github.com/user-attachments/assets/092bb91a-6f25-4679-9bb1-d92bf6ea95a9" />

<img width="1902" height="879" alt="Sem título2" src="https://github.com/user-attachments/assets/43f03c10-253a-45c1-b1cc-5e7d33a6c983" />

## 🚀 Funcionalidades

### ✨ Para Clientes
- **Catálogo Interativo**: Navegue por bolos, docinhos e sobremesas
- **Personalização Avançada**: Configure tamanhos, sabores, recheios, coberturas e decorações
- **Carrinho Inteligente**: Sistema de carrinho com cálculo automático de preços
- **Checkout Simplificado**: Finalização via WhatsApp com dados organizados
- **Interface Responsiva**: Design adaptado para todos os dispositivos

### 📋 Páginas do Sistema
- **Página Inicial (/)**: Catálogo de bolos (Taça, Aniversário, Caseiro)
- **Docinhos (/docinhos)**: Catálogo completo de docinhos
- **Sobremesas (/sobremesas)**: Catálogo de sobremesas
- **Carrinho (/carrinho)**: Revisão e finalização de pedidos
- **Como Comprar (/comoComprar)**: Guia passo a passo
- **Entrega (/entrega)**: Informações de entrega e retirada  
- **FAQ (/faq)**: Perguntas frequentes
- **Sobre (/sobre)**: História da empresa
- **Política (/politica)**: Política de privacidade
- **Bolos de Aniversário**: Personalizáveis com até 2 recheios, 1 cobertura e 4 decorações
- **Bolos na Taça**: Servidos em porções individuais com 2 recheios e 1 cobertura
- **Bolos Caseiros**: Tradicionais com opções de massa e coberturas variadas
- **Docinhos**: Brigadeiros, beijinhos e especialidades em embalagens de 50 ou 100 unidades
- **Sobremesas**: Tortas, pavês e outras delícias prontas para consumo

### 🎂 Tipos de Produtos
- **Sistema de Validação**: Validação inteligente baseada no tipo de produto
- **Cálculo Dinâmico**: Preços atualizados em tempo real conforme seleções
- **Estado Persistente**: Carrinho mantido durante a sessão
- **Toast Notifications**: Feedback visual para ações do usuário

### 🛠️ Recursos Técnicos

### Frontend
- **[Next.js 15.4.5](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Gerenciamento de estado
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Google Fonts](https://fonts.google.com/)** - Tipografia (Playfair Display, Great Vibes, Dancing Script)

### Backend & Database
- **[Prisma ORM](https://www.prisma.io/)** - ORM para TypeScript e Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Endpoints da API

### Integrações
- **[WhatsApp Business API](https://business.whatsapp.com/)** - Finalização de pedidos
- **[FontAwesome](https://fontawesome.com/)** - Ícones sociais

## 📋 Pré-requisitos

- **Node.js** 18.17 ou superior
- **npm**, **yarn**, **pnpm** ou **bun**
- **PostgreSQL** 12 ou superior

## ⚙️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/ViniPessan/BC-Doceria.git
cd BC-Doceria
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bc_doceria"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Configure o banco de dados
```bash
# Execute as migrations
npx prisma migrate dev

# Popule o banco com dados iniciais
npx prisma db seed
```

### 5. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

## 📊 Estrutura do Banco de Dados

### Principais Tabelas
- **produtos**: Catálogo de produtos (bolos, docinhos, sobremesas)
- **produto_tamanhos**: Tamanhos disponíveis e preços
- **massas/recheios/coberturas/decoracoes**: Opções de personalização
- **carrinhos/itens_carrinho**: Sistema de carrinho de compras
- **pedidos/itens_pedido**: Histórico de pedidos

### Relacionamentos
- Produtos têm múltiplas opções de tamanhos, massas, recheios, coberturas e decorações
- Carrinho relaciona itens com produtos e suas personalizações
- Pedidos armazenam dados completos para rastreamento

## 🗂️ Estrutura do Projeto

```
src/
├── app/                          # App Router (Next.js 15+)
│   ├── components/               # Componentes React reutilizáveis
│   │   ├── birthdayCake/        # Componente bolo de aniversário
│   │   ├── boloCard/            # Card de produto com personalização
│   │   ├── cupCake/             # Componente bolo na taça
│   │   ├── docinhoCard/         # Card específico para docinhos
│   │   ├── footer/              # Rodapé com informações
│   │   ├── header/              # Navegação principal
│   │   ├── homeCake/            # Componente bolo caseiro
│   │   ├── loading/             # Componente de loading
│   │   ├── quantidadeTotal/     # Componente quantidade/preço
│   │   ├── sobremesaCard/       # Card específico para sobremesas
│   │   └── toastCard/           # Componente de notificações
│   ├── carrinho/                # Página do carrinho
│   ├── comoComprar/             # Página como comprar
│   ├── docinhos/                # Catálogo de docinhos
│   ├── entrega/                 # Informações de entrega
│   ├── faq/                     # Perguntas frequentes
│   ├── politica/                # Política de privacidade
│   ├── sobremesas/              # Catálogo de sobremesas
│   ├── sobre/                   # Sobre a empresa
│   ├── api/                     # API Routes
│   │   ├── carrinho/            # Endpoints do carrinho
│   │   ├── pedidos/             # Endpoints de pedidos
│   │   └── produtos/            # Endpoints de produtos
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Página inicial (Bolos)
├── hooks/                       # Custom hooks
│   ├── addToCart.ts             # Hook para adicionar ao carrinho
│   ├── usePedido.ts             # Hook para gerenciar pedidos
│   └── useToast.ts              # Hook para notificações
├── lib/                         # Configurações de bibliotecas
│   └── prisma.ts                # Cliente Prisma
├── providers/                   # Providers do React
│   └── ReduxProvider.tsx        # Provider do Redux
├── services/                    # Serviços de API
│   └── produtoService.ts        # Serviços de produtos
├── store/                       # Redux store
│   ├── index.ts                 # Configuração do store
│   └── slices/                  # Redux slices
│       └── carrinhoSlice.ts     # Slice do carrinho
├── types/                       # Definições TypeScript
│   └── produto/                 # Tipos relacionados a produtos
│       ├── carrinho.ts          # Tipos do carrinho
│       ├── index.ts             # Exports dos tipos
│       ├── produto.ts           # Tipos de produto
│       ├── relacionamento.ts    # Tipos de relacionamentos
│       └── selecoes.ts          # Tipos de seleções
└── utils/                       # Funções utilitárias
    ├── criarItemCarrinho.ts     # Criação de itens do carrinho
    ├── pedido.ts                # Utilitários de pedidos
    ├── preco.ts                 # Cálculos de preço
    ├── tipoBolo.ts              # Identificação de tipos
    ├── toggleItem.ts            # Toggle de seleções
    └── validacoesBolo.ts        # Validações específicas
```

## 🎨 Customização de Estilos

O projeto utiliza Tailwind CSS com configurações personalizadas:

### Fontes
- **Playfair Display**: Títulos e headers elegantes
- **Great Vibes**: Logo e elementos decorativos
- **Dancing Script**: Textos especiais
- **Geist**: Texto padrão (sistema)

### Cores Principais
- **Pink Gradient**: `from-pink-200 via-pink-500 to-pink-700`
- **Background**: Gradientes escuros com transparência
- **Cards**: `from-gray-900 via-black to-gray-900`

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: 320px - 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run db:migrate   # Executar migrations do Prisma
npm run db:seed      # Popular banco com dados iniciais
npm run db:studio    # Abrir Prisma Studio (visualizar dados)
```

## 📦 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras plataformas
- **Railway**: Para banco PostgreSQL
- **PlanetScale**: Alternativa de banco
- **Netlify**: Para deploy estático

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Créditos

- **Desenvolvedor**: [Vinicius Pessan](https://portifoliovpr.netlify.app/)
- **Design**: Interface moderna com foco em UX
- **Inspiração**: Melhores práticas de e-commerce

## 📞 Contato

- **Website**: [BC Doceria](https://bc-doceria-atxe7t96i-vinipessans-projects.vercel.app/)
- **GitHub**: [Repositório](https://github.com/ViniPessan/BC-Doceria)
- **Email**: vini.pessan1@gmail.com
- **WhatsApp**: (18) 99743-1629
