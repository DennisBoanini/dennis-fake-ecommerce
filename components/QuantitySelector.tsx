import Button from '@/components/Button';

type Props = {
	onQuantityChange?: (type: 'increase' | 'decrease') => void;
	quantity: number;
};

export default function QuantitySelector(props: Props) {
	return (
		<div className="mt-5 flex items-center gap-4 w-28">
			<Button buttonText={'-'} onClick={() => props.onQuantityChange && props.onQuantityChange('decrease')} />
			<span>{props.quantity}</span>
			<Button buttonText={'+'} onClick={() => props.onQuantityChange && props.onQuantityChange('increase')} />
		</div>
	);
}
