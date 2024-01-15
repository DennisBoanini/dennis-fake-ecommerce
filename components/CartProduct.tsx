import Image from 'next/image';
import { CartProduct } from '@/models/CartProduct';
import QuantitySelector from '@/components/QuantitySelector';
import { toCurrency } from '@/utils/misc';
import { removeProductFromCart, updateQuantityProductInCart } from '@/app/actions';
import Button from '@/components/Button';

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
			<div className={'flex flex-1 items-start justify-between gap-2'}>
				<div className={'flex flex-col justify-between flex-1 gap-2 h-full'}>
					<div>
						<h2 className={'text-2xl font-semibold'}>{props.cartProduct.title}</h2>
						<p>{props.cartProduct.description}</p>
					</div>
					<div className={'flex items-center justify-between'}>
						<QuantitySelector quantity={props.cartProduct.quantity} onQuantityChange={direction => onQuantityChangeHandler(direction)} />
					</div>
				</div>
				<div className={'flex flex-col justify-between h-full min-w-48'}>
					<div>
						{props.cartProduct.quantity > 1 && <span>{props.cartProduct.quantity} x </span>}
						<strong className={'text-2xl font-medium'}>{toCurrency(props.cartProduct.price)}</strong>
					</div>
					<Button buttonText={'rimuovi'} style={'danger'} onClick={() => removeProductFromCart(props.cartProduct.id)} />
				</div>
			</div>
		</div>
	);
}
