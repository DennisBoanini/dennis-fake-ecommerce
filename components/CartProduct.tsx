import Image from 'next/image';
import { CartProduct } from '@/models/CartProduct';
import QuantitySelector from '@/components/QuantitySelector';
import { toCurrency } from '@/utils/misc';

type Props = {
	cartProduct: CartProduct;
	quantity: number;
	// updateTmpCartHandler: (tmpCart: TmpCart[]) => void;
};

export default function CartProduct(props: Props) {
	// function editQuantityHandler(action: 'decrease' | 'increase') {
	// 	const tmpCart = Storage.get<TmpCart[]>(EStorageKey.CART);
	// 	if (action === 'decrease') {
	// 		const updatedCart =
	// 			tmpCart?.map(item => {
	// 				if (item.product.id === props.product.id) {
	// 					return { ...item, quantity: quantity > 1 ? item.quantity - 1 : 1 };
	// 				}
	//
	// 				return item;
	// 			}) ?? [];
	// 		Storage.set<TmpCart[]>(EStorageKey.CART, updatedCart);
	// 		setQuantity(prevState => (quantity > 1 ? prevState - 1 : 1));
	// 	} else {
	// 		const updatedCart =
	// 			tmpCart?.map(item => {
	// 				if (item.product.id === props.product.id) {
	// 					return { ...item, quantity: item.quantity + 1 };
	// 				}
	//
	// 				return item;
	// 			}) ?? [];
	// 		Storage.set<TmpCart[]>(EStorageKey.CART, updatedCart);
	// 		setQuantity(prevState => prevState + 1);
	// 	}
	//
	// 	props.updateTmpCartHandler(Storage.get<TmpCart[]>(EStorageKey.CART)!);
	// }

	return (
		<div className={'flex flex-wrap gap-4'}>
			<div>
				<Image src={props.cartProduct.thumbnail} alt={props.cartProduct.title} width={300} height={300} className={'object-contain max-w-full'} />
			</div>
			<div className={'flex flex-1 items-start justify-between'}>
				<div className={'flex flex-col flex-1 gap-2'}>
					<h2 className={'text-2xl font-semibold'}>{props.cartProduct.title}</h2>
					<p>{props.cartProduct.description}</p>
					<QuantitySelector quantity={props.cartProduct.quantity} />
				</div>
				<div className={''}>
					{props.cartProduct.quantity > 1 && <span>{props.cartProduct.quantity} x </span>}
					<strong className={'text-2xl font-medium'}>{toCurrency(props.cartProduct.price)}</strong>
				</div>
			</div>
		</div>
	);
}
