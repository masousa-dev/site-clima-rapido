# Site Clima Rápido

Site de uma página (landing page) para divulgar o serviço de ar condicionado.
HTML + CSS + JavaScript puros — sem instalação, sem servidor, sem custo de hospedagem.

## Como abrir

Dê dois cliques em `index.html`. Pronto, abre no navegador.

## Arquivos

```
site-clima-rapido/
├─ index.html        ← todo o conteúdo e os textos
├─ css/styles.css    ← todo o visual (cores, espaçamento, responsivo)
├─ js/main.js        ← menu, animações e o formulário que abre o WhatsApp
├─ img/              ← imagens (favicon já está aqui)
└─ README.md         ← este arquivo
```

## Imagens

Os originais que você enviou continuam na pasta `img/` e não foram alterados.
Como eles somavam 1,8 MB (pesado demais para celular), o site usa versões
reduzidas geradas a partir deles:

| Arquivo usado no site   | Vem de                                    | Onde aparece                  |
|-------------------------|-------------------------------------------|-------------------------------|
| `logo-horizontal.png`   | `clima_rapido_logo_fundo_tranparente.png` | cabeçalho e rodapé            |
| `simbolo.png`           | `simbolo_fundo_transparente.png`          | marca d'água atrás do topo    |
| `favicon.png`           | `simbolo_fundo_transparente.png`          | aba do navegador              |
| `apple-touch-icon.png`  | `clima_rapido_logo.png`                   | atalho na tela do celular     |
| `og-clima-rapido.jpg`   | `clima_rapido_logo_fundo_tranparente.png` | prévia ao compartilhar o link |

Se a logo mudar, regere essas versões (ou me peça) em vez de trocar só o original.

## O que precisa ser trocado antes de publicar

Procure por `AJUSTAR` no `index.html` — marquei cada ponto. Em resumo:

1. **Foto da equipe** → salve como `img/equipe.jpg` (recomendado: 1200×800px).
   Enquanto não existir, aparece um aviso pontilhado no lugar.
2. **Bairros/cidades atendidas** (seção de dúvidas) → listar ajuda muito a aparecer no Google.
3. ~~CNPJ~~ → já está no rodapé e nos dados estruturados (`taxID`).
4. **Depoimentos**: não inventei nenhum. Quando tiver avaliações reais de clientes,
   vale muito criar uma seção com elas.

## Avaliações do Google

A seção "Avaliações" usa dados **reais**, tirados da ficha da empresa no Google
em 24/09/2026:

- Nota **4,9** com **134 avaliações**
- Duas avaliações de 5 estrelas (Octávio Turra e Ricardo Poloni)
- Os três trechos em destaque são os que o próprio Google extrai no resumo

Tudo isso está escrito direto no `index.html`, na seção `id="avaliacoes"`.
Quando a nota ou o total mudarem, atualize nesses dois lugares:

1. O painel da nota: `4,9` e `134 avaliações no Google`
2. A linha embaixo do título: "Nota 4,9 em 134 avaliações..."

O link "Ver todas no Google" aponta para `google.com/maps?cid=12477103190460536535`,
que é o endereço permanente da ficha (não quebra se o nome ou o endereço mudarem).

**Por que não usei um widget que atualiza sozinho:** para puxar as avaliações
automaticamente é preciso a API do Google Places, que exige cartão cadastrado e
cobra por uso. Como o combinado é custo zero, as avaliações ficam fixas no HTML.

**Por que não marquei a nota nos dados estruturados:** o Google proíbe marcar
com `aggregateRating` avaliações que vieram do próprio Google. Isso pode gerar
punição no buscador. A nota aparece visualmente para quem visita, e só.

## Dados que já estão no site

- Telefone / WhatsApp: (11) 3628-3575
- E-mail: atendimento@climarapido.com.br
- Instagram: @climarapido
- Endereço: R. Vianópolis, 191 — Vila Maria, São Paulo/SP, 02131-050
- Região: São Paulo, capital e região
- Desde 2010
- CNPJ: 15.674.949/0001-44 (rodapé e `taxID` nos dados estruturados)

- Horário: seg. a sex., 8h às 18h (sáb. e dom. fechado), conferido no Google em 27/09/2026.
  Aparece na seção de contato, no rodapé e nos dados estruturados (`openingHoursSpecification`).

Se algum desses mudar, o telefone aparece em vários lugares: procure por `3628-3575`
no `index.html` e por `WHATSAPP` no `js/main.js`.

## Como publicar de graça

Qualquer uma das duas opções, sem pagar nada:

- **Netlify Drop**: acesse `app.netlify.com/drop` e arraste a pasta do site. Sai um link na hora.
- **GitHub Pages**: crie um repositório, suba os arquivos e ative Pages em Settings → Pages.

Depois basta apontar o domínio `climarapido.com.br` para o endereço gerado —
o domínio já é da empresa, então não há custo novo.
