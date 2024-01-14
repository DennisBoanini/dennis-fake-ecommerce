import CartList from '@/components/CartList';
import { Metadata } from 'next';
import { Cart } from '@/models/Cart';

export const metadata: Metadata = {
	title: 'Carrello'
};

async function getData() {
	const res = await fetch('http://localhost:3001/carts');

	if (!res.ok) {
		throw new Error('Error fetching data');
	}

	return res.json();
}

export default async function Page() {
	const cart: Cart = await getData();

	return (
		<main className={'overflow-hidden mx-auto sm:px-16 px-6 py-4'}>
			<CartList cart={cart} />
		</main>
	);
}
