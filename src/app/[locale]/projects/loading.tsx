import { ViewTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <ViewTransition exit="slide-down" default="none">
      <main
        id="main-content"
        aria-busy="true"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="flex max-w-3xl flex-col gap-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-3/4 sm:h-12" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-9 w-24" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
            >
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-36" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </ViewTransition>
  );
}
