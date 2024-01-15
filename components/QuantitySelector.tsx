'use client';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';

type Props = {
	onQuantityChange: (type: 'increase' | 'decrease') => void;
	quantity: number;
	productId: number;
	isLoading: boolean;
	disabled: boolean;
};

export default function QuantitySelector(props: Props) {
	return (
		<div
			className={`flex items-center gap-4 w-auto ${(props.isLoading || props.disabled) && 'hover:cursor-not-allowed opacity-45 cursor-not-allowed'}`}
			aria-disabled={props.isLoading || props.disabled}
		>
			{!props.isLoading && (
				<>
					<Button
						buttonText={'-'}
						onClick={() => props.onQuantityChange('decrease')}
						disabled={props.quantity === 1 || props.disabled}
						aria-disabled={props.quantity === 1 || props.disabled}
						className={`${props.disabled && 'hover:cursor-not-allowed opacity-45 cursor-not-allowed'}`}
					/>
					<span>{props.quantity}</span>
					<Button
						buttonText={'+'}
						onClick={() => props.onQuantityChange('increase')}
						disabled={props.disabled}
						aria-disabled={props.disabled}
						className={`${props.disabled && 'hover:cursor-not-allowed opacity-45 cursor-not-allowed'}`}
					/>
				</>
			)}
			{props.isLoading && <Spinner />}
		</div>
	);
}
