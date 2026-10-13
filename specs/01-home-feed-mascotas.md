# SPEC 01 — Home feed de guardería de mascotas

> **Estado:** implementado
> **Depende de:** nada (primera spec del proyecto)
> **Fecha:** 2026-10-12
> **Objetivo:** Convertir la plantilla `references/pantallas/feed.dc.html` en la página home `/` de la app Next.js, con estilo visual idéntico y terminología de mascotas y familias.

## Alcance

**In:**

- Página única `app/page.tsx` que reproduce el diseño de `references/pantallas/feed.dc.html` (sidebar, encabezado, composer, lista de 3 posts).
- Carga de fuentes Fredoka y Nunito vía `next/font` en `app/layout.tsx`.
- Estilos base (fondo, scrollbar, fuente global) en `app/globals.css`.
- Contenido mock tipado en `data/feed.ts` (3 posts: logro, actividad con foto, anuncio), con nombres de mascotas (Rocco, Lola) y textos adaptados al contexto de guardería de mascotas.
- Reescritura de toda la terminología: niños → mascotas, maestra → cuidadora, dueños → familias.
- Marca del sidebar: "OpenPet" con subtítulo "Guardería · Sala Soles" (reemplaza al "OpenDayCare" del mockup).
- Enlaces de navegación apuntando a rutas futuras reales (`/` para Feed —página actual—, `/crear-publicacion`, `/mascotas`, `/avisos`, `/mi-cuenta`, `/login`, `/detalle-publicacion`, `/foto`).

**Out of scope (para specs futuras):**

- Autenticación, login y cierre de sesión funcionales.
- Base de datos o persistencia de cualquier tipo.
- Las pantallas destino de los enlaces (crear-publicacion, mascotas, avisos, mi-cuenta, login, detalle-publicacion, foto) — darán 404 hasta que existan.
- Interactividad real: likes, comentarios y edición son estáticos.
- Diseño responsive (la plantilla es desktop; se respeta tal cual).

## Modelo de datos

Esta feature no introduce persistencia. Solo datos mock en memoria:

```ts
// data/feed.ts
export type PostTipo = "logro" | "actividad" | "anuncio";

export interface Post {
  id: string;
  tipo: PostTipo;
  mascota: string;        // nombre de la mascota, ej. "Rocco" → inicial "R" para el avatar
  hora: string;           // "14:20"
  publicadoPor: string;   // "publicado por vos" | "Anuncio general"
  destinatario: string;   // "Para: familia de Rocco" | "Para: toda la sala"
  texto: string;
  likes: number;
  comentarios: number;
  foto?: { etiqueta: string }; // presencia = muestra el placeholder de foto
}
```

## Plan de implementación

1. Configurar `next/font` con Fredoka (400–700) y Nunito (400–800) en `app/layout.tsx`; exponer las variables CSS en el body.
2. Ajustar `app/globals.css`: fondo `#F6ECDF`, color de texto `#3F362E`, fuente base Nunito, scrollbar personalizada de la plantilla. Verificar en `npm run dev` que la página en blanco toma el fondo correcto.
3. Crear `data/feed.ts` con el tipo `Post` y los 3 posts adaptados al contexto de mascotas:
   - **Logro** — Rocco: "¡Hoy aprendió a dar la patita! Estaba feliz de mostrárselo a todos. Un gran paso." · "Para: familia de Rocco".
   - **Actividad con foto** — Lola: "Pintamos con témperas aptas para mascotas esta mañana. Lola eligió el azul para todo y se concentró un montón explorando colores." · "Para: familia de Lola" · placeholder "Foto · pintando con témperas".
   - **Anuncio** — "El viernes vamos al parque por la mañana. Recuerden mandar la correa y una botellita de agua." · "Para: toda la sala".
