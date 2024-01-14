import { Product } from '@/models/Product';
import Image from 'next/image';
import { toCurrency } from '@/utils/misc';
import RatingStars from '@/components/RatingStars';
import { LOW_ITEMS_LIMIT } from '@/utils/constants';

type Props = {
	product: Product;
};

export default function ProductCard(props: Props) {
	// const { product } = props;
	// const [addingToCart, setAddingToCart] = useState<boolean>(false);
	// const [productAdded, setProductAdded] = useState<boolean>(false);

	// function addToCartHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
	// 	event.preventDefault();
	// 	setAddingToCart(true);
	// 	setTimeout(() => {
	// 		const cart = Storage.get<TmpCart[]>(EStorageKey.CART);
	// 		if (!cart) {
	// 			const tmpProductElement: TmpCart = {
	// 				product: product,
	// 				quantity: 1
	// 			};
	// 			Storage.set<TmpCart[]>(EStorageKey.CART, [tmpProductElement]);
	// 		} else {
	// 			const index = cart.findIndex(item => item.product.id === product.id);
	// 			if (index >= 0) {
	// 				const updatedTmpCart = cart.map(item => {
	// 					if (item.product.id === product.id) {
	// 						return { ...item, quantity: item.quantity + 1 };
	// 					}
	//
	// 					return item;
	// 				});
	//
	// 				Storage.set<TmpCart[]>(EStorageKey.CART, updatedTmpCart);
	// 			} else {
	// 				const tmpProductElement: TmpCart = {
	// 					product: product,
	// 					quantity: 1
	// 				};
	// 				const newTmpCart = [...cart, tmpProductElement];
	// 				Storage.set<TmpCart[]>(EStorageKey.CART, newTmpCart);
	// 			}
	// 		}
	// 		setAddingToCart(false);
	// 		setProductAdded(true);
	// 		setTimeout(() => setProductAdded(false), 3000);
	// 	}, 5000);
	// }

	return (
		<>
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
					<div className={'flex-1 p-2 min-h-60'}>
						<div className={'flex flex-col h-full'}>
							<div className={'h-full'}>
								<h3 className={'text-xl font-semibold'}>{props.product.title}</h3>
								<p className={'line-clamp-2'}>{props.product.description}</p>
							</div>
							<div className={'h-full'}>
								<div className={'flex items-center justify-between'}>
									<strong>{toCurrency(props.product.price)}</strong>
									<RatingStars rating={props.product.rating} />
								</div>
							</div>
							{/* For the demo sake I set the LOW_ITEMS_LIMIT high so that we can see the alert string */}
							<div className={'h-full'}>{props.product.stock < LOW_ITEMS_LIMIT && <p className={'text-red-600'}>Ancora pochi pezzi!!</p>}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
