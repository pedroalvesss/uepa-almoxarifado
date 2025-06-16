'use client'
import { useState } from 'react'
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react'
import type { ReactNode } from 'react'

interface NewTooltipProps {
	content: string
	children: ReactNode
}

export function NewTooltip({ content, children }: NewTooltipProps) {
	const [open, setOpen] = useState(false)

	const { refs, floatingStyles } = useFloating({
		placement: 'top',
		middleware: [offset(8), flip(), shift()],
		whileElementsMounted: autoUpdate,
	})

	return (
		<>
			<div
				ref={refs.setReference}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				className="inline-block"
			>
				{children}
			</div>
			{open && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					className="p-3 bg-blue-950 text-white rounded-md shadow-md border-gray-200 border-1"
				>
					{content}
				</div>
			)}
		</>
	)
}