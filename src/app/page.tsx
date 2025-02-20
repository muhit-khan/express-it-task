import StoreForm from "@/components/store-form"
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full fixed"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="container max-w-2xl mx-auto relative z-10">
        <StoreForm />
      </div>
    </main>
  )
}

