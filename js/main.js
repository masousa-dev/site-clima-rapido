/* =========================================================
   Clima Rápido — comportamentos da página
   1. Menu fixo que muda de cor ao rolar
   2. Menu hambúrguer no celular
   3. Link do menu marcado conforme a seção visível
   4. Animação de entrada dos blocos
   5. Formulário que monta a mensagem e abre o WhatsApp
   6. Ano do rodapé automático
   ========================================================= */

// Número usado em todos os links de WhatsApp (formato internacional, só dígitos)
const WHATSAPP = "551136283575";

document.addEventListener("DOMContentLoaded", () => {

  /* ---- 1. Cabeçalho: ganha fundo branco depois de rolar um pouco ---- */
  const header = document.getElementById("header");
  const aoRolar = () => header.classList.toggle("is-stuck", window.scrollY > 40);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  /* ---- 2. Menu hambúrguer ---- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  const fecharMenu = () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", () => {
    const aberto = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", aberto);
    burger.setAttribute("aria-expanded", String(aberto));
  });

  // Clicar em um link ou apertar Esc fecha a gaveta
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });

  /* ---- 3. Marca no menu a seção que está na tela ---- */
  const secoes = [...document.querySelectorAll("main section[id]")];
  const links = new Map(
    [...nav.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a])
  );

  const observadorMenu = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const link = links.get(entrada.target.id);
        if (link && entrada.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  secoes.forEach((s) => observadorMenu.observe(s));

  /* ---- 4. Blocos aparecem suavemente ao entrar na tela ---- */
  const observadorReveal = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("is-visible");
        obs.unobserve(entrada.target); // anima só uma vez
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 80}ms`; // efeito cascata leve
    observadorReveal.observe(el);
  });

  /* ---- 5. Formulário -> WhatsApp (sem back-end, sem custo) ---- */
  const form = document.getElementById("form-orcamento");
  const aviso = document.getElementById("form-note");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("f-nome");
    const servico = document.getElementById("f-servico");
    const local = document.getElementById("f-local");
    const detalhes = document.getElementById("f-detalhes");

    // Validação simples: nome e serviço são obrigatórios
    let ok = true;
    [nome, servico].forEach((campo) => {
      const vazio = !campo.value.trim();
      campo.closest(".field").classList.toggle("has-error", vazio);
      if (vazio) ok = false;
    });

    if (!ok) {
      aviso.textContent = "Preencha o nome e escolha o serviço para continuar.";
      aviso.classList.add("is-error");
      (!nome.value.trim() ? nome : servico).focus();
      return;
    }

    aviso.textContent = "Abrindo o WhatsApp com a sua mensagem…";
    aviso.classList.remove("is-error");

    // Monta a mensagem linha por linha
    const linhas = [
      `Olá, Clima Rápido! Meu nome é ${nome.value.trim()}.`,
      `Serviço: ${servico.value}`,
    ];
    if (local.value.trim()) linhas.push(`Local: ${local.value.trim()}`);
    if (detalhes.value.trim()) linhas.push(`Detalhes: ${detalhes.value.trim()}`);
    linhas.push("Pode me passar um orçamento?");

    const texto = encodeURIComponent(linhas.join("\n"));
    window.open(`https://wa.me/${WHATSAPP}?text=${texto}`, "_blank", "noopener");
  });

  // Ao digitar, tira o destaque de erro do campo
  form.querySelectorAll("input, select, textarea").forEach((campo) => {
    campo.addEventListener("input", () => campo.closest(".field").classList.remove("has-error"));
  });

  /* ---- 6. Quando o botão flutuante do WhatsApp aparece ----
     Ele fica escondido enquanto estiver na tela alguma área que já oferece
     contato, para não repetir o mesmo botão duas vezes:
       - o hero, que tem o "Pedir orçamento agora"
       - a seção de contato, que tem o formulário
       - o rodapé, que lista telefone e e-mail
     Guardamos num Set quais dessas áreas estão visíveis agora. Se o Set
     tiver alguma coisa, o botão some; quando esvazia, ele volta. */
  const whats = document.querySelector(".whats");
  const areasDeContato = [
    document.querySelector(".hero"),
    document.getElementById("contato"),
    document.querySelector(".footer")
  ].filter(Boolean);

  if (whats && areasDeContato.length) {
    const visiveis = new Set();

    const observadorWhats = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) visiveis.add(entrada.target);
          else visiveis.delete(entrada.target);
        });
        whats.classList.toggle("is-hidden", visiveis.size > 0);
      },
      { threshold: 0 }
    );

    whats.classList.add("is-hidden");
    areasDeContato.forEach((area) => observadorWhats.observe(area));
  }

  /* ---- 7. Ano do rodapé sempre atualizado ---- */
  document.getElementById("ano").textContent = new Date().getFullYear();
});
