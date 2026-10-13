export interface Familiar {
  nombre: string; // "Lucía Fernández" → inicial para el avatar
  relacion: "Dueña" | "Dueño";
  estado: "activa" | "pendiente"; // badge ACTIVA / PENDIENTE
}

export interface Badge {
  texto: string; // POLLO | LACTOSA | VINCULAR
  bg: string; // fondo del pill, ej. "#FBD8CC"
  color: string; // color del texto, ej. "#D9684A"
}

export interface Mascota {
  id: string; // slug de la URL, ej. "milo"
  nombre: string; // "Milo Fernández" → inicial "M"
  edad: string; // "3 años"
  sala: "Soles";
  avatarBg: string; // ej. "#A9D9E8"
  avatarColor: string; // ej. "#1F7A93"
  badge?: Badge;
  alergias?: string; // texto de la tarjeta roja del perfil
  fechaNacimiento: string; // ya formateado, ej. "12 mar 2022"
  ingreso: string; // ya formateado, ej. "feb 2025"
  familia: Familiar[]; // 0..n
}

const BADGE_POLLO: Badge = {
  texto: "POLLO",
  bg: "#FBD8CC",
  color: "#D9684A",
};

const BADGE_LACTOSA: Badge = {
  texto: "LACTOSA",
  bg: "#FBD8CC",
  color: "#D9684A",
};

const BADGE_VINCULAR: Badge = {
  texto: "VINCULAR",
  bg: "#F9D2DE",
  color: "#C56486",
};

export const mascotas: Mascota[] = [
  {
    id: "milo",
    nombre: "Milo Fernández",
    edad: "3 años",
    sala: "Soles",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    badge: BADGE_POLLO,
    alergias:
      "Alergia al pollo. Evitar premios y dietas que lo contengan. Lleva plato propio en la mochila.",
    fechaNacimiento: "12 mar 2022",
    ingreso: "feb 2025",
    familia: [
      { nombre: "Lucía Fernández", relacion: "Dueña", estado: "activa" },
      { nombre: "Diego Fernández", relacion: "Dueño", estado: "pendiente" },
    ],
  },
  {
    id: "sasha",
    nombre: "Sasha Méndez",
    edad: "2 años",
    sala: "Soles",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    fechaNacimiento: "3 may 2024",
    ingreso: "mar 2025",
    familia: [{ nombre: "Ana Méndez", relacion: "Dueña", estado: "activa" }],
  },
  {
    id: "bruno",
    nombre: "Bruno Ruiz",
    edad: "3 años",
    sala: "Soles",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    fechaNacimiento: "27 nov 2022",
    ingreso: "jul 2024",
    familia: [
      { nombre: "Pedro Ruiz", relacion: "Dueño", estado: "activa" },
      { nombre: "Marina Ruiz", relacion: "Dueña", estado: "activa" },
    ],
  },
  {
    id: "vera",
    nombre: "Vera Soto",
    edad: "2 años",
    sala: "Soles",
    avatarBg: "#F4DC8E",
    avatarColor: "#9A7B1E",
    badge: BADGE_VINCULAR,
    fechaNacimiento: "19 ene 2024",
    ingreso: "may 2025",
    familia: [],
  },
  {
    id: "toto",
    nombre: "Toto Díaz",
    edad: "3 años",
    sala: "Soles",
    avatarBg: "#C9B6E8",
    avatarColor: "#7B5FC0",
    badge: BADGE_LACTOSA,
    alergias: "Intolerante a la lactosa. No dar lácteos ni premios con leche.",
    fechaNacimiento: "5 sep 2022",
    ingreso: "abr 2025",
    familia: [{ nombre: "Julián Díaz", relacion: "Dueño", estado: "activa" }],
  },
  {
    id: "ema",
    nombre: "Ema Castro",
    edad: "2 años",
    sala: "Soles",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    fechaNacimiento: "30 jun 2024",
    ingreso: "feb 2025",
    familia: [{ nombre: "Sofía Castro", relacion: "Dueña", estado: "activa" }],
  },
  {
    id: "lola",
    nombre: "Lola Romero",
    edad: "3 años",
    sala: "Soles",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    fechaNacimiento: "14 feb 2023",
    ingreso: "ene 2025",
    familia: [{ nombre: "Martín Romero", relacion: "Dueño", estado: "activa" }],
  },
  {
    id: "oso",
    nombre: "Oso Vega",
    edad: "2 años",
    sala: "Soles",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    fechaNacimiento: "21 abr 2024",
    ingreso: "jun 2025",
    familia: [{ nombre: "Carla Vega", relacion: "Dueña", estado: "activa" }],
  },
];

export function obtenerMascota(id: string): Mascota | undefined {
  return mascotas.find((m) => m.id === id);
}

export function descripcionFamilia(mascota: Mascota): string {
  const n = mascota.familia.length;
  if (n === 0) return "sin familias vinculadas";
  if (n === 1) return "1 familia vinculada";
  return `${n} familias vinculadas`;
}
