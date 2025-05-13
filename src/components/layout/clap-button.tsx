"use client";

import { useState, useTransition } from "react";
import { Button } from "@/shadcn/components/ui/button";
import { clap } from "@/actions/clap";

export function ClapButton({
	slug,
	initialClaps,
}: {
	slug: string;
	initialClaps: number;
}) {
	const [confirmedClaps, setConfirmedClaps] = useState(initialClaps);
	const [isPending, startTransition] = useTransition();

	const [optimisticClaps, setOptimisticClaps] = useState(initialClaps);

	const handleClap = () => {
		setOptimisticClaps((prev) => prev + 1);

		startTransition(() => {
			clap(slug, confirmedClaps + 1).then(() => {
				setConfirmedClaps((prev) => prev + 1);
			});
		});
	};

	return (
		<div className="p-4 w-full grid place-items-center mx-auto space-y-2">
			<Button
				variant={"outline"}
				className="text-5xl h-fit cursor-pointer"
				onClick={handleClap}
				disabled={isPending}
			>
				👏
			</Button>
			<p>{optimisticClaps}</p>
		</div>
	);
}
