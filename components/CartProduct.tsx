import Image from 'next/image';
import { CartProduct } from '@/models/CartProduct';
import QuantitySelector from '@/components/QuantitySelector';
import { toCurrency } from '@/utils/misc';
import { updateQuantityProductInCart } from '@/app/actions';

type Props = {
	cartProduct: CartProduct;
};

export default function CartProduct(props: Props) {
	function onQuantityChangeHandler(direction: 'increase' | 'decrease') {
		if (direction === 'increase') {
			updateQuantityProductInCart(props.cartProduct.id, props.cartProduct.quantity + 1);
		} else {
			updateQuantityProductInCart(props.cartProduct.id, props.cartProduct.quantity - 1);
		}
	}

	return (
		<div className={'flex flex-wrap gap-4'}>
			<div>
				<Image src={props.cartProduct.thumbnail} alt={props.cartProduct.title} width={300} height={300} className={'object-contain max-w-full'} />
			</div>
			<div className={'flex flex-1 items-start justify-between'}>
				<div className={'flex flex-col flex-1 gap-2'}>
					<h2 className={'text-2xl font-semibold'}>{props.cartProduct.title}</h2>
					<p>{props.cartProduct.description}</p>
					<QuantitySelector quantity={props.cartProduct.quantity} onQuantityChange={direction => onQuantityChangeHandler(direction)} />
				</div>
				<div className={''}>
					{props.cartProduct.quantity > 1 && <span>{props.cartProduct.quantity} x </span>}
					<strong className={'text-2xl font-medium'}>{toCurrency(props.cartProduct.price)}</strong>
				</div>
			</div>
		</div>
	);
}