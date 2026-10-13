import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, type AvatarSize } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { Sidebar } from "@/components/Sidebar";
import {
  mascotas,
  obtenerMascota,
  type Familiar,
  type Mascota,
} from "@/data/mascotas";

export function generateStaticParams() {
  return mascotas.map((m) => ({ slug: m.id }));
}

const AVATAR_FAMILIA = [
  { bg: "#C9B6E8", color: "#fff" },
  { bg: "#A9C7E8", color: "#fff" },
  { bg: "#F4B8CC", color: "#fff" },
  { bg: "#B9DEC4", color: "#3E8B62" },
];

function avatarFamiliar(i: number) {
  return AVATAR_FAMILIA[i % AVATAR_FAMILIA.length];
}

function descripcionFamiliar(familiar: Familiar): string {
  return familiar.estado === "activa"
    ? `${familiar.relacion} · activa`
    : `${familiar.relacion} · invitación enviada`;
}

const ESTADO_BADGE = {
  activa: { texto: "ACTIVA", bg: "#CFEBD8", color: "#3E9B6C" },
  pendiente: { texto: "PENDIENTE", bg: "#F7E7A6", color: "#9A7B1E" },
} as const;

function FilaDato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex justify-between px-[18px] py-[15px]">
      <span className="text-[14.5px] text-[#94887B]">{etiqueta}</span>
      <span className="text-[14.5px] font-extrabold text-foreground">
        {valor}
      </span>
    </div>
  );
}

function TarjetaFamilia({ familiar, i }: { familiar: Familiar; i: number }) {
  const badge = ESTADO_BADGE[familiar.estado];
  const colores = avatarFamiliar(i);
  return (
    <div className="flex items-center gap-3">
      <Avatar
        inicial={familiar.nombre.charAt(0)}
        bg={colores.bg}
        color={colores.color}
        size={"md" satisfies AvatarSize}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-extrabold text-foreground">
          {familiar.nombre}
        </div>
        <div className="text-[12.5px] text-[#A89A8B]">
          {descripcionFamiliar(familiar)}
        </div>
      </div>
      <span
        className="flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold"
        style={{ backgroundColor: badge.bg, color: badge.color }}
      >
        {badge.texto}
      </span>
    </div>
  );
}

function PerfilMascota({ mascota }: { mascota: Mascota }) {
  return (
    <div className="flex flex-wrap items-start gap-[26px]">
      <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
        <div className="flex items-center gap-[18px]">
          <Avatar
            inicial={mascota.nombre.charAt(0)}
            bg={mascota.avatarBg}
            color={mascota.avatarColor}
            size="xl"
          />
          <div className="flex-1">
            <h1 className="font-fredoka m-0 text-[28px] font-semibold text-foreground">
              {mascota.nombre}
            </h1>
            <p className="m-0 mt-[3px] text-[15px] text-[#94887B]">
              {mascota.edad} · Sala {mascota.sala}
            </p>
          </div>
          <Link
            href="/mascotas/agregar"
            className="rounded-xl border-[1.5px] border-[#ECE0D0] bg-[#FFFDF9] px-4 py-[9px] text-sm font-bold text-[#6E6359]"
          >
            Editar
          </Link>
        </div>

        {mascota.alergias && (
          <div className="flex gap-[14px] rounded-2xl bg-[#FBDAD6] px-[18px] py-4">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-[#F4A8A0]">
              <Icon size={22} strokeWidth={2.2} stroke="#fff">
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                <path d="M12 9v4M12 17h.01" />
              </Icon>
            </div>
            <div>
              <div className="mb-[2px] text-[15px] font-extrabold text-[#C5413A]">
                Alergias y notas
              </div>
              <div className="text-[14.5px] leading-[1.5] text-[#B25249]">
                {mascota.alergias}
              </div>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-[#ECE0D0] bg-[#FFFDF9] [&>*+*]:border-t [&>*+*]:border-[#F0E6D8]">
          <FilaDato
            etiqueta="Fecha de nacimiento"
            valor={mascota.fechaNacimiento}
          />
          <FilaDato etiqueta="Sala" valor={mascota.sala} />
          <FilaDato etiqueta="Ingreso" valor={mascota.ingreso} />
        </div>
      </div>

      <div className="flex w-[300px] flex-none flex-col gap-[14px]">
        <Link
          href={`/mascotas/${mascota.id}/resumen`}
          className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-[#3F362E] p-[13px] text-[15px] font-extrabold text-white"
        >
          <Icon size={18} stroke="#fff">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </Icon>
          Resumen del día
        </Link>

        <div className="rounded-2xl border border-[#ECE0D0] bg-[#FFFDF9] px-[18px] py-4">
          <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
            FAMILIAS VINCULADAS
          </div>
          <div className="flex flex-col gap-[14px]">
            {mascota.familia.map((familiar, i) => (
              <TarjetaFamilia key={familiar.nombre} familiar={familiar} i={i} />
            ))}
            <Link
              href={`/mascotas/${mascota.id}/vincular-familia`}
              className="flex items-center gap-3 pt-2"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-[#B0A290]">
                <Icon size={18} strokeWidth={2.2}>
                  <path d="M12 5v14M5 12h14" />
                </Icon>
              </span>
              <span className="text-[14.5px] font-extrabold text-[#C5503A]">
                Vincular otra familia
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PerfilMascotaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mascota = obtenerMascota(slug);
  if (!mascota) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar activo="mascotas" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-10 pt-[34px] pb-20">
          <Link
            href="/mascotas"
            className="mb-5 flex items-center gap-[7px] text-sm font-bold text-[#94887B]"
          >
            <Icon size={18} strokeWidth={2.2}>
              <path d="m15 18-6-6 6-6" />
            </Icon>
            Volver a Mascotas
          </Link>
          <PerfilMascota mascota={mascota} />
        </div>
      </main>
    </div>
  );
}
