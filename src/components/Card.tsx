import type { ReactNode } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface CardWithTitleProps {
	children: ReactNode
	style?: string
}

interface CardWithRedirectProps {
	icon: ReactNode
	title: string
	subtitle: string
	buttonTitle: string
	link: string
}

export const CardWithTitle = ({ children, style }: CardWithTitleProps) => {
	return (
		<div
			className={
				style
					? style
					: 'flex w-full flex-col gap-1 rounded-md border bg-[#FFFFFF] p-8 shadow-xl dark:bg-background'
			}
		>
			{children}
		</div>
	)
}

export const CardWithRedirect = ({
	icon,
	title,
	subtitle,
	buttonTitle,
	link,
}: CardWithRedirectProps) => {
	return (
		<div className="flex w-full min-w-[16rem] flex-col items-center justify-center gap-4 rounded-md border bg-[#FFFFFF] p-6 text-center hover:shadow-xl lg:w-fit lg:max-w-[28rem] lg:items-start lg:justify-start dark:bg-background">
			<div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
				<div className="flex size-12 items-center justify-center rounded-full bg-[#F7F4F3] dark:bg-background">
					{icon}
				</div>

				<h2 className="text-[1.1rem] text-gray-700 tracking-wide lg:text-[1.3rem] dark:text-gray-200">
					{title}
				</h2>
			</div>
			<h4 className="max-w-[95%] text-left font-medium text-[1rem] text-gray-500 tracking-tight lg:text-[1.1rem] dark:text-gray-400">
				{subtitle}
			</h4>

			<Link href={link} className="w-fit">
				<Button className="cursor-pointer w-fit border-2 border-gray-700 bg-[#F7F4F3] text-black hover:bg-[#f5d2c6] dark:bg-[#2C6E49] dark:text-white">
					{buttonTitle}
				</Button>
			</Link>
		</div>
	)
}
