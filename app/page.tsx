import { Product } from '@/models/Product';
import ProductList from '@/components/ProductList';
import { PAGINATION_SIZE } from '@/utils/constants';
import Pagination from '@/components/Pagination';
import { ServerResponse } from '@/models/ServerResponse';
import { notFound } from 'next/navigation';

async function getData(pageNumber: number = 1): Promise<
	ServerResponse<{
		products: Product[];
		totalElements: number;
	}>
> {
	const response = await fetch(`http://localhost:3001/products?_page=${pageNumber}&_limit=${PAGINATION_SIZE}`);

	if (response.status === 404) {
		return {
			result: undefined,
			errorMessage: `Si è verificato un errore durante il recupero della lista prodotti. Si prega di riprovare più tardi o contattare il nostro servizio clienti`
		};
	}

	if (response.status.toString().charAt(0) === '5') {
		throw new Error(`Error fetching data, error ${response.status}`);
	}

	const products = (await response.json()) as Product[];
	return {
		result: {
			products,
			totalElements: Number(response.headers.get('X-Total-Count')) ?? 0
		},
		errorMessage: undefined
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
	const serverResponse = await getData(currentPage);

	if (!serverResponse.result) {
		notFound();
	}

	return (
		<main className={'overflow-hidden mx-auto sm:px-16 px-6 py-4'}>
			{serverResponse.result && (
				<>
					<ProductList products={serverResponse.result.products} />
					<Pagination totalElements={serverResponse.result.totalElements} />
				</>
			)}
		</main>
	);
}
