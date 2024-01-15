'use client';
import Button from '@/components/Button';

type Props = {
	onQuantityChange: (type: 'increase' | 'decrease') => void;
	quantity: number;
};

export default function QuantitySelector(props: Props) {
	return (
		<div className="mt-5 flex items-center gap-4 w-28">
			<Button buttonText={'-'} onClick={() => props.onQuantityChange('decrease')} disabled={props.quantity === 1} />
			<span>{props.quantity}</span>
			<Button buttonText={'+'} onClick={() => props.onQuantityChange('increase')} />
		</div>
	);
}