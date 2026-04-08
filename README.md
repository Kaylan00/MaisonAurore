# Maison Aurore — Luxury Boutique Hotel

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=fff)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=000)

Site de um hotel boutique de luxo fictício localizado na Riviera Francesa, Cannes.

## Preview

🔗 [Repositório](https://github.com/Kaylan00/MaisonAurore)

## Stack

- **React 19** — UI components
- **Vite** — Build tool
- **SCSS Modules** — Styling com variáveis e mixins globais
- **GSAP + ScrollTrigger** — Animações no scroll
- **Swiper** — Carrosséis
- **React Router** — Navegação SPA
- **date-fns** — Manipulação de datas

## Páginas

| Página | Descrição |
|--------|-----------|
| **Home** | Hero com slideshow, seções de destaque, testimonials, galeria, newsletter |
| **Rooms & Suites** | Listagem com filtros por categoria (Room / Suite / Villa) |
| **Room Detail** | Galeria de imagens, amenidades, quartos similares |
| **Dining** | 3 restaurantes com layout alternado |
| **Spa & Wellness** | Tratamentos com filtro por categoria, facilities |
| **Experiences** | 5 experiências com filtros por tipo |
| **Gallery** | Grid masonry com lightbox e filtros |
| **Booking** | Fluxo completo em 3 etapas (datas → dados → confirmação) |

## Features

- Preloader animado com logo
- Navbar transparente → sólida no scroll
- Booking widget com seletor de datas, adultos e crianças
- Animações GSAP no scroll (fade-up, slide, reveal, parallax)
- Disponibilidade mockada com pricing sazonal
- Lightbox na galeria com navegação por teclado
- Menu mobile fullscreen
- 100% responsivo

## Rodando localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

## Paleta de cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Navy | `#1b1b2f` | Backgrounds escuros, texto |
| Champagne | `#b5a08a` | Acentos, labels, CTAs |
| Creme | `#f7f3ed` | Background principal |
| Branco | `#ffffff` | Cards, texto sobre escuro |

## Tipografia

- **Playfair Display** — Títulos
- **Cormorant Garamond** — Destaques em itálico
- **Inter** — Corpo de texto

## Estrutura

```
src/
├── components/     # Navbar, Footer, BookingBar, Logo, etc.
├── data/           # Dados mockados do hotel
├── pages/          # Home, Rooms, Dining, Spa, etc.
└── styles/         # Variáveis, mixins e estilos globais
```
