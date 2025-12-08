import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Palette,
  Sun,
  Moon,
  Check,
  ChevronDown,
  Sparkles,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useTheme,
  themePalettes,
  type ThemeMode,
} from '@/contexts/theme-context'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const modeOptions: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
]

export const ThemeSwitcher = () => {
  const { theme, setMode, setPalette, toggleMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'mode' | 'palette'>('palette')

  const currentPalette = themePalettes.find((p) => p.id === theme.palette)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {/* Theme Toggle Button */}
        <motion.button
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
            key={theme.mode}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme.mode === 'dark' ? (
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
      </SheetTrigger>

      <SheetContent
        side="right"
        hideClose
        className="w-full max-w-sm border-l border-slate-200/60 bg-white/95 p-0 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="flex-row items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-theme-primary" />
              <SheetTitle className="text-sm font-semibold text-slate-900 dark:text-white">
                Appearance
              </SheetTitle>
            </div>
            <SheetClose asChild>
              <button className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </button>
            </SheetClose>
          </SheetHeader>

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
              {theme.mode === 'dark' ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
              Mode
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              {activeTab === 'palette' ? (
                <motion.div
                  key="palette"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-2 gap-3"
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
                  className="space-y-3"
                >
                  {modeOptions.map((mode) => {
                    const Icon = mode.icon
                    const isActive = theme.mode === mode.id
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setMode(mode.id)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all',
                          isActive
                            ? 'bg-theme-primary/10 text-theme-primary'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                        )}
                      >
                        <div
                          className={cn(
                            'flex size-10 items-center justify-center rounded-lg',
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
                            {`Always use ${mode.label.toLowerCase()} mode`}
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
          <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-800">
            <button
              onClick={toggleMode}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {theme.mode === 'dark' ? (
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
        </div>
      </SheetContent>
    </Sheet>
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

// Compact version for mobile - opens a bottom sheet
export const ThemeSwitcherCompact = () => {
  const { theme, setMode, setPalette, toggleMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'mode' | 'palette'>('palette')

  const currentPalette = themePalettes.find((p) => p.id === theme.palette)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center gap-2">
          {/* Theme Mode Toggle */}
          <motion.button
            className="flex size-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/80 transition-colors hover:bg-white dark:border-slate-700/60 dark:bg-slate-800/80 dark:hover:bg-slate-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              key={theme.mode}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme.mode === 'dark' ? (
                <Moon className="size-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Sun className="size-5 text-slate-600 dark:text-slate-400" />
              )}
            </motion.div>
          </motion.button>

          {/* Palette Button */}
          <motion.button
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
      </SheetTrigger>

      <SheetContent
        side="bottom"
        hideClose
        className="rounded-t-3xl border-t border-slate-200/60 bg-white/95 p-0 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95"
      >
        <div className="flex flex-col">
          {/* Handle bar */}
          <div className="flex justify-center py-3">
            <div className="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-600" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-row items-center justify-between border-b border-slate-100 px-4 pb-3 pt-0 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-theme-primary" />
              <SheetTitle className="text-sm font-semibold text-slate-900 dark:text-white">
                Appearance
              </SheetTitle>
            </div>
            <SheetClose asChild>
              <button className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </button>
            </SheetClose>
          </SheetHeader>

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
              {theme.mode === 'dark' ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
              Mode
            </button>
          </div>

          {/* Content */}
          <div className="h-[50vh] overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              {activeTab === 'palette' ? (
                <motion.div
                  key="palette"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-2 gap-3"
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
                  className="grid grid-cols-2 gap-3"
                >
                  {modeOptions.map((mode) => {
                    const Icon = mode.icon
                    const isActive = theme.mode === mode.id
                    return (
                      <motion.button
                        key={mode.id}
                        onClick={() => setMode(mode.id)}
                        className={cn(
                          'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all',
                          isActive
                            ? 'border-theme-primary/40 bg-theme-primary/5 ring-2 ring-theme-primary/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600',
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Icon Preview */}
                        <div className="flex w-full items-center justify-between">
                          <div
                            className={cn(
                              'flex size-10 items-center justify-center rounded-lg',
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
                              isActive
                                ? 'text-theme-primary'
                                : 'text-slate-900 dark:text-white',
                            )}
                          >
                            {mode.label}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {`Always use ${mode.label.toLowerCase()} mode`}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick toggle footer */}
          <div className="border-t border-slate-100 px-4 py-4 pb-8 dark:border-slate-800">
            <button
              onClick={toggleMode}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {theme.mode === 'dark' ? (
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ThemeSwitcher
