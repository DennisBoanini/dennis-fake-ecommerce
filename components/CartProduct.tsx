import Image from 'next/image';
import { CartProduct } from '@/models/CartProduct';
import QuantitySelector from '@/components/QuantitySelector';
import { toCurrency } from '@/utils/misc';
import { removeProductFromCart, updateQuantityProductInCart } from '@/app/actions';
import Button from '@/components/Button';
import { useServerAction } from '@/hooks/useServerAction';

type Props = {
	cartProduct: CartProduct;
};

export default function CartProduct(props: Props) {
	const [runRemoveAction, isRemoveActionRunning] = useServerAction(removeProductFromCart);
	const [updateProductQuantityAction, isUpdateProductQuantityActionRunning] = useServerAction(updateQuantityProductInCart);

	function onUpdateQuantityHandler(actionType: 'increase' | 'decrease') {
		if (actionType === 'increase') {
			updateProductQuantityAction(props.cartProduct.id, props.cartProduct.quantity + 1);
		} else {
			updateProductQuantityAction(props.cartProduct.id, props.cartProduct.quantity - 1);
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
						<QuantitySelector
							isLoading={isUpdateProductQuantityActionRunning}
							quantity={props.cartProduct.quantity}
							productId={props.cartProduct.id}
							disabled={isRemoveActionRunning}
							onQuantityChange={actionType => onUpdateQuantityHandler(actionType)}
						/>
					</div>
				</div>
				<div className={'flex flex-col justify-between h-full min-w-48'}>
					<div>
						{props.cartProduct.quantity > 1 && <span>{props.cartProduct.quantity} x </span>}
						<strong className={'text-2xl font-medium'}>{toCurrency(props.cartProduct.price)}</strong>
					</div>
					<Button
						buttonText={'rimuovi'}
						style={'danger'}
						isLoading={isRemoveActionRunning}
						disabled={isUpdateProductQuantityActionRunning}
						onClick={async () => runRemoveAction(props.cartProduct.id)}
					/>
				</div>
			</div>
		</div>
	);
}
