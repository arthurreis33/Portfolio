/* =========================================================
   Portfólio — Arthur Reis
   Comportamentos compartilhados por todas as páginas:
     01. Tema claro/escuro
     02. Menu responsivo
     03. Sombra do cabeçalho ao rolar
     04. Animação de entrada ao rolar
     05. Ano do rodapé
     06. Renderização dos projetos e filtros
     07. Formulário de contato
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 01. Tema claro/escuro ---------- */
  const CHAVE_TEMA = "portfolio-tema";
  const raiz = document.documentElement;

  function aplicarTema(tema) {
    raiz.setAttribute("data-theme", tema);
    const botao = document.querySelector(".theme-toggle");
    if (botao) {
      botao.setAttribute(
        "aria-label",
        tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
      );
    }
  }

  function temaInicial() {
    const salvo = localStorage.getItem(CHAVE_TEMA);
    if (salvo === "dark" || salvo === "light") return salvo;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  aplicarTema(temaInicial());

  document.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".theme-toggle");
    if (!botao) return;
    const novo =
      raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
    aplicarTema(novo);
    localStorage.setItem(CHAVE_TEMA, novo);
  });

  /* ---------- 02. Menu responsivo ---------- */
  const alternadorMenu = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");

  if (alternadorMenu && menu) {
    alternadorMenu.addEventListener("click", function () {
      const aberto = menu.classList.toggle("is-open");
      alternadorMenu.setAttribute("aria-expanded", String(aberto));
    });

    // Fecha ao clicar em um link ou ao apertar Esc.
    menu.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) {
        menu.classList.remove("is-open");
        alternadorMenu.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        alternadorMenu.setAttribute("aria-expanded", "false");
        alternadorMenu.focus();
      }
    });
  }

  /* ---------- 03. Sombra do cabeçalho ao rolar ---------- */
  const cabecalho = document.querySelector(".site-header");

  if (cabecalho) {
    const atualizarCabecalho = function () {
      cabecalho.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    atualizarCabecalho();
    window.addEventListener("scroll", atualizarCabecalho, { passive: true });
  }

  /* ---------- 04. Animação de entrada ao rolar ---------- */
  function observarEntrada() {
    const alvos = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!alvos.length) return;

    const semMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (semMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    alvos.forEach(function (alvo, indice) {
      // Escalona levemente os elementos vizinhos, criando cascata.
      alvo.style.transitionDelay = Math.min(indice % 6, 5) * 70 + "ms";
      observador.observe(alvo);
    });
  }

  observarEntrada();

  /* ---------- 05. Ano do rodapé ---------- */
  document.querySelectorAll("[data-ano]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- 06. Projetos ---------- */
  const lista = Array.isArray(window.PROJETOS) ? window.PROJETOS : [];

  function escapar(texto) {
    const div = document.createElement("div");
    div.textContent = texto == null ? "" : String(texto);
    return div.innerHTML;
  }

  function montarCartao(projeto) {
    const tags = (projeto.tags || [])
      .map((tag) => `<li class="tag">${escapar(tag)}</li>`)
      .join("");

    const links = (projeto.links || [])
      .map(
        (link) =>
          `<a href="${escapar(link.url)}" target="_blank" rel="noopener noreferrer">
             ${escapar(link.rotulo)}
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M7 17 17 7M9 7h8v8"/>
             </svg>
           </a>`
      )
      .join("");

    // A capa só existe quando há uma imagem de verdade; sem ela o cartão
    // começa direto pelo nome do projeto.
    const capa = projeto.capa
      ? `<div class="project__cover">
           <img src="${escapar(projeto.capa)}" alt="Capa do projeto ${escapar(
             projeto.titulo
           )}" loading="lazy">
         </div>`
      : "";

    const meta = [projeto.contexto, projeto.periodo]
      .filter(Boolean)
      .map(escapar)
      .join(" · ");

    return `
      <li class="card project reveal">
        ${capa}
        <div class="project__body">
          ${meta ? `<p class="project__meta">${meta}</p>` : ""}
          <h3 class="project__title">${escapar(projeto.titulo)}</h3>
          <p class="project__desc">${escapar(projeto.resumo)}</p>
          ${tags ? `<ul class="tag-list">${tags}</ul>` : ""}
          ${links ? `<div class="project__links">${links}</div>` : ""}
        </div>
      </li>`;
  }

  function montarEspacoReservado(numero) {
    return `
      <li class="card project project--slot reveal">
        <div class="project__body">
          <p class="project__meta">Espaço reservado ${numero}</p>
          <h3 class="project__title">Projeto a publicar</h3>
          <p class="project__desc">
            Este espaço já está pronto para receber um projeto acadêmico.
            Preencha o arquivo <code>assets/js/projetos.js</code> e o cartão
            aparece aqui automaticamente.
          </p>
        </div>
      </li>`;
  }

  // Vitrine da página inicial: até 3 projetos em destaque.
  const vitrine = document.querySelector("[data-projetos-destaque]");
  if (vitrine) {
    const destaques = lista.filter((p) => p.destaque);
    const selecionados = (destaques.length ? destaques : lista).slice(0, 3);

    vitrine.innerHTML = selecionados.length
      ? selecionados.map(montarCartao).join("")
      : [1, 2, 3].map(montarEspacoReservado).join("");
  }

  // Página de projetos: grade completa.
  const grade = document.querySelector("[data-projetos]");
  if (grade) {
    grade.innerHTML = lista.length
      ? lista.map(montarCartao).join("")
      : [1, 2, 3, 4].map(montarEspacoReservado).join("");

    observarEntrada();
  }

  if (vitrine) observarEntrada();

  /* ---------- 07. Formulário de contato ---------- */
  const formulario = document.querySelector("[data-form-contato]");

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const dados = new FormData(formulario);
      const nome = (dados.get("nome") || "").toString().trim();
      const email = (dados.get("email") || "").toString().trim();
      const assunto = (dados.get("assunto") || "Contato pelo portfólio")
        .toString()
        .trim();
      const mensagem = (dados.get("mensagem") || "").toString().trim();

      const corpo = `${mensagem}\n\n—\n${nome}\n${email}`;
      const destino = formulario.dataset.formContato;

      // Site estático: abre o cliente de e-mail já preenchido.
      window.location.href =
        `mailto:${destino}?subject=${encodeURIComponent(assunto)}` +
        `&body=${encodeURIComponent(corpo)}`;

      const aviso = formulario.querySelector("[data-form-status]");
      if (aviso) {
        aviso.textContent =
          "Abrimos seu aplicativo de e-mail com a mensagem pronta. Se nada acontecer, escreva direto para " +
          destino + ".";
      }
    });
  }
})();
