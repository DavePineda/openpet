const SIZES = {
  sm: { box: 38, text: 16 }, // usuaria del sidebar
  md: { box: 40, text: 16 }, // familiares en el perfil
  lg: { box: 48, text: 19 }, // tarjetas de la lista
  xl: { box: 84, text: 34 }, // encabezado del perfil
} as const;

export type AvatarSize = keyof typeof SIZES;

interface AvatarProps {
  inicial: string;
  bg: string;
  color: string;
  size: AvatarSize;
}

export function Avatar({ inicial, bg, color, size }: AvatarProps) {
  const { box, text } = SIZES[size];
  return (
    <div
      className="font-fredoka flex flex-none items-center justify-center rounded-full font-semibold"
      style={{ width: box, height: box, backgroundColor: bg, color, fontSize: text }}
    >
      {inicial}
    </div>
  );
}
