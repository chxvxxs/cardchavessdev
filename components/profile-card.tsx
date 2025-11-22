"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Coffee, Bot, Server, Github, ExternalLink, Music, Code2, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-md relative z-10"
    >
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl transition-all hover:border-white/20 shadow-2xl">
        
        {/* Efeito de Glow interno (Mantido discreto para combinar com seu fundo) */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-black-600/50 acity-10 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Imagem de Perfil */}
          <div className="relative">
            <div className="absolute -inset-2 animate-pulse rounded-full bg-white/20 blur-md" />
            <div className="relative h-32 w-32 rounded-full border-1 border-white/10 p-0.2 bg-white">
              <div className="h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/killu.jpg" 
                  alt="Profile"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Info do Usuário */}
          <div className="text-center space-y-1">
            <h1 className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-3xl font-bold text-transparent">
              Chaves
            </h1>
            <p className="text-zinc-400 text-sm font-medium tracking-wide">@chavessdev</p>
          </div>

          {/* Badges de Tech */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge icon={<Coffee size={14} />} label="Java" />
            <Badge icon={<Code2 size={14} />} label="Back-End" />
            <Badge icon={<Bot size={14} />} label="Discord Bot" />
            <Badge icon={<Server size={14} />} label="Node.js" />
          </div>

          {/* Botões de Ação */}
          <div className="flex w-full flex-col gap-3 pt-2">
            <ActionButton 
              href="https://chavessdev.vercel.app/" 
              icon={<ExternalLink size={18} />} 
              label="Meu Portfólio" 
            />
            <ActionButton 
              href="https://www.instagram.com/chavessdev/" 
              icon={<Instagram size={18} />} 
              label="Instagram" 
              target="_blank"
            />
            <ActionButton 
              href="https://github.com/chxvxxs" 
              icon={<Github size={18} />} 
              label="GitHub" 
              target="_blank"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// --- Componentes Auxiliares ---

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition-all hover:bg-purple-500/20 hover:ring-purple-500/40">
      {icon}
      <span>{label}</span>
    </div>
  )
}



// Botão Principal (Com suporte a target="_blank")
interface ActionButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ href, icon, label, ...props }: ActionButtonProps) {
  return (
    <Link
      href={href}
      {...props}
      className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98]"
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
    </Link>
  )
}
