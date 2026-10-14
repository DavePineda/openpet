# SPEC 02 — Pantallas de mascotas: lista y perfil (solo diseño)

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-13
> **Objetivo:** Convertir los mockups `ninos.dc.html` y `perfil-nino.dc.html` en las rutas `/mascotas` y `/mascotas/[slug]`, con estilo idéntico, terminología de mascotas y sin lógica de negocio (solo interfaces y componentes).

## Alcance

**In:**

- Pantalla `/mascotas` (desde `ninos.dc.html`): encabezado "GESTIÓN / Mascotas", botón "Agregar mascota", buscador visual, divisor "SALA SOLES · 8 mascotas" y grilla 2 columnas de tarjetas de mascota con hover.
- Pantalla `/mascotas/[slug]` (desde `perfil-nino.dc.html`): breadcrumb "Volver a Mascotas", encabezado con avatar grande + Editar, tarjeta roja "Alergias y notas" (solo si tiene), tabla de datos (nacimiento, sala, ingreso), botón "Resumen del día" y tarjeta "Familias vinculadas" con estados ACTIVA/PENDIENTE y "Vincular otra familia".
- Extracción del sidebar inline de `app/page.tsx` a `components/Sidebar.tsx` (prop de sección activa) y refactor del home para reutilizarlo.
- `components/Avatar.tsx`: avatar de iniciales reutilizable (tamaños 38/40/48/84 px del mockup).
- Datos mock tipados en `data/mascotas.ts` (8 mascotas, nombres con iniciales M S B V T E L O).
- Mapeo de terminología: niños→mascotas, maestra→cuidadora, "padres vinculados"→"familias vinculadas", Mamá/Papá→Dueña/Dueño, badges de alergia (MANÍ→POLLO, LACTOSA se mantiene, VINCULAR se mantiene).
- Enlaces a rutas futuras reales (dan 404 por diseño): `/mascotas/agregar`, `/mascotas/[slug]/resumen`, `/mascotas/[slug]/vincular-familia`.

**Out of scope (para specs futuras):**

- Filtrado real del buscador (es solo visual, estático).
- CRUD de mascotas: agregar, editar, vincular/desvincular familias.
- "Resumen del día" (pantalla destino del botón).
- Persistencia, API, autenticación.
- Responsive (los mockups son desktop).

## Modelo de datos

```ts
// data/mascotas.ts
export interface Familiar {
  nombre: string;                  // "Lucía Fernández" → inicial para el avatar
  relacion: "Dueña" | "Dueño";
  estado: "activa" | "pendiente";  // badge ACTIVA / PENDIENTE
}

export interface Mascota {
  id: string;                      // slug de la URL, ej. "milo"
  nombre: string;                  // "Milo Giménez" → inicial "M"
  edad: string;                    // "3 años"
  sala: "Soles";
  avatarBg: string;                // ej. "#A9D9E8"
  avatarColor: string;             // ej. "#1F7A93"
  badge?: { texto: string; bg: string; color: string }; // POLLO | LACTOSA | VINCULAR
  alergias?: string;               // texto de la tarjeta roja del perfil
  fechaNacimiento: string;         // "12 mar 2022"
  ingreso: string;                 // "feb 2025"
  familia: Familiar[];             // 0..n → "2 familias vinculadas"
}
```

Convenciones: `fechaNacimiento` e `ingreso` son strings ya formateados (no se calcula edad); la descripción de la tarjeta usa "N familias vinculadas" / "sin familias vinculadas".

## Plan de implementación

