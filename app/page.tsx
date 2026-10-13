import Link from "next/link";
import { posts, type Post, type PostTipo } from "@/data/feed";
import { Icon } from "@/components/Icon";
import { Sidebar } from "@/components/Sidebar";

interface BadgeStyle {
  label: string;
  pill: string;
  dot: string;
  text: string;
}

const BADGE_STYLES: Record<PostTipo, BadgeStyle> = {
  logro: {
    label: "LOGRO",
    pill: "bg-[#CFEBD8]",
    dot: "bg-[#3E9B6C]",
    text: "text-[#3E9B6C]",
  },
  actividad: {
    label: "ACTIVIDAD",
    pill: "bg-[#C7E7F1]",
    dot: "bg-[#2E89A6]",
    text: "text-[#2E89A6]",
  },
  anuncio: {
    label: "ANUNCIO",
    pill: "bg-[#CCD8F4]",
    dot: "bg-[#4E72C8]",
    text: "text-[#4E72C8]",
  },
};

const AVATAR_BASE =
  "flex h-11 w-11 flex-none items-center justify-center rounded-full font-fredoka text-[17px] font-semibold";

function PostAvatar({ post }: { post: Post }) {
  if (post.tipo === "anuncio") {
    return (
      <div className={`${AVATAR_BASE} bg-[#CCD8F4] text-[#4E72C8]`}>
        <Icon size={20}>
          <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </Icon>
      </div>
    );
  }
  return (
    <div className={`${AVATAR_BASE} bg-[#A9D9E8] text-[#1F7A93]`}>
      {post.mascota.charAt(0)}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const badge = BADGE_STYLES[post.tipo];
  return (
    <article className="rounded-[20px] border border-[#ECE0D0] bg-[#FFFDF9] px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="mb-[14px] flex items-center gap-3">
        <PostAvatar post={post} />
        <div className="min-w-0 flex-1">
          <div className="font-fredoka text-[16.5px] font-semibold text-foreground">
            {post.mascota}
          </div>
          <div className="text-[12.5px] text-[#A89A8B]">
            {post.hora} · {post.publicadoPor}
          </div>
        </div>
        <div
          className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${badge.pill}`}
        >
          <span className={`h-2 w-2 rounded-full ${badge.dot}`} />
          <span
            className={`text-xs font-extrabold tracking-[0.5px] ${badge.text}`}
          >
            {badge.label}
          </span>
        </div>
      </div>

      <div className="mb-2.5 text-[12.5px] text-[#A89A8B]">
        {post.destinatario}
      </div>
      <p className="m-0 text-[15.5px] leading-[1.55] text-[#4A4038]">
        {post.texto}
      </p>

      {post.foto && (
        <Link
          href="/foto"
          className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]"
        >
          <Icon size={30} strokeWidth={1.7}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
          </Icon>
          <span className="text-[13.5px]">{post.foto.etiqueta}</span>
        </Link>
      )}

      <div className="mt-4 flex items-center gap-[18px] border-t border-[#F0E6D8] pt-[14px]">
        <span className="flex items-center gap-[7px] text-sm font-bold text-[#E0654A]">
          <Icon size={19} fill="#E0654A">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </Icon>
          {post.likes}
        </span>
        <Link
          href="/detalle-publicacion"
          className="flex items-center gap-[7px] text-sm font-bold text-[#94887B]"
        >
          <Icon size={18}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
          </Icon>
          {post.comentarios}
        </Link>
        <span className="flex-1" />
        <Link
          href="/crear-publicacion"
          className="text-sm font-extrabold text-[#C5503A]"
        >
          Editar
        </Link>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar activo="feed" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
          <div className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-[#D9583C]">
              GUARDERÍA · SALA SOLES
            </div>
            <h1 className="font-fredoka m-0 text-[30px] font-semibold text-foreground">
              Buenas, Caro
            </h1>
            <p className="mt-[5px] text-[14.5px] text-[#94887B]">
              12 mascotas · martes 17 jun
            </p>
          </div>

          <Link
            href="/crear-publicacion"
            className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-[#ECE0D0] bg-[#FFFDF9] px-[18px] py-[14px] shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
          >
            <div className="font-fredoka flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#F2937A] text-base font-semibold text-white">
              C
            </div>
            <span className="flex-1 text-[15px] text-[#A89A8B]">
              Compartí un momento…
            </span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[#FBE3D8] text-[#E0654A]">
              <Icon>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </Icon>
            </span>
          </Link>

          <div className="mb-[14px] flex items-center gap-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1 bg-[#E7DAC8]" />
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
