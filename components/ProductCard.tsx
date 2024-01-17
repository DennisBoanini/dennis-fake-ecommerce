'use client';
import { Product } from '@/models/Product';
import Image from 'next/image';
import { toCurrency } from '@/utils/misc';
import RatingStars from '@/components/RatingStars';
import { LOW_ITEMS_LIMIT } from '@/utils/constants';
import Button from '@/components/Button';
import { useServerAction } from '@/hooks/useServerAction';
import { addProductToCart } from '@/app/lib/actions';

type Props = {
	product: Product;
};

export default function ProductCard(props: Props) {
	const [addProductAction, isRunning] = useServerAction(addProductToCart);
	return (
		<div className={'hover:rounded-xl hover:shadow-2xl hover:shadow-primary-black flex flex-col hover:border hover:border-primary-black'}>
			<div className={'flex flex-col hover:cursor-pointer'}>
				<div className={'h-48'}>
					<Image
						src={props.product.thumbnail}
						alt={props.product.title}
						width={300}
						height={300}
						className={'object-cover w-full max-h-full hover:rounded-t-xl hover:border-t-primary-black'}
					/>
				</div>
				<div className={'flex-1 p-2 min-h-60 flex flex-col items-start justify-between'}>
					<div className={'h-full'}>
						<h3 className={'text-xl font-semibold'}>{props.product.title}</h3>
						<p className={'line-clamp-2'}>{props.product.description}</p>
					</div>
					<div className={'h-full w-full'}>
						<div className={'flex items-center justify-between'}>
							<strong>{toCurrency(props.product.price)}</strong>
							<RatingStars rating={props.product.rating} />
						</div>
					</div>
					{/* For the demo sake I set the LOW_ITEMS_LIMIT high so that we can see the alert string */}
					<div className={'h-full'}>{props.product.stock < LOW_ITEMS_LIMIT && <p className={'text-red-600'}>Ancora pochi pezzi!!</p>}</div>
				</div>
				<div className={'p-2'}>
					<Button
						type={'button'}
						buttonText={'aggiungi al carrello'}
						onClick={e => {
							e.preventDefault();
							addProductAction(props.product);
						}}
						isLoading={isRunning}
					/>
				</div>
			</div>
		</div>
	);
}
