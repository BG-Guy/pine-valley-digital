// Lab page content: a hero-like section that recreates the "flowing color"
// look of a live WebGL fluid-simulation background (the kind driven by a
// Three.js shader, redrawn every frame) using only CSS — no canvas, no
// shaders, no per-frame JavaScript. Styles live in lab.css.

// Markup: eyebrow, headline (with the animated gradient word), explanatory
// copy, a link home, and the drifting color-blob field behind it all.
export const renderLabHero = () => `
    <section class="lab-hero relative overflow-hidden px-6 sm:px-10 pt-40 pb-24 sm:pt-52 sm:pb-32">
      <div class="lab-blob-field" aria-hidden="true">
        <div class="lab-blob lab-blob-a"></div>
        <div class="lab-blob lab-blob-b"></div>
        <div class="lab-blob lab-blob-c"></div>
        <div class="lab-blob lab-blob-d"></div>
      </div>
      <div class="lab-grain" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-3xl">
        <p class="reveal text-sm font-semibold uppercase tracking-[0.2em] text-ink/60 mb-6">Pine Valley Digital &middot; Lab</p>
        <h1 class="reveal font-display font-extrabold tracking-tight text-[11vw] leading-[0.98] sm:text-6xl sm:leading-[1.02]">
          Fluid color, <span class="lab-gradient-text">without the GPU bill</span>.
        </h1>
        <p class="reveal mt-8 text-lg text-ink/70 max-w-xl">
          Some hero sections render this with a live WebGL fluid simulation — a
          full-screen shader, redrawn every frame, backed by a rendering
          library. This page gets a similar flowing, paint-like feel from four
          looping CSS gradients blended with <code class="lab-code">mix-blend-mode</code>
          and a static grain overlay. No canvas, no shaders, and nothing
          running after the page paints once — the kind of trade Pine Valley
          Digital makes by default, so sites stay fast to load.
        </p>
        <a href="/" class="nav-link reveal mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
          <span aria-hidden="true">&larr;</span> Back to Pine Valley Digital
        </a>
      </div>
    </section>
`
