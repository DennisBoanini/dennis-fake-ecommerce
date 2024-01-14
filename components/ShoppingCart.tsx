import Image from 'next/image';
import CartBadge from './CartBadge';
import Link from 'next/link';

type Props = {
	totalElements: number;
};

export default function ShoppingCart(props: Props) {
	return (
		<Link href={'/carrello'} className={'relative cursor-pointer'} title={'Carrello'}>
			<Image src={'/shopping-cart.svg'} alt={'Shopping Cart'} className={'object-contain'} width={30} height={30} />
			<CartBadge totalElements={props.totalElements} />
		</Link>
	);
}
