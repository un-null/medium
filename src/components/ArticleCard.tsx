import { Card, CardContent } from "@/shadcn/components/ui/card";
import Link from "next/link";

interface Props {
	slug: string;
	title: string;
	date: string;
}

export function ArticleCard({ slug, title, date }: Props) {
	return (
		<Card className="p-0 overflow-hidden border-none shadow-none bg-transparent">
			<Link href={`/article/${slug}`} className="group">
				<CardContent className="aspect-square bg-slate-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center p-6 transition-colors group-hover:bg-slate-200 dark:group-hover:bg-zinc-700">
					<div className="w-full h-full bg-white dark:bg-zinc-950 rounded-sm shadow-sm dark:shadow-md flex flex-col p-4 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
						<span className="text-[10px] font-mono text-zinc-400 mb-2">
							{date.replace(/-/g, ".")}
						</span>
						<p className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
							{title}
						</p>
						<div className="mt-auto space-y-1 opacity-20">
							<div className="h-1 w-full bg-zinc-400 rounded-full" />
							<div className="h-1 w-3/4 bg-zinc-400 rounded-full" />
						</div>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
