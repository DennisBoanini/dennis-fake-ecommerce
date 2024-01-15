'use client';
import { Cart } from '@/models/Cart';
import { Fragment, useEffect, useState } from 'react';
import CartProductRow from '@/components/CartProductRow';
import OrderSummaryBox from '@/components/OrderSummaryBox';

type Props = {
	cart: Cart;
};

export default function CartList(props: Props) {
	const [subtotal, setSubtotal] = useState<number>(0);

	useEffect(() => {
		setSubtotal(props.cart.reduce((a, b) => (a += b.quantity * b.price), 0));
	}, [props.cart]);

	return (
		<div className={'flex flex-col-reverse xl:flex-row gap-4'}>
			<div>
				{props.cart.length === 0 && (
					<div className={'flex items-center justify-center text-2xl font-medium'}>
						<h2>Nessun articolo nel carrello.</h2>
					</div>
				)}
				{props.cart.map((item, index) => (
					<Fragment key={item.id}>
						<CartProductRow cartProduct={item} />
						{index !== props.cart.length - 1 && <div className={'border my-5'}></div>}
					</Fragment>
				))}
			</div>
			<div className={'w-full xl:max-w-sm'}>
				<OrderSummaryBox subtotal={subtotal} />
			</div>
		</div>
	);
}
