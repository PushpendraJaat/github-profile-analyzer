import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
  return (
    <Card>
      <div className="h-24 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 animate-pulse" />
      <CardContent className="p-6 pt-0 -mt-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>

          <div className="space-y-4 flex-1 pt-6 md:pt-0">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

