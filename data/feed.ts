export type PostTipo = "logro" | "actividad" | "anuncio";

export interface Post {
  id: string;
  tipo: PostTipo;
  /** Nombre de la mascota; también genera la inicial del avatar. Para anuncios: "Anuncio general". */
  mascota: string;
  hora: string;
  publicadoPor: string;
  destinatario: string;
  texto: string;
  likes: number;
  comentarios: number;
  /** Presencia = muestra el placeholder de foto. */
  foto?: { etiqueta: string };
}

export const posts: Post[] = [
  {
    id: "post-logro-rocco",
    tipo: "logro",
    mascota: "Rocco",
    hora: "14:20",
    publicadoPor: "publicado por vos",
    destinatario: "Para: familia de Rocco",
    texto:
      "¡Hoy aprendió a dar la patita! Estaba feliz de mostrárselo a todos. Un gran paso.",
    likes: 3,
    comentarios: 1,
  },
  {
    id: "post-actividad-lola",
    tipo: "actividad",
    mascota: "Lola",
    hora: "09:40",
    publicadoPor: "publicado por vos",
    destinatario: "Para: familia de Lola",
    texto:
      "Pintamos con témperas aptas para mascotas esta mañana. Lola eligió el azul para todo y se concentró un montón explorando colores.",
    likes: 5,
    comentarios: 2,
    foto: { etiqueta: "Foto · pintando con témperas" },
  },
  {
    id: "post-anuncio-sala",
    tipo: "anuncio",
    mascota: "Anuncio general",
    hora: "07:50",
    publicadoPor: "publicado por vos",
    destinatario: "Para: toda la sala",
    texto:
      "El viernes vamos al parque por la mañana. Recuerden mandar la correa y una botellita de agua.",
    likes: 8,
    comentarios: 0,
  },
];
