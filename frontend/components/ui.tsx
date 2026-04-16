import clsx from 'clsx'
import type { ReactNode } from 'react'

export function SectionHeader(props: { eyebrow?: string; title: string; description?: string; align?: 'left' | 'center'; compact?: boolean }) {
  return (
    <div className={clsx('max-w-3xl', props.align === 'center' && 'mx-auto text-center')}>
      {props.eyebrow ? <div className="eyebrow mb-4">{props.eyebrow}</div> : null}
      <h2 className={clsx(props.compact ? 'section-title-sm' : 'section-title')}>{props.title}</h2>
      {props.description ? <p className="section-subtitle mt-5">{props.description}</p> : null}
    </div>
  )
}

export function Surface(props: { children: ReactNode; className?: string }) {
  return <div className={clsx('glass rounded-[32px] border p-6 md:p-8', props.className)}>{props.children}</div>
}

export function Stat(props: { label: string; value: string; hint?: string; accent?: 'cyan' | 'violet' | 'emerald' }) {
  const accentClass = props.accent === 'violet'
    ? 'text-violet-200'
    : props.accent === 'emerald'
      ? 'text-emerald-200'
      : 'text-cyan-100'

  return (
    <div className="glass rounded-[28px] border p-5 md:p-6">
      <div className="kpi-value">{props.value}</div>
      <div className={clsx('mt-3 text-sm font-semibold tracking-[0.08em] uppercase', accentClass)}>{props.label}</div>
      {props.hint ? <div className="mt-2 text-sm leading-6 text-slate-400">{props.hint}</div> : null}
    </div>
  )
}

export function EmptyState(props: { title: string; description: string; action?: ReactNode; className?: string }) {
  return (
    <div className={clsx('surface-inset p-6 md:p-7', props.className)}>
      <div className="text-xl font-semibold text-white">{props.title}</div>
      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">{props.description}</p>
      {props.action ? <div className="mt-5">{props.action}</div> : null}
    </div>
  )
}
