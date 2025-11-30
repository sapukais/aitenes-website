# Frontend Design Skill

> Skill para crear interfaces frontend distintivas, evitando la estética genérica de IA.

## Cuándo usar este skill

Usa este skill cuando trabajes en:
- Crear landing pages o páginas web
- Diseñar componentes UI/UX
- Desarrollar interfaces React, Vue, HTML/CSS
- Estilizar aplicaciones web
- Crear dashboards o paneles administrativos

## El problema: Convergencia Distribucional

Los modelos de lenguaje tienden a generar diseños genéricos porque predicen tokens basados en patrones estadísticos de datos de entrenamiento. Los diseños "seguros" que funcionan universalmente dominan la web. Sin dirección específica, Claude muestrea desde este centro de alta probabilidad, resultando en:
- Fuentes Inter/Roboto
- Gradientes morados sobre fondos blancos
- Animaciones mínimas
- Layouts predecibles

## Guía de Diseño Frontend

<frontend_aesthetics>
Tiendes a converger hacia outputs genéricos "en distribución". En diseño frontend, esto crea la estética "AI slop". Evita esto: crea frontends creativos y distintivos que sorprendan y deleiten.

### Tipografía

La tipografía señala calidad instantáneamente. Evita fuentes genéricas aburridas.

**NUNCA uses:** Inter, Roboto, Open Sans, Lato, Arial, fuentes del sistema por defecto

**Opciones impactantes recomendadas:**
- Estética código: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro, Newsreader
- Técnico: IBM Plex family, Source Sans 3
- Distintivo: Bricolage Grotesque, Syne, Outfit, Clash Display

**Principio de emparejamiento:** Alto contraste = interesante
- Display + monospace
- Serif + geometric sans
- Variable font con pesos extremos

**Usa extremos:** Pesos 100/200 vs 800/900, no 400 vs 600. Saltos de tamaño 3x+, no 1.5x.

Escoge UNA fuente distintiva y úsala decisivamente. Carga desde Google Fonts.

### Color y Tema

Comprométete con una estética cohesiva. Usa CSS variables para consistencia.

**Principios:**
- Colores dominantes con acentos marcados superan paletas tímidas y distribuidas uniformemente
- Inspírate en temas de IDE (Dracula, Nord, Monokai, Catppuccin) y estéticas culturales
- Evita esquemas cliché (gradientes morados sobre blanco)

**Variables CSS ejemplo:**
```css
:root {
  --color-primary: #0ff;      /* Acento vibrante */
  --color-secondary: #1a1a2e; /* Base profunda */
  --color-accent: #e94560;    /* Contraste */
  --color-text: #eaeaea;
  --color-surface: #16213e;
}
```

### Movimiento y Animaciones

Las animaciones añaden pulido que los diseños estáticos carecen.

**Prioriza:**
- Soluciones CSS-only para HTML puro
- Motion library para React cuando esté disponible
- Un page load bien orquestado con reveals escalonados (animation-delay)

**Momentos de alto impacto:**
```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.fade-in:nth-child(1) { animation-delay: 0.1s; }
.fade-in:nth-child(2) { animation-delay: 0.2s; }
.fade-in:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Micro-interacciones efectivas:**
- Hover states con transiciones suaves (200-300ms)
- Efectos ripple en botones
- Scale feedback en elementos interactivos
- Shimmer effects en loading states

### Fondos y Atmósfera

Crea atmósfera y profundidad en lugar de defaultear a colores sólidos.

**Técnicas:**
- Capas de gradientes CSS
- Patrones geométricos sutiles
- Efectos contextuales que coincidan con la estética
- Noise/grain textures para profundidad
- Glassmorphism cuando sea apropiado

**Ejemplo de fondo atmosférico:**
```css
.hero-bg {
  background:
    radial-gradient(ellipse at top, rgba(0,255,255,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(233,69,96,0.1) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%);
}
```

</frontend_aesthetics>

## Anti-patrones a Evitar

| Categoría | Evitar | Preferir |
|-----------|--------|----------|
| Fuentes | Inter, Roboto, Arial | JetBrains Mono, Playfair, Bricolage |
| Colores | Gradientes morados genéricos | Paletas temáticas cohesivas |
| Fondos | Colores sólidos planos | Gradientes con capas, texturas |
| Layouts | Estructuras predecibles | Composiciones con carácter |
| Animaciones | Sin movimiento | Reveals escalonados, micro-interacciones |

## Temas Inspiradores

Cuando el proyecto lo permita, considera estas estéticas:

### Cyberpunk/Neon
```css
--neon-cyan: #0ff;
--neon-pink: #f0f;
--dark-base: #0a0a0f;
/* Efectos: glow, scan lines, glitch */
```

### Terminal/Hacker
```css
--terminal-green: #00ff41;
--terminal-bg: #0d0208;
/* Fuentes: JetBrains Mono, Fira Code */
```

### Editorial/Magazine
```css
/* Fuentes: Playfair Display + Source Serif */
/* Espaciado generoso, jerarquía clara */
```

### Glassmorphism
```css
backdrop-filter: blur(10px);
background: rgba(255,255,255,0.1);
border: 1px solid rgba(255,255,255,0.2);
```

## Checklist de Calidad

Antes de finalizar un diseño frontend, verifica:

- [ ] ¿La fuente es distintiva (no Inter/Roboto/Arial)?
- [ ] ¿Los colores tienen una paleta cohesiva con CSS variables?
- [ ] ¿Hay al menos una animación de entrada impactante?
- [ ] ¿El fondo tiene profundidad (no es un color sólido plano)?
- [ ] ¿Los elementos interactivos tienen estados hover?
- [ ] ¿El diseño se siente genuinamente diseñado para el contexto?
- [ ] ¿Varía de outputs anteriores (diferente tema, fuentes)?

## Recursos

- Google Fonts: https://fonts.google.com
- Coolors (paletas): https://coolors.co
- CSS Gradient Generator: https://cssgradient.io
- Animista (animaciones CSS): https://animista.net