4. Crear `app/page.tsx` con el sidebar completo (logo "OpenPet · Guardería · Sala Soles", botón "Nueva publicación", nav con Feed activo/Mascotas/Avisos/Mi cuenta, bloque de usuaria "Caro Giménez · Cuidadora · Soles") usando clases Tailwind con los valores exactos de la plantilla.
5. Agregar en `app/page.tsx` el main: encabezado "GUARDERÍA · SALA SOLES / Buenas, Caro / 12 mascotas · martes 17 jun", composer y divisor "PUBLICADO HOY". Verificar en el navegador contra el mockup.
6. Renderizar la lista de posts desde `data/feed.ts` mapeando el mockup (badge por tipo con sus colores, línea "Para: familia de…", placeholder de foto con borde punteado, footer con likes/comentarios/Editar).
7. Pasar `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores.

## Criterios de aceptación

- [x] `npm run dev` sirve `/` sin errores en consola.
- [x] El home `/` es visualmente idéntico al mockup: mismos colores (`#F6ECDF`, `#FFFDF9`, `#F2937A`, etc.), mismos radios, sombras y tipografías Fredoka/Nunito.
- [x] El logo del sidebar dice "OpenPet" con subtítulo "Guardería · Sala Soles".
- [x] Ningún texto menciona "niños", "niño", "maestra", "OpenDayCare" ni nombres de niños (Mateo); dice "mascotas", "cuidadora" y usa nombres de mascotas (Rocco, Lola).
- [x] Ningún texto habla de contexto humano ("orinal"); los textos de los posts son de contexto mascotas.
- [x] El encabezado dice "12 mascotas · martes 17 jun" y "GUARDERÍA · SALA SOLES".
- [x] La nav lateral muestra "Feed" (activo), "Mascotas", "Avisos", "Mi cuenta" y "Nueva publicación"; Feed apunta a `/`.
- [x] Aparecen exactamente 3 posts con badges LOGRO, ACTIVIDAD y ANUNCIO en sus colores del mockup.
- [x] El segundo post muestra el placeholder de foto con borde punteado "Foto · pintando con témperas".
- [x] Los enlaces apuntan a las rutas listadas en el alcance (verificable en el HTML renderizado).
- [x] `npx tsc --noEmit` y `npm run lint` pasan sin errores.

## Decisiones

- **Sí:** Tailwind v4 con los valores exactos de la plantilla (colores hex, sombras, tamaños en px). El proyecto ya usa Tailwind y los valores arbitrarios de Tailwind (`bg-[#F6ECDF]`, `text-[14.5px]`, etc.) garantizan fidelidad visual sin CSS custom por componente.
- **No:** copiar los estilos inline de la plantilla tal cual. Sería fiel pero inconsistente con el stack del proyecto.
- **No:** crear `tailwind.config.js`. Tailwind v4 es CSS-first (`app/globals.css`); la configuración va en `@theme inline`.
- **Sí:** `next/font` para Fredoka y Nunito. Carga optimizada, sin FOUT, idiomático en Next.js 16.
- **Sí:** datos mock en `data/feed.ts` tipado. Desacopla contenido de presentación para una futura spec de feed con datos reales.
- **Sí:** enlaces a rutas futuras reales aunque den 404. Deja la estructura de navegación lista y documenta el mapa de rutas.
- **Sí (mapeo de terminología, validado):** Niños→Mascotas, Maestra→Cuidadora, "12 niños"→"12 mascotas", dueños→"familia de…" (se mantiene "familia de Rocco"), "toda la sala" y "Guardería · Sala Soles" se mantienen.
- **Sí (validado):** cambiar "OpenDayCare" por "OpenPet" en el logo del sidebar. El proyecto se llama OpenPet; el subtítulo "Sala Soles" se conserva.
- **Sí (validado):** reemplazar nombres de niños por nombres de mascotas (Mateo→Rocco en logro y actividad; se usan Rocco y Lola). Las iniciales de avatar siguen funcionando (R, L).
- **Sí (validado):** adaptar los textos de los posts al contexto de guardería de mascotas ("dar la patita" en vez de "orinal", correa y botellita de agua en el anuncio). El estilo visual no cambia.
- **Sí (validado):** la perspectiva del home es la de la cuidadora ("Caro Giménez · Cuidadora · Soles"), no la de la familia dueña.
- **Sí (validado):** Server Component estático, sin `"use client"`. No hay interactividad en esta spec; el HTML sale idéntico y sin JS extra.
- **Decisión técnica (revalidada 10/10 en sesión de preguntas):** estilos, fuentes, datos, enlaces y renderizado coinciden con lo ya definido en esta spec. No queda ninguna decisión tomada por defecto sin validar.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Diferencias sutiles de render (letter-spacing, line-height) entre plantilla y Tailwind | Copiar valor por valor del mockup, incluyendo `letter-spacing:.8px` y `line-height:1.55`; comparar lado a lado en el navegador |
| Fredoka no carga igual con `next/font` (pesos o fallback) | Declarar los 4 pesos y usar las variables CSS en `@theme inline`; fallback `system-ui, sans-serif` |
| Enlaces a rutas inexistentes confunden al probar | Están fuera de alcance por diseño; se documenta en la spec y en el mapa de rutas |

## Lo que **no** está en esta spec

- Login, autenticación o roles.
- Base de datos, API routes o server actions.
- Pantallas crear-publicacion, mascotas, avisos, mi-cuenta, login, detalle-publicacion y foto (cada una en su propia spec).
- Interactividad de likes, comentarios y edición.
- Responsive / mobile.

Cada una de esas, si aterriza, va en su propia spec.
