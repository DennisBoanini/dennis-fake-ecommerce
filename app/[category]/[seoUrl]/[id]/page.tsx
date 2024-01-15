import { Product } from '@/models/Product';
import { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
	const response = await fetch(`http://localhost:3001/products/${id}`);
	if (!response.ok) {
		throw new Error('Error fetching data');
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

async function getData(id: string) {
	const res = await fetch(`http://localhost:3001/products/${id}`);

	if (!res.ok) {
		throw new Error('Error fetching data');
	}

	return res.json();
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
	const product: Product = await getData(id);

	return (
		<section className={'overflow-hidden mx-auto sm:px-16 px-6 py-4'}>
			<ProductDetail product={product} />
		</section>
	);
}
