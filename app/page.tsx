import { Product } from '@/models/Product';
import ProductList from '@/components/ProductList';
import { PAGINATION_SIZE } from '@/utils/constants';
import Pagination from '@/components/Pagination';

async function getData(pageNumber: number = 1) {
	const response = await fetch(`http://localhost:3001/products?_page=${pageNumber}&_limit=${PAGINATION_SIZE}`);

	if (!response.ok) {
		throw new Error('Error fetching data');
	}

	return {
		products: (await response.json()) as Product[],
		totalElements: Number(response.headers.get('X-Total-Count')) ?? 0
	};
}

export default async function Page({
	searchParams
}: {
	searchParams?: {
		page?: string;
	};
}) {
	const currentPage = Number(searchParams?.page) || 1;
	const { products, totalElements } = await getData(currentPage);
	return (
		<main className={'overflow-hidden mx-auto sm:px-16 px-6 py-4'}>
			<ProductList products={products} />
			<Pagination totalElements={totalElements} />
		</main>
	);
}
