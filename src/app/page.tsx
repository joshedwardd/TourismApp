import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import FeaturedDestinations from "@/components/featured-destinations"
import RecommendedPackages from "@/components/recommended-packages"
import TestimonialsSection from "@/components/testimonials-section"
import { Skeleton } from "@/components/ui/skeleton"
// import './globals.css' // This MUST be here

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <FeaturedDestinations />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <RecommendedPackages />
      </Suspense>

      <TestimonialsSection />
    </div>
  )
}
