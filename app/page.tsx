import { ProfileCard } from "@/components/profile-card"
import { BackgroundEffects } from "@/components/background-effects"

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-purple-500/30">
      <BackgroundEffects />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <ProfileCard />
      </div>
    </main>
  )
}
