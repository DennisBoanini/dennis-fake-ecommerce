import { Product } from '@/models/Product';
import ProductList from '@/components/ProductList';

async function getData() {
	const res = await fetch('http://localhost:3001/products');

	if (!res.ok) {
		throw new Error('Error fetching data');
	}

	return res.json();
}
export default async function Home() {
	const products: Product[] = await getData();
	return (
		<main className={'overflow-hidden mx-auto sm:px-16 px-6 py-4'}>
			<ProductList products={products} />
		</main>
	);
}
