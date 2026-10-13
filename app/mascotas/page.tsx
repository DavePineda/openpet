import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { Sidebar } from "@/components/Sidebar";
import { mascotas, descripcionFamilia, type Mascota } from "@/data/mascotas";

function TarjetaMascota({ mascota }: { mascota: Mascota }) {
  return (
    <Link
      href={`/mascotas/${mascota.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-[#ECE0D0] bg-[#FFFDF9] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition-[border-color,transform] duration-150 hover:-translate-y-[2px] hover:border-[#F2A78E]"
    >
      <Avatar
        inicial={mascota.nombre.charAt(0)}
        bg={mascota.avatarBg}
        color={mascota.avatarColor}
        size="lg"
      />
      <div className="min-w-0 flex-1">
        <div className="font-fredoka text-base font-semibold text-foreground">
          {mascota.nombre}
        </div>
        <div className="text-[13px] text-[#A89A8B]">
          {mascota.edad} · {descripcionFamilia(mascota)}
        </div>
      </div>
      {mascota.badge ? (
        <span
          className="flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold"
          style={{
            backgroundColor: mascota.badge.bg,
            color: mascota.badge.color,
          }}
        >
          {mascota.badge.texto}
        </span>
      ) : (
        <Icon size={18} strokeWidth={2.2} stroke="#CBB89F" className="flex-none">
          <path d="m9 18 6-6-6-6" />
        </Icon>
      )}
    </Link>
  );
}

export default function MascotasPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar activo="mascotas" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
          <div className="mb-[22px] flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-[#D9583C]">
                GESTIÓN
              </div>
              <h1 className="font-fredoka m-0 text-[30px] font-semibold text-foreground">
                Mascotas
              </h1>
            </div>
            <Link
              href="/mascotas/agregar"
              className="flex items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
            >
              <Icon size={17} strokeWidth={2.4} stroke="#fff">
                <path d="M12 5v14M5 12h14" />
              </Icon>
              Agregar mascota
            </Link>
          </div>

          <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-[#ECE0D0] bg-[#FFFDF9] px-4 py-3">
            <Icon size={18} stroke="#B0A290">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </Icon>
            <input
              type="text"
              placeholder="Buscar mascota…"
              className="w-full flex-1 border-none bg-transparent text-[15px] text-foreground outline-none placeholder:text-[#B6A99B]"
            />
          </div>

          <div className="mb-[14px] flex items-center gap-3">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-foreground">
              SALA SOLES
            </span>
            <span className="text-[13px] text-[#A89A8B]">
              {mascotas.length} mascotas
            </span>
            <span className="h-px flex-1 bg-[#E7DAC8]" />
          </div>

          <div className="grid grid-cols-2 gap-[14px]">
            {mascotas.map((mascota) => (
              <TarjetaMascota key={mascota.id} mascota={mascota} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
