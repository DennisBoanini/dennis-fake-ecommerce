'use client';
import Image from 'next/image';
import { LOW_ITEMS_LIMIT } from '@/utils/constants';
import RatingStars from '@/components/RatingStars';
import { toCurrency } from '@/utils/misc';
import { Product } from '@/models/Product';
import Button from '@/components/Button';
import { addProductToCart } from '@/app/actions';

type Props = {
	product: Product;
};

export default function ProductDetail(props: Props) {
	const { product } = props;

	return (
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
				<div>
					{/*<form onSubmit={addToCartHandler}>*/}
					<Button type={'submit'} buttonText={'aggiungi al carrello'} onClick={() => addProductToCart(product)} />
					{/*</form>*/}
				</div>
			</div>
		</div>
	);
}