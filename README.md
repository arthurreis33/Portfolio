# Portfólio — Arthur Aragão Reis de Souza

Site estático em HTML, CSS e JavaScript puro. Sem build, sem dependências:
basta abrir o `index.html` no navegador.

## Estrutura

```
.
├── index.html          Home: apresentação, o que faço, trajetória, projetos em destaque
├── sobre.html          Resumo, formação (CESAR School), hard/soft skills, idiomas
├── experiencia.html    Visagio e Skanboo detalhados em linha do tempo
├── projetos.html       Grade dos projetos acadêmicos
├── contato.html        E-mail, LinkedIn, telefone e formulário
└── assets/
    ├── css/style.css   Folha de estilo única (temas claro e escuro)
    └── js/
        ├── projetos.js ← ÚNICO arquivo a editar para adicionar projetos
        └── main.js     Tema, menu, animações e renderização dos projetos
```

## Como adicionar um projeto

Abra `assets/js/projetos.js` e acrescente um objeto à lista `PROJETOS`:

```js
{
  titulo: "Sistema de recomendação de rotas",
  periodo: "2025.1",
  contexto: "CESAR School · Projetão",
  resumo: "Duas ou três frases sobre o problema, o que foi construído e o resultado.",
  tags: ["Python", "SQL"],
  destaque: true,
  capa: "assets/img/rotas.png",
  links: [
    { rotulo: "Repositório", url: "https://github.com/..." }
  ]
}
```

O que acontece sozinho depois disso:

- o cartão aparece em `projetos.html`;
- `destaque: true` também o coloca na vitrine da home (máximo de 3);
- as `tags` viram as etiquetas exibidas no rodapé do cartão;
- sem `capa`, o cartão fica só com texto, começando pelo nome do projeto.

Imagens de capa: coloque em `assets/img/` (crie a pasta) e use o caminho relativo.
Proporção recomendada 16:9, algo como 800×450px.

## Como publicar

Qualquer hospedagem de site estático serve. As duas mais simples:

- **Netlify Drop** — acesse `app.netlify.com/drop` e arraste a pasta do projeto.
  Sai no ar em segundos, com endereço gratuito.
- **GitHub Pages** — suba a pasta para um repositório e ative Pages nas configurações,
  apontando para a branch `main` e a raiz (`/`).

## Detalhes de implementação

- **Tema claro/escuro**: alternado pelo botão no cabeçalho, salvo em `localStorage`.
  Na primeira visita, segue a preferência do sistema operacional.
- **Formulário de contato**: sendo um site estático, o envio abre o aplicativo de
  e-mail já preenchido (`mailto:`). Nada é armazenado nem enviado a terceiros.
  Para receber mensagens direto no site, dá para plugar Formspree ou Netlify Forms
  depois.
- **Acessibilidade**: link "pular para o conteúdo", navegação por teclado,
  `aria-current` na página ativa e respeito a `prefers-reduced-motion`.
- **Responsivo**: menu vira gaveta abaixo de 780px de largura.
