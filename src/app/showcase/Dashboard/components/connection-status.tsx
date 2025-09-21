import { Badge } from "../components/ui/badge"
import { Wifi, WifiOff, Loader2 } from "lucide-react"

interface ConnectionStatusProps {
  status: "connected" | "disconnected" | "connecting"
}

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  if (status === "connected") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center">
        <Wifi className="h-3.5 w-3.5" />
        接続済み
      </Badge>
    )
  }

  if (status === "connecting") {
    return (
      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex gap-1 items-center">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        接続中...
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex gap-1 items-center">
      <WifiOff className="h-3.5 w-3.5" />
      未接続
    </Badge>
  )
}
