"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ContributionDay {
    color: string
    contributionCount: number
    contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"
    date: string
}

interface GithubContributionData {
    contributions: ContributionDay[][]
    totalContributions: number
}

interface GithubCalendarProps {
    username: string
    variant?: "default" | "city-lights" | "minimal"
    shape?: "square" | "rounded" | "circle" | "squircle"
    glowIntensity?: number
    className?: string
    showTotal?: boolean
    colorSchema?: "green" | "blue" | "purple" | "orange" | "gray"
}

// Color schemas for custom styling
const colorSchemas = {
    gray: {
        level0: "bg-zinc-100 dark:bg-zinc-900",
        level1: "bg-zinc-300 dark:bg-zinc-800",
        level2: "bg-zinc-400 dark:bg-zinc-700",
        level3: "bg-zinc-600 dark:bg-zinc-500",
        level4: "bg-zinc-800 dark:bg-zinc-300",
    },
    green: {
        level0: "bg-zinc-100 dark:bg-zinc-900",
        level1: "bg-emerald-200 dark:bg-emerald-900",
        level2: "bg-emerald-300 dark:bg-emerald-700",
        level3: "bg-emerald-400 dark:bg-emerald-500",
        level4: "bg-emerald-500 dark:bg-emerald-400",
    },
    blue: {
        level0: "bg-zinc-100 dark:bg-zinc-900",
        level1: "bg-blue-200 dark:bg-blue-900",
        level2: "bg-blue-300 dark:bg-blue-700",
        level3: "bg-blue-400 dark:bg-blue-500",
        level4: "bg-blue-500 dark:bg-blue-400",
    },
    purple: {
        level0: "bg-zinc-100 dark:bg-zinc-900",
        level1: "bg-purple-200 dark:bg-purple-900",
        level2: "bg-purple-300 dark:bg-purple-700",
        level3: "bg-purple-400 dark:bg-purple-500",
        level4: "bg-purple-500 dark:bg-purple-400",
    },
    orange: {
        level0: "bg-zinc-100 dark:bg-zinc-900",
        level1: "bg-orange-200 dark:bg-orange-900",
        level2: "bg-orange-300 dark:bg-orange-700",
        level3: "bg-orange-400 dark:bg-orange-500",
        level4: "bg-orange-500 dark:bg-orange-400",
    },
}

function getLevelClass(level: string, schema: keyof typeof colorSchemas = "green") {
    const s = colorSchemas[schema]
    switch (level) {
        case "FIRST_QUARTILE":
            return s.level1
        case "SECOND_QUARTILE":
            return s.level2
        case "THIRD_QUARTILE":
            return s.level3
        case "FOURTH_QUARTILE":
            return s.level4
        case "NONE":
        default:
            return s.level0
    }
}

function getShapeClass(shape: string) {
    switch (shape) {
        case "circle":
            return "rounded-full"
        case "square":
            return "rounded-none"
        case "squircle":
            return "rounded-sm"
        case "rounded":
        default:
            return "rounded-[2px]"
    }
}

