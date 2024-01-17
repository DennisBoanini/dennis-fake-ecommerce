'use client';

import { startTransition, useEffect } from 'react';
import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	const router = useRouter();
	useEffect(() => {
		// Optionally log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<h2 className="text-center">{`Oops, sembra che qualcosa sia andato storto. Ci scusiamo per l'inconveniente`}</h2>
			<Image src={'/sorry.png'} alt={'Sorry'} width={300} height={300} className={'object-contain w-96'} />
			<div>
				<Button
					buttonText={'Riprova'}
					onClick={() => {
						const url = new URL(window.location.href);
						router.push(url.origin + url.pathname);
						router.refresh();
						startTransition(() => reset());
					}}
				/>
			</div>
		</main>
	);
}
