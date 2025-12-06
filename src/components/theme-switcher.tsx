import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useTheme,
  themePalettes,
  type ThemeMode,
} from '@/contexts/theme-context'

const modeOptions: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
]

export const ThemeSwitcher = () => {
  const { theme, actualMode, setMode, setPalette, toggleMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'mode' | 'palette'>('palette')
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const currentPalette = themePalettes.find((p) => p.id === theme.palette)

  return (
    <div ref={containerRef} className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'group relative flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all',
          'border-slate-200/60 bg-white/80 backdrop-blur-sm hover:bg-white',
          'dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:bg-slate-800',
          isOpen && 'ring-2 ring-theme-primary/20',
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Color Preview Dots */}
        <div className="flex items-center gap-0.5">
          <div
            className="size-2.5 rounded-full shadow-sm"
            style={{ backgroundColor: currentPalette?.preview.primary }}
          />
          <div
            className="size-2.5 rounded-full shadow-sm"
            style={{ backgroundColor: currentPalette?.preview.secondary }}
          />
          <div
            className="size-2.5 rounded-full shadow-sm"
            style={{ backgroundColor: currentPalette?.preview.accent }}
          />
        </div>

        {/* Mode Icon */}
        <motion.div
          key={actualMode}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {actualMode === 'dark' ? (
            <Moon className="size-4 text-slate-600 dark:text-slate-400" />
          ) : (
            <Sun className="size-4 text-slate-600 dark:text-slate-400" />
          )}
        </motion.div>

        <ChevronDown
          className={cn(
            'size-3.5 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95"
          >
            {/* Header */}
            <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-theme-primary" />
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  Appearance
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('palette')}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all',
                  activeTab === 'palette'
                    ? 'border-b-2 border-theme-primary text-theme-primary'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300',
                )}
              >
                <Palette className="size-4" />
                Colors
              </button>
              <button
                onClick={() => setActiveTab('mode')}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-all',
                  activeTab === 'mode'
                    ? 'border-b-2 border-theme-primary text-theme-primary'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300',
                )}
              >
                {actualMode === 'dark' ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )}
                Mode
              </button>
            </div>

            {/* Content */}
            <div className="p-3">
              <AnimatePresence mode="wait">
                {activeTab === 'palette' ? (
                  <motion.div
                    key="palette"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {themePalettes.map((palette) => (
                      <PaletteButton
                        key={palette.id}
                        palette={palette}
                        isActive={theme.palette === palette.id}
                        onClick={() => setPalette(palette.id)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="mode"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-2"
                  >
                    {modeOptions.map((mode) => {
                      const Icon = mode.icon
                      const isActive = theme.mode === mode.id
                      return (
                        <button
                          key={mode.id}
                          onClick={() => setMode(mode.id)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all',
                            isActive
                              ? 'bg-theme-primary/10 text-theme-primary'
                              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                          )}
                        >
                          <div
                            className={cn(
                              'flex size-9 items-center justify-center rounded-lg',
                              isActive
                                ? 'bg-theme-primary/20'
                                : 'bg-slate-100 dark:bg-slate-800',
                            )}
                          >
                            <Icon
                              className={cn(
                                'size-5',
                                isActive
                                  ? 'text-theme-primary'
                                  : 'text-slate-500 dark:text-slate-400',
                              )}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className={cn(
                                'text-sm font-medium',
                                isActive
                                  ? 'text-theme-primary'
                                  : 'text-slate-900 dark:text-white',
                              )}
                            >
                              {mode.label}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {mode.id === 'system'
                                ? 'Follow system settings'
                                : `Always use ${mode.label.toLowerCase()} mode`}
                            </p>
                          </div>
                          {isActive && (
                            <Check className="size-5 text-theme-primary" />
                          )}
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick toggle footer */}
            <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
              <button
                onClick={toggleMode}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {actualMode === 'dark' ? (
                  <>
                    <Sun className="size-4" />
                    Switch to Light
                  </>
                ) : (
                  <>
                    <Moon className="size-4" />
                    Switch to Dark
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface PaletteButtonProps {
  palette: (typeof themePalettes)[number]
  isActive: boolean
  onClick: () => void
}

const PaletteButton = ({ palette, isActive, onClick }: PaletteButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all',
        isActive
          ? 'border-theme-primary/40 bg-theme-primary/5 ring-2 ring-theme-primary/20'
          : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600',
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Color Preview */}
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-1">
          <div
            className="size-5 rounded-full shadow-md ring-1 ring-black/10"
            style={{ backgroundColor: palette.preview.primary }}
          />
          <div
            className="size-5 rounded-full shadow-md ring-1 ring-black/10"
            style={{ backgroundColor: palette.preview.secondary }}
          />
          <div
            className="size-5 rounded-full shadow-md ring-1 ring-black/10"
            style={{ backgroundColor: palette.preview.accent }}
          />
        </div>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex size-5 items-center justify-center rounded-full bg-theme-primary"
          >
            <Check className="size-3 text-white" />
          </motion.div>
        )}
      </div>

      {/* Name */}
      <div>
        <p
          className={cn(
            'text-sm font-semibold',
            isActive ? 'text-theme-primary' : 'text-slate-900 dark:text-white',
          )}
        >
          {palette.name}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {palette.description}
        </p>
      </div>
    </motion.button>
  )
}

// Compact version for mobile
export const ThemeSwitcherCompact = () => {
  const { theme, actualMode, toggleMode, setPalette } = useTheme()

  const currentPalette = themePalettes.find((p) => p.id === theme.palette)
  const currentPaletteIndex = themePalettes.findIndex(
    (p) => p.id === theme.palette,
  )

  const cyclePalette = () => {
    const nextIndex = (currentPaletteIndex + 1) % themePalettes.length
    setPalette(themePalettes[nextIndex].id)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Theme Mode Toggle */}
      <motion.button
        onClick={toggleMode}
        className="flex size-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/80 transition-colors hover:bg-white dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:bg-slate-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          key={actualMode}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {actualMode === 'dark' ? (
            <Moon className="size-5 text-slate-600 dark:text-slate-400" />
          ) : (
            <Sun className="size-5 text-slate-600 dark:text-slate-400" />
          )}
        </motion.div>
      </motion.button>

      {/* Palette Cycle Button */}
      <motion.button
        onClick={cyclePalette}
        className="flex size-10 items-center justify-center gap-0.5 rounded-xl border border-slate-200/60 bg-white/80 transition-colors hover:bg-white dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:bg-slate-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="size-2.5 rounded-full"
          style={{ backgroundColor: currentPalette?.preview.primary }}
        />
        <div
          className="size-2.5 rounded-full"
          style={{ backgroundColor: currentPalette?.preview.secondary }}
        />
        <div
          className="size-2.5 rounded-full"
          style={{ backgroundColor: currentPalette?.preview.accent }}
        />
      </motion.button>
    </div>
  )
}

export default ThemeSwitcher
