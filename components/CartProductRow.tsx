'use client';
import { CartProduct } from '@/models/CartProduct';
import { removeProductFromCart, updateQuantityProductInCart } from '@/app/lib/actions';
import { useServerAction } from '@/hooks/useServerAction';
import Image from 'next/image';
import QuantitySelector from '@/components/QuantitySelector';
import { toCurrency } from '@/utils/misc';
import Trash from '@/components/Trash';
import Spinner from '@/components/Spinner';
import { useState } from 'react';

type Props = {
	cartProduct: CartProduct;
};

export default function CartProductRow(props: Props) {
	const [runRemoveAction, isRemoveActionRunning] = useServerAction(removeProductFromCart);
	const [updateProductQuantityAction, isUpdateProductQuantityActionRunning] = useServerAction(updateQuantityProductInCart);
	const [serverActionResult, setServerActionResult] = useState<{ error: string } | undefined>(undefined);

	async function onUpdateQuantityHandler(actionType: 'increase' | 'decrease') {
		if (actionType === 'increase') {
			setServerActionResult(await updateProductQuantityAction(props.cartProduct.id, props.cartProduct.quantity + 1));
		} else {
			setServerActionResult(await updateProductQuantityAction(props.cartProduct.id, props.cartProduct.quantity - 1));
		}
	}

	return (
		<div className={'flex flex-col md:flex-row'}>
			<Image src={props.cartProduct.thumbnail} alt={props.cartProduct.title} width={300} height={300} className={'object-contain w-full md:w-96'} />
			<div className={'flex flex-col lg:flex-row items-start justify-between px-0 md:px-3 py-2 w-full'}>
				<div className={'w-full'}>
					<div className={'flex flex-col'}>
						<h1 className={'font-bold text-3xl'}>{`${props.cartProduct.brand} - ${props.cartProduct.title}`}</h1>
						<p className={'mt-5 text-xl text-gray-500'}>{props.cartProduct.description}</p>
					</div>
					<div className={'flex justify-center md:justify-start my-5'}>
						<QuantitySelector
							isLoading={isUpdateProductQuantityActionRunning}
							quantity={props.cartProduct.quantity}
							productId={props.cartProduct.id}
							disabled={isRemoveActionRunning}
							onQuantityChange={actionType => onUpdateQuantityHandler(actionType)}
						/>
					</div>
					{serverActionResult?.error && (
						<strong
							className={'text-red-600 font-medium text-xl'}
						>{`Si è verificato un errore durante l'aggiornamento della quantità. Per favore riprova.`}</strong>
					)}
				</div>
				<div className={'flex flex-row justify-between items-center w-full md:max-w-48'}>
					<div className={''}>
						{props.cartProduct.quantity > 1 && <span>{props.cartProduct.quantity} x </span>}
						<strong className={'text-2xl font-medium'}>{toCurrency(props.cartProduct.price)}</strong>
					</div>
					<div
						className={`hover:cursor-pointer ${isUpdateProductQuantityActionRunning || isRemoveActionRunning ? 'opacity-45 hover:cursor-not-allowed pointer-events-none' : ''}`}
						aria-disabled={isUpdateProductQuantityActionRunning || isRemoveActionRunning}
						onClick={() => runRemoveAction(props.cartProduct.id)}
					>
						{!isRemoveActionRunning && <Trash />}
						{isRemoveActionRunning && <Spinner />}
					</div>
				</div>
			</div>
		</div>
	);
}
