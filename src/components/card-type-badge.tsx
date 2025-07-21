import { Badge } from "@/components/ui/badge"

export type CardTypes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6

interface BadgeConfig {
  className?: string
  label: string
}

const STATUS_BADGES: Record<CardTypes, BadgeConfig> = {
  1: {
    className: "bg-green-100 text-green-800 hover:bg-green-100",
    label: "Fiscalizador",
  },
  2: {
    className: "bg-blue-100 text-blue-800 ",
    label: "General",
  },
  3: {
    className: "bg-yellow-100 text-yellow-800",
    label: "Estudiante",
  },
  4: {
    className: "bg-purple-200 text-purple-900",
    label: "Media Tarifa",
  },
  5: {
    className: "bg-pink-200 text-pink-900",
    label: "Especial",
  },
  6: {
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    label: "Otras",
  },
}

export const getCardTypeBadge = (cardType: string) => {
  const cfg = (STATUS_BADGES as Record<string, BadgeConfig>)[cardType] ?? {
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    label: "Desconocido",
  }

  return (
    <Badge variant={"secondary"} className={cfg.className}>
      {cfg.label}
    </Badge>
  )
}
