'use client';
import { Cart } from '@/models/Cart';
import { Fragment, useEffect, useState } from 'react';
import CartProduct from '@/components/CartProduct';
import { toCurrency } from '@/utils/misc';
import { SHIPPING_PRICE } from '@/utils/constants';

type Props = {
	cart: Cart;
};

export default function CartList(props: Props) {
	const [subtotal, setSubtotal] = useState<number>(0);

	useEffect(() => {
		setSubtotal(props.cart.reduce((a, b) => (a += b.quantity * b.price), 0));
	}, [props.cart]);

	return (
		<div className={'flex items-start justify-between gap-8'}>
			<div className={'flex-1 flex flex-col gap-4'}>
				{props.cart.map((item, index) => (
					<Fragment key={item.id}>
						<CartProduct cartProduct={item} />
						{index !== props.cart.length - 1 && <div className={'border'}></div>}
					</Fragment>
				))}
			</div>

			<div className={'flex flex-col border min-w-96 rounded-md border-primary-black p-2 shadow-md shadow-gray-200'}>
				<h2 className={'font-bold text-2xl'}>Riassunto</h2>

				<div className={'mt-8'}>
					<div className={'flex items-center justify-between'}>
						<span>Subtotale (IVA inclusa)</span>
						<span>{toCurrency(subtotal)}</span>
					</div>
					<div className={'flex items-center justify-between'}>
						<span>Spedizione</span>
						<span>{toCurrency(SHIPPING_PRICE)}</span>
					</div>
					<div className={'border my-2'} />
					<div className={'flex items-center justify-between my-2'}>
						<strong>Totale</strong>
						<span>{toCurrency(subtotal + SHIPPING_PRICE)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
