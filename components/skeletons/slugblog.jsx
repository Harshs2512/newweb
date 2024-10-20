import { Skeleton } from "@/components/ui/skeleton"

export function SlugBlog() {
    return (
        <div className="items-center">
            <Skeleton className="h-12 w-full rounded" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}
