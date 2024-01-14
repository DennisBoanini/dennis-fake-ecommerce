import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link href={'/'}>
			<Image src={'/logo.png'} alt={'Logo'} width={150} height={150} className={'object-contain'}></Image>
		</Link>
	);
}