export function GithubCalendar({
    username,
    variant = "default",
    shape = "rounded",
    glowIntensity = 5,
    className,
    showTotal = true,
    colorSchema = "green",
}: GithubCalendarProps) {
    const [data, setData] = React.useState<GithubContributionData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    `https://github-contributions-api.deno.dev/${username}.json`
                )
                if (!response.ok) {
                    throw new Error("Failed to fetch GitHub data")
                }
                const jsonData = await response.json()
                setData(jsonData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
            } finally {
                setLoading(false)
            }
        }

        if (username) {
            fetchData()
        }
    }, [username])

    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (data && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
        }
    }, [data])

    const weeks = data?.contributions || []

    const monthLabels = React.useMemo(() => {
        if (!weeks.length) return []
        const labels: { index: number; label: string }[] = []
        let lastMonth = -1

        weeks.forEach((week, index) => {
            const firstDay = week.find(d => d)
            if (firstDay) {
                const date = new Date(firstDay.date)
                const month = date.getMonth()
                if (month !== lastMonth) {
                    labels.push({ index, label: date.toLocaleString('default', { month: 'short' }) })
                    lastMonth = month
                }
            }
        })
        return labels
    }, [weeks])

    if (error) {
        return (
            <div className={cn("p-4 rounded-lg border border-red-200 bg-red-50 text-red-500 text-sm", className)}>
                Error: {error}
            </div>
        )
    }

    if (loading) {
        return (
            <div className={cn("w-full h-48 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl", className)} />
        )
    }

    return (
        <TooltipProvider delayDuration={0}>
            <div className={cn("w-full flex flex-col gap-4", className)}>
                {showTotal && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20" data-view-component="true" className="fill-current text-primary">
                                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                                </svg>
                                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm tracking-tight leading-none mb-1">@{username}</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="flex h-1.5 w-1.5 rounded-full bg-primary/40" />
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Live Activity</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end">
                            <span className="text-xl sm:text-2xl font-black font-doto text-primary">
                                {data?.totalContributions.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                Contributions in the last year
                            </span>
                        </div>
                    </div>
                )}

                <div className="relative group">
                    <div 
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory scroll-smooth"
                    >
                        {/* Day Labels - Fixed on the left if possible, or just scrolling with it */}
                        <div className="flex flex-col gap-[2px] sm:gap-[3px] pt-[22px] sm:pt-[26px] text-[10px] text-muted-foreground select-none pr-1">
                            <div className="h-[10px] sm:h-[14px] flex items-center">Mon</div>
                            <div className="h-[10px] sm:h-[14px]"></div>
                            <div className="h-[10px] sm:h-[14px] flex items-center">Wed</div>
                            <div className="h-[10px] sm:h-[14px]"></div>
                            <div className="h-[10px] sm:h-[14px] flex items-center">Fri</div>
                            <div className="h-[10px] sm:h-[14px]"></div>
                            <div className="h-[10px] sm:h-[14px]"></div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {/* Month Labels */}
                            <div className="flex relative h-4 mb-2">
                                {monthLabels.map((ml, i) => (
                                    <div 
                                        key={i} 
                                        className="absolute text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap font-medium"
                                        style={{ left: `calc(${ml.index} * (10px + 2px))` }} // Base mobile width
                                        data-desktop-left={`calc(${ml.index} * (14px + 3px))`} // To be handled by a class or just approximation
                                    >
                                        <style dangerouslySetInnerHTML={{ __html: `
                                            @media (min-width: 640px) {
                                                .month-label-${i} { left: calc(${ml.index} * (14px + 3px)) !important; }
                                            }
                                        `}} />
                                        <span className={`month-label-${i}`}>{ml.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div 
                                className="flex flex-nowrap gap-[2px] sm:gap-[3px] snap-x snap-mandatory"
                                role="grid"
                                aria-label={`GitHub contribution calendar for ${username}`}
                            >
                                {weeks.map((week, weekIndex) => (
                                    <div 
                                        key={weekIndex} 
                                        className="flex flex-col gap-[2px] sm:gap-[3px] w-[10px] sm:w-[14px] flex-shrink-0 snap-align-start"
                                        role="row"
                                    >
                                        {week.map((day, dayIndex) => {
                                            const isGlowing = variant === "city-lights" && day.contributionCount > 0
                                            const isMinimal = variant === "minimal"
                                            const shapeClass = getShapeClass(shape)

                                            return (
                                                <Tooltip key={day.date}>
                                                    <TooltipTrigger asChild>
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{
                                                                delay: weekIndex * 0.005 + dayIndex * 0.005,
                                                                type: "spring",
                                                                stiffness: 260,
                                                                damping: 20
                                                            }}
                                                            className={cn(
                                                                "w-full aspect-square transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                                                getLevelClass(day.contributionLevel, colorSchema),
                                                                isGlowing && "z-10",
                                                                shapeClass,
                                                                isMinimal && "rounded-full scale-75",
                                                            )}
                                                            role="gridcell"
                                                            aria-label={`${day.contributionCount} contributions on ${day.date}`}
                                                            tabIndex={0}
                                                            style={
                                                                isGlowing ? {
                                                                    boxShadow: day.contributionLevel !== "NONE"
                                                                        ? `0 0 ${day.contributionCount > 3 ? `${glowIntensity * 1.5}px` : `${glowIntensity}px`} ${colorSchema === "green" ? "#10b981" :
                                                                            colorSchema === "blue" ? "#3b82f6" :
                                                                                colorSchema === "purple" ? "#a855f7" :
                                                                                    "#f97316"
                                                                        }`
                                                                        : "none"
                                                                } : undefined
                                                            }
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="flex flex-col items-center gap-0.5 px-3 py-1.5 bg-zinc-900 border-zinc-800 text-white dark:bg-white dark:text-zinc-900 shadow-2xl">
                                                        <span className="font-bold text-[13px]">{day.contributionCount} contributions</span>
                                                        <span className="text-[11px] opacity-60">{day.date}</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-border/10 pt-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                        <span className="flex h-2 w-2 rounded-full bg-primary" />
                        Activity Legend
                    </div>
                    <div className="flex items-center gap-3 select-none">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Less</span>
                        <div className="flex gap-1.5">
                            {[0, 1, 2, 3, 4].map((level) => (
                                <Tooltip key={level}>
                                    <TooltipTrigger asChild>
                                        <div className={cn(
                                            "size-3 sm:size-3.5 rounded-[2px] cursor-help transition-transform hover:scale-110",
                                            level === 0 ? colorSchemas[colorSchema].level0 :
                                            level === 1 ? colorSchemas[colorSchema].level1 :
                                            level === 2 ? colorSchemas[colorSchema].level2 :
                                            level === 3 ? colorSchemas[colorSchema].level3 :
                                            colorSchemas[colorSchema].level4
                                        )} />
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="text-[10px] px-2 py-1 uppercase tracking-tight font-bold">
                                        Level {level}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">More</span>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
