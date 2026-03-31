import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"
export function Spinner() {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin")}
      
    />
  )
}