1. Crear `components/Sidebar.tsx` con prop `activo: "feed" | "mascotas" | "avisos" | "mi-cuenta"` (marcado activo: fondo `#FBE3D8` + texto `#D9583C`) y refactorizar `app/page.tsx` para usarlo. Verificar en `npm run dev` que el home queda idéntico.
2. Crear `components/Avatar.tsx` (inicial, `bg`, `color`, `size`) y usarlo dentro del Sidebar donde aplica. Verificar visualmente.
3. Crear `data/mascotas.ts` con el tipo `Mascota` y las 8 mascotas: Milo, Sasha, Bruno, Vera, Toto, Ema, Lola (Lola ya existe en SPEC 01), Oso — con badges POLLO (Milo), LACTOSA (Toto) y VINCULAR (Vera, sin familia).
4. Crear `app/mascotas/page.tsx`: header + botón "Agregar mascota" (`/mascotas/agregar`), buscador estático, divisor y grilla de tarjetas (hover: borde `#F2A78E` + `translateY(-2px)`) renderizadas desde `data/mascotas.ts`, cada una enlaza a `/mascotas/[slug]`.
5. Crear `app/mascotas/[slug]/page.tsx`: `await params` (Next 16 los expone como Promise), `notFound()` si el slug no existe, `generateStaticParams()` con los 8 slugs; renderizar breadcrumb, encabezado, tarjeta de alergias condicional, tabla de datos y columna derecha (Resumen del día + familias vinculadas + "Vincular otra familia").
6. Pasar `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores.

## Criterios de aceptación

- [x] `/mascotas` renderiza sin errores en consola y es visualmente idéntica a `ninos.dc.html` (colores, radios, sombras, Fredoka/Nunito).
- [x] `/mascotas` muestra exactamente 8 tarjetas con los badges POLLO, LACTOSA y VINCULAR en sus colores del mockup.
- [x] Al pasar el mouse por una tarjeta, el borde pasa a `#F2A78E` y sube 2px con transición.
- [x] El buscador muestra el placeholder "Buscar mascota…" y es solo visual (no filtra).
- [x] Cada tarjeta enlaza a `/mascotas/<slug>` de su mascota; `/mascotas/milo` muestra el perfil completo.
- [x] `/mascotas/slug-inexistente` devuelve 404 (`notFound()`).
- [x] El perfil muestra "Alergias y notas" solo para mascotas con `alergias`, y la tabla nacimiento/sala/ingreso con los valores del mock.
- [x] Las familias vinculadas muestran badges ACTIVA (verde) y PENDIENTE (amarillo), y "Vincular otra familia".
- [x] "Volver a Mascotas" enlaza a `/mascotas`; Editar → `/mascotas/agregar`; Resumen del día → `/mascotas/<slug>/resumen`; esas rutas dan 404 por diseño.
- [x] El sidebar se renderiza desde `components/Sidebar.tsx` en `/`, `/mascotas` y `/mascotas/[slug]`, con "Mascotas" activo en las dos últimas y "Feed" activo en el home.
- [x] Ningún texto menciona "niños", "niño", "maestra" ni "OpenDayCare".
- [x] `npx tsc --noEmit` y `npm run lint` pasan sin errores.

## Decisiones

- **Sí:** `/mascotas` + `/mascotas/[slug]` con slug en los datos mock. Escala a datos reales sin cambiar URLs.
- **Sí:** extraer `Sidebar.tsx` y refactorizar el home. Elimina la duplicación de ~40 líneas por página y crea el patrón para las pantallas futuras (avisos, mi-cuenta).
- **Sí:** buscador estático. La spec es "solo diseño"; agregar filtro introduciría `"use client"` sin necesidad.
- **Sí:** rutas futuras reales para enlaces sin spec, igual que decidió SPEC 01.
- **Sí (mapeo):** "padres vinculados"→"familias vinculadas", Mamá/Papá→Dueña/Dueño, MANÍ→POLLO (badge de alergia de mascota); VINCULAR y LACTOSA se mantienen.
- **Sí:** el botón "Editar" del perfil apunta a `/mascotas/agregar`, igual que en el mockup (agregar-nino). Cuando exista la spec de edición se reevalúa.
- **No:** copiar el sidebar inline en cada página (duplicación); ni `href="#"` (semántica pobre).
- **No:** validar el buscador ni el hover como funcionalidad; son presentación pura.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Next 16 expone `params` como Promise (rompe el patrón conocido) | `await params` en el Server Component; validar con Context7 durante la implementación |
| `cacheComponents: true` + ruta dinámica | Usar `generateStaticParams()` para que los 8 perfiles se prerendericen estáticos |
| Diferencias sutiles de render vs mockup (letter-spacing, line-height, hover) | Copiar valores uno a uno y comparar lado a lado con Playwright (screenshots en `.playwright-mcp/`) |

## Lo que **no** está en esta spec

- Filtro funcional del buscador.
- Agregar/editar mascotas y vincular familias (pantallas y lógica).
- Resumen del día.
- Persistencia, API, autenticación, responsive.

Cada una de esas, si aterriza, va en su propia spec.
