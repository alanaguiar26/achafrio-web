import clsx from 'clsx'
import type { ReactNode } from 'react'

export function SectionHeader(props: { eyebrow?: string; title: string; description?: string; align?: 'left' | 'center' }) {
  return (
    <div className={clsx('max-w-3xl', props.align === 'center' && 'mx-auto text-center')}>
      {props.eyebrow ? <div className="eyebrow mb-4">{props.eyebrow}</div> : null}
      <h2 className="section-title">{props.title}</h2>
      {props.description ? <p className="section-subtitle mt-5">{props.description}</p> : null}
    </div>
  )
}

export function Surface(props: { children: ReactNode; className?: string }) {
  return <div className={clsx('glass rounded-[30px] border p-6 md:p-8', props.className)}>{props.children}</div>
}

export function Stat(props: { label: string; value: string; hint?: string }) {
  return (
    <div className="glass rounded-[28px] border p-5 md:p-6">
      <div className="kpi-value">{props.value}</div>
      <div className="mt-2 text-sm font-semibold tracking-wide text-cyan-100">{props.label}</div>
      {props.hint ? <div className="mt-2 text-sm leading-6 text-slate-400">{props.hint}</div> : null}
    </div>
  )
}
