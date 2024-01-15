import { Product } from '@/models/Product';
import { Metadata } from 'next';
import RatingStars from '@/components/RatingStars';
import { toCurrency } from '@/utils/misc';
import { LOW_ITEMS_LIMIT } from '@/utils/constants';
import Image from 'next/image';

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
			<div className="flex w-full">
				<div className="flex-1 grid md:grid-cols-2 grid-cols-1 gap-8 m-2">
					{product.images.map((image, index) => (
						<Image
							key={`${product.title}-image-${index}`}
							src={image}
							alt={`${product.title}-image-${index}`}
							width={300}
							height={300}
							className={'object-contain w-full h-full'}
						/>
					))}
				</div>
				<div className="max-w-[40%] m-2  h-full">
					<div
						className={'rounded-full bg-primary-black text-white w-fit px-8 py-2 mb-5'}
					>{`${product.category.slice(0, 1).toUpperCase() + product.category.slice(1)}`}</div>
					<h1 className={'font-bold text-5xl'}>{`${product.brand} - ${product.title}`}</h1>
					<p className={'mt-5'}>{product.description}</p>
					<div className={'h-full my-5'}>{product.stock < LOW_ITEMS_LIMIT && <p className={'text-red-600'}>Ancora pochi pezzi!!</p>}</div>
					<div className={'h-full my-5'}>
						<div className={'flex items-center justify-between'}>
							<div className={'flex items-center'}>
								<RatingStars rating={product.rating} />({product.rating})
							</div>
							<strong className={'text-2xl font-medium'}>{toCurrency(product.price)}</strong>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
