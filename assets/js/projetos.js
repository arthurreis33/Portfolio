/* =========================================================
   Base de dados dos projetos
   ---------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA
   MEXER NOS PROJETOS ACADÊMICOS.

   As páginas "Projetos" e "Início" se atualizam sozinhas,
   e os botões de filtro são gerados a partir das etiquetas.

   Campos de cada projeto:
     titulo    (obrigatório) — nome do projeto
     periodo   — ex.: "2024.1" ou "Mar/2024 – Jul/2024"
     contexto  — onde foi feito, ex.: "CESAR School · Projetão"
     resumo    (obrigatório) — 1 a 3 frases sobre o projeto
     tags      — lista de tecnologias/temas; viram filtros
     destaque  — true coloca o projeto na vitrine da home
                 (a home mostra no máximo 3)
     capa      — caminho de uma imagem, ex.: "assets/img/projeto.png"
                 (se ficar vazio, o cartão simplesmente não tem
                  imagem e começa pelo nome do projeto)
     links     — lista de { rotulo, url }, ex.: repositório, demo

   A ordem da lista é a ordem que aparece no site — do mais
   recente para o mais antigo.
   ========================================================= */

const PROJETOS = [

  {
    titulo: "Sistema de Análise Preditiva para Otimização da Produção na Piscicultura",
    periodo: "Set/2025 – Jun/2026",
    contexto: "CESAR School · Trabalho de Conclusão de Curso",
    resumo:
      "Plataforma de análise preditiva e otimização para piscicultores, voltada a " +
      "melhorar a produção de peixes com engenharia de dados, machine learning e " +
      "business intelligence. O trabalho cobre a coleta de dados do ambiente de " +
      "cultivo, a modelagem preditiva de eficiência, a escolha das técnicas de " +
      "produção e a otimização do processo produtivo.",
    tags: ["Machine Learning", "Engenharia de Dados", "Business Intelligence"],
    destaque: true,
    capa: "",
    links: []
  },

  {
    titulo: "Stellair",
    periodo: "Fev/2025 – Jun/2025",
    contexto: "CESAR School",
    resumo:
      "Assistente virtual de moda que ajuda o usuário a escolher as melhores peças " +
      "com base na ocasião, no gosto pessoal e nas opções disponíveis no guarda-roupa. " +
      "Usamos algoritmos de clusterização e regressão — K-Means e Random Forest — e " +
      "implementamos um chat virtual com a API da OpenAI.",
    tags: ["Machine Learning", "API da OpenAI"],
    destaque: true,
    capa: "",
    links: []
  },

  {
    titulo: "CarTradeo",
    periodo: "Fev/2023 – Jun/2023",
    contexto: "CESAR School · Fundamentos de Desenvolvimento de Software",
    resumo:
      "Marketplace de carros criado para aproximar vendedores de potenciais " +
      "compradores, onde o usuário podia tanto anunciar quanto comprar veículos. " +
      "A plataforma contava com chat em tempo real para contato direto com o anunciante.",
    tags: ["Django", "Amazon Web Services"],
    destaque: false,
    capa: "",
    links: []
  },

  {
    titulo: "InTrack",
    periodo: "Fev/2023 – Jun/2023",
    contexto: "CESAR School · Hospital das Clínicas de Pernambuco (UFPE)",
    resumo:
      "Solução digital para substituir o papel no registro de frequência e atividades " +
      "dos médicos residentes do Hospital das Clínicas de Pernambuco, resolvendo o mau " +
      "preenchimento e a perda de documentos do processo avaliativo. A plataforma " +
      "também agilizou o feedback dos preceptores aos residentes, contribuindo para a " +
      "melhora dos serviços prestados pelo hospital.",
    tags: ["Gestão de Projetos", "SQLite"],
    destaque: false,
    capa: "",
    links: []
  },

  {
    titulo: "AguaViva",
    periodo: "Ago/2022 – Nov/2022",
    contexto: "CESAR School · Hotel em Maceió-AL",
    resumo:
      "Solução em três fases para reduzir o consumo de água de um hotel: um sensor de " +
      "vazão monitorava o uso em tempo real, o dado era integrado a um banco acessível " +
      "ao gestor por um dashboard — com comparações entre períodos — e, por fim, um " +
      "programa de recompensas premiava hóspedes que consumissem abaixo da média.",
    tags: ["Arduino", "IoT", "Gestão de Projetos"],
    destaque: true,
    capa: "",
    links: []
  }

];

// Disponibiliza a lista para o main.js — não precisa mexer nesta linha.
window.PROJETOS = PROJETOS;
