"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useAnimation, useMotionValue, animate } from "framer-motion"
import { useLanguage } from "@/app/context/languageContext"
import { useStaticData } from "@/app/context/staticDataContext"

const FloatingParticle = ({ delay, isPaused = false }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={isPaused ? {} : {
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [0, -100],
        x: [0, Math.random() * 50 - 25],
      }}
      transition={{
        duration: 5,
        repeat: isPaused ? 0 : Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeOut",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: "100%",
      }}
    />
  )
}

const LogoCard = ({ logo, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: 90 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateY: 5,
        rotateX: 5,
      }}
      className="group relative flex-shrink-0 cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Main card */}
      <div className="relative bg-neutral-800/50 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-6 h-32 w-48 flex items-center justify-center hover:bg-neutral-700/50 transition-all duration-300">
        {/* Logo */}
        <img
          src={logo.url || "/placeholder.svg"}
          alt={logo.alt}
          className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />

        {/* Corner accent */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Floating elements on hover */}
      <AnimatePresence>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * 60,
              y: (Math.random() - 0.5) * 60,
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

const InfiniteRow = ({ logos, direction = "left", speed = 50, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const animationRef = useRef()

  useEffect(() => {
    if (logos.length === 0) return

    if (!isHovered) {
      // Kontynuuj animację z aktualnej pozycji
      const currentX = x.get()
      const targetDistance = direction === "left" ? -2000 : 2000

      animationRef.current = animate(x, [currentX, currentX + targetDistance], {
        duration: speed,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop"
      })
    } else {
      // Zatrzymaj animację
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [isHovered, x, direction, speed, logos.length])

  if (logos.length === 0) return null

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-8 items-center"
        style={{ x }}
      >
        {/* Triple the logos for seamless loop */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <LogoCard key={`${logo.id}-${index}`} logo={logo} index={index % logos.length} />
        ))}
      </motion.div>
    </div>
  )
}

const ModernExhibitorsShowcase = () => {
  const [logos, setLogos] = useState([])
  const [title, setTitle] = useState("")
  const [isGlobalHovered, setIsGlobalHovered] = useState(false)
  const { language } = useLanguage()
  const staticData = useStaticData()

  useEffect(() => {
    if (staticData) {
      const sliderData = language === "pl" ? staticData.slider?.pl : staticData.slider?.en
      if (sliderData?.data) {
        setTitle(sliderData.data.title || "")
        const logoData = sliderData.data.logos
        if (logoData && logoData.length > 0) {
          const imageLogos = logoData.map((logo) => {
            const formats = logo.formats
            let imageUrl = logo.url
            if (formats) {
              if (formats.medium) {
                imageUrl = formats.medium.url
              } else if (formats.thumbnail) {
                imageUrl = formats.thumbnail.url
              }
            }
            return {
              id: logo.id,
              url: `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`,
              alt: logo.alternativeText || logo.name,
            }
          })
          setLogos(imageLogos)
        }
      }
    }
  }, [language, staticData])

  // Split logos into multiple rows for better visual effect
  const getLogoRows = () => {
    if (logos.length <= 8) {
      return [logos]
    } else if (logos.length <= 16) {
      const mid = Math.ceil(logos.length / 2)
      return [logos.slice(0, mid), logos.slice(mid)]
    } else {
      const third = Math.ceil(logos.length / 3)
      return [logos.slice(0, third), logos.slice(third, third * 2), logos.slice(third * 2)]
    }
  }

  const logoRows = getLogoRows()

  return (
    <div
      className="relative bg-neutral-900 text-yellow-400 py-24 sm:py-32 overflow-hidden"
      onMouseEnter={() => setIsGlobalHovered(true)}
      onMouseLeave={() => setIsGlobalHovered(false)}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} isPaused={isGlobalHovered} />
        ))}

        {/* Background orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"
          animate={isGlobalHovered ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: isGlobalHovered ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={isGlobalHovered ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: isGlobalHovered ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_100%]">
              {title}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Logo rows */}
        <div className="space-y-12">
          {logoRows.map((rowLogos, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, x: rowIndex % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + rowIndex * 0.2, duration: 1 }}
            >
              <InfiniteRow
                logos={rowLogos}
                direction={rowIndex % 2 === 0 ? "left" : "right"}
                speed={80 + rowIndex * 10}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-24 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: `${logos.length}+`, label: language === "pl" ? "Wystawców" : "Exhibitors" },
              { number: "8000+", label: language === "pl" ? "Studentów" : "Students" },
              { number: "300+", label: language === "pl" ? "Stanowisk pracy" : "Job positions" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-neutral-800/30 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6 hover:bg-neutral-700/30 transition-all duration-300">
                    <motion.div
                      className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent" />
    </div>
  )
}

export default ModernExhibitorsShowcase
