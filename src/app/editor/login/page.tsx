"use client";

import { loginAction } from "@/actions/auth";
import { useActionState } from "react";

export default function LoginPage() {
	const [state, action, isPending] = useActionState(loginAction, null);

	return (
		<div className="flex min-h-dvh items-center justify-center px-4">
			<form action={action} className="flex flex-col gap-4 w-full max-w-sm">
				<h1 className="text-xl font-bold">Editor Login</h1>

				{state?.error && (
					<p className="text-sm text-red-500">{state.error}</p>
				)}

				<div className="flex flex-col gap-1">
					<label htmlFor="username" className="text-sm text-zinc-500">
						Username
					</label>
					<input
						id="username"
						name="username"
						type="text"
						autoComplete="username"
						required
						className="rounded border border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="password" className="text-sm text-zinc-500">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						className="rounded border border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400"
					/>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 disabled:opacity-50"
				>
					{isPending ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
}
