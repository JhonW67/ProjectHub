
# ProjectHub - Plataforma de Gerenciamento de Projetos de Estudantes da UNIVAG

## 📖 Sobre o Projeto

O ProjectHub é uma aplicação web abrangente desenvolvida para a UNIVAG (Universidade de Várzea Grande) com o objetivo de facilitar o gerenciamento, apresentação e avaliação de projetos estudantis. A plataforma funciona como um hub centralizado onde estudantes podem exibir seus trabalhos, professores podem avaliar projetos e a instituição pode organizar eventos relacionados a projetos.

O sistema busca aumentar a visibilidade dos trabalhos dos alunos, otimizar os processos de avaliação de projetos e criar um portfólio digital dos feitos acadêmicos dentro do ambiente universitário.

## 🚀 Principais Funcionalidades

### Para Estudantes:
- Criar e gerenciar perfis de projetos com descrições detalhadas
- Fazer upload de documentação e recursos do projeto
- Colaborar com membros da equipe em grupos
- Receber feedback e avaliações dos professores
- Exibir seus trabalhos para a comunidade universitária

### Para Professores:
- Avaliar projetos de alunos com critérios padronizados
- Fornecer feedback às equipes de estudantes
- Visualizar dados completos sobre o desempenho dos alunos
- Acompanhar a progressão dos projetos ao longo dos semestres

### Para Administradores:
- Criar e gerenciar eventos (feiras, exposições, competições)
- Monitorar a qualidade geral dos projetos entre departamentos
- Gerar relatórios sobre métricas de desempenho dos projetos
- Gerenciar contas de usuários e permissões

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React.js (com TypeScript)
  - Tailwind CSS para estilização
  - Biblioteca de componentes shadcn/ui
  - React Router para navegação
  - Lucide Icons para elementos visuais
  - React Query para busca de dados

- **Ferramentas de Build**:
  - Vite para desenvolvimento rápido e builds otimizadas
  - TypeScript para segurança de tipos e melhor experiência de desenvolvimento

## 🏗️ Arquitetura do Projeto

A aplicação segue uma arquitetura baseada em componentes, com foco em reusabilidade e manutenção:

- **Páginas**: Componentes principais das rotas que compõem as visualizações da aplicação
- **Componentes**: Elementos de interface reutilizáveis, organizados por funcionalidade
- **Hooks**: Hooks personalizados do React para lógica compartilhada
- **Lib**: Funções utilitárias, manipulação de dados e lógica de negócios
- **Types**: Definições de tipos TypeScript para a aplicação

## 💼 Regras de Negócio

### Projetos
- Cada projeto deve estar associado a um grupo de estudantes
- Projetos devem ser submetidos para um evento específico
- Projetos requerem título, descrição e podem incluir documentação adicional
- Projetos podem receber avaliações de múltiplos professores
- Projetos podem receber feedback de qualquer usuário do sistema

### Grupos
- Grupos devem ter pelo menos um estudante
- Grupos estão associados a um curso e semestre específicos
- Cada grupo pode ter apenas um projeto ativo por vez
- Membros do grupo têm acesso igual ao gerenciamento do projeto

### Eventos
- Eventos possuem datas de início e fim, temas e locais
- Eventos podem estar ativos (futuros/em andamento) ou inativos (passados)
- Eventos são organizados por semestre (ex.: 2025.1, 2024.2)
- Cada evento tem um tema específico que orienta o foco dos projetos

### Avaliações
- Apenas professores podem criar avaliações
- Avaliações incluem notas em múltiplos critérios (inovação, execução, apresentação, impacto)
- Avaliações incluem feedback qualitativo além das pontuações numéricas
- Professores só podem avaliar cada projeto uma vez

### Usuários
- Usuários podem ser estudantes, professores ou administradores
- Estudantes pertencem a um curso e semestre específicos
- Professores são associados a cursos e turmas que lecionam
- Permissões variam conforme o papel do usuário no sistema

## 🚦 Como Começar

### Pré-requisitos
- Node.js e npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Instalação

```sh
# Clonar o repositório
git clone https://github.com/JhonW67/ProjectHub.git

# Navegar até o diretório do projeto
cd univag-project-showcase

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## 🔮 Melhorias Futuras

- Integração de autenticação de usuários
- Notificações em tempo real para feedback e avaliações
- Painel de análise avançada para relatórios institucionais
- Aplicativo móvel para acesso em movimento
- Integração com o sistema de gerenciamento de aprendizado (LMS) da universidade
- Geração de QR codes para exibições em eventos presenciais

## 📄 Licença

Este projeto tem fins educacionais e é destinado ao uso dentro da UNIVAG.

---

Desenvolvido com ❤️ para os projetos estudantis da UNIVAG
