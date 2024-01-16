import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { footerLinks } from '@/utils/footerLinks';

export default function Footer() {
	return (
		<footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
			<div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10 items-center md:items-start">
				<div className="flex flex-col justify-start items-start gap-6">
					<Logo />
					<p className="text-base text-gray-700">
						Adorea ECommerce 2024 <br />
						Tutti i diritti riservati &copy;
					</p>
				</div>

				<div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20 items-center md:items-start">
					{footerLinks.map(item => (
						<div key={item.title} className="flex flex-col gap-6 text-base min-w-[170px]">
							<h3 className="font-bold">{item.title}</h3>
							<div className={`flex ${item.isSocial ? 'flex-row' : 'flex-col'} gap-5`}>
								{item.links.map(link => (
									<Link key={link.title} href={link.url} title={link.title} className="text-gray-500">
										{item.isSocial ? (
											<Image src={`/${link.title}.svg`} alt={link.title} width={40} height={40} className={'object-contain'} />
										) : (
											link.title
										)}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
				<p>@2024 Adorea ECommerce</p>

				<div className="flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10">
					<Link href="/privacy-policy" className="text-gray-500" title={'Privacy Policy'}>
						Privacy & Policy
					</Link>
					<Link href="/termini-e-condizioni" className="text-gray-500" title={'Termini e Condizioni'}>
						Termini & Condizioni
					</Link>
				</div>
			</div>
		</footer>
	);
}
