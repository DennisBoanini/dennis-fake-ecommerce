import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<h2 className="text-xl font-semibold">Ci spiace ma non conosciamo la pagina che stai cercando</h2>
			<Image src={'/404.svg'} alt={'404'} width={300} height={300} className={'object-contain w-full h-full'} />
			<Link href="/" className={'ecommerce-button'} title={'Home Page'}>
				Torna alla homepage
			</Link>
		</main>
	);
}
