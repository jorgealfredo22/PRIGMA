"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Project } from "@/lib/data/projects"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={fadeIn}
      className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/60 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]"
    >
      <div className="h-64 relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
        
        {/* Glow effect on hover over image */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-purple-500/20 to-transparent transition-opacity duration-500 mix-blend-overlay"></div>
      </div>
      
      <div className="p-6 relative z-10 -mt-10">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors drop-shadow-md">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-5 text-sm leading-relaxed min-h-[60px]">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full backdrop-blur-md">
              {tag}
            </span>
          ))}
        </div>
        
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-3 px-4 bg-gray-800/50 hover:bg-purple-600 text-white rounded-xl transition-all duration-300 group/btn overflow-hidden relative border border-gray-700/50 hover:border-transparent font-medium"
        >
          <span className="relative z-10 flex items-center">
            Ver producto
            <svg
              className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
        </a>
      </div>
    </motion.div>
  )
}
