import CartList from '@/components/CartList';
import { Metadata } from 'next';
import { Cart } from '@/models/Cart';
import { ServerResponse } from '@/models/ServerResponse';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Carrello'
};

async function getData(): Promise<ServerResponse<Cart>> {
	const res = await fetch('http://localhost:3001/carts');

	if (Math.floor(Math.random() * 2) === 5) {
		throw new Error('Error loading cart');
	}

	if (res.status === 404) {
		return {
			result: undefined,
			errorMessage: `Si è verificato un errore durante il recupero del tuo carrello. Si prega di riprovare più tardi o contattare il nostro servizio clienti`
		};
	}

	if (res.status.toString().charAt(0) === '5') {
		throw new Error(`Error fetching data, error ${res.status}`);
	}

	const cart: Cart = await res.json();
	return { result: cart, errorMessage: undefined };
}

export default async function Page() {
	const serverResponse: ServerResponse<Cart> = await getData();

	if (!serverResponse.result) {
		notFound();
	}

	return <main className={'overflow-hidden mx-auto sm:px-16 px-6 py-4'}>{serverResponse.result && <CartList cart={serverResponse.result} />}</main>;
}
