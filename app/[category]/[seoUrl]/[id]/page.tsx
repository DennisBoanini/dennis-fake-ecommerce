import { Product } from '@/models/Product';
import { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';
import { ServerResponse } from '@/models/ServerResponse';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
	const response = await fetch(`http://localhost:3001/products/${id}`);
	if (response.status.toString().charAt(0) === '5') {
		throw new Error('Error fetching data');
	}

	if (response.status === 404) {
		return {};
	}

	const json = await response.json();
	const product = json as Product;
	let openGraphImages: { url: string }[] = [];
	product.images.map(url => openGraphImages.push({ url }));

	return {
		title: product.title,
		description: product.description,
		openGraph: { images: openGraphImages }
	};
}

async function getData(id: string): Promise<ServerResponse<Product>> {
	const res = await fetch(`http://localhost:3001/products/${id}`);

	if (res.status === 404) {
		return {
			result: undefined,
			errorMessage: `Si è verificato un errore durante il recupero del prodotto. Si prega di riprovare più tardi o contattare il nostro servizio clienti`
		};
	}

	if (res.status.toString().charAt(0) === '5') {
		throw new Error(`Error fetching data, error ${res.status}`);
	}

	const product = (await res.json()) as Product;
	return { result: product, errorMessage: undefined };
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
	const serverResponse: ServerResponse<Product> = await getData(id);

	if (!serverResponse.result) {
		notFound();
	}

	return (
		<section className={'overflow-hidden mx-auto sm:px-16 px-6 py-4'}>{serverResponse.result && <ProductDetail product={serverResponse.result} />}</section>
	);
}
