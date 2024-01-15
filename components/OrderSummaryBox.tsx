import { toCurrency } from '@/utils/misc';
import { SHIPPING_PRICE } from '@/utils/constants';
import Button from '@/components/Button';

type Props = {
	subtotal: number;
};

export default function OrderSummaryBox(props: Props) {
	return (
		<div className={'flex flex-col border w-full rounded-md border-primary-black p-2 shadow-md shadow-gray-200'}>
			<h2 className={'font-bold text-2xl'}>Riassunto</h2>

			<div className={'mt-8'}>
				<div className={'flex items-center justify-between'}>
					<span>Subtotale (IVA inclusa)</span>
					<span>{toCurrency(props.subtotal)}</span>
				</div>
				<div className={'flex items-center justify-between'}>
					<span>Spedizione</span>
					<span>{toCurrency(SHIPPING_PRICE)}</span>
				</div>
				<div className={'border my-2'} />
				<div className={'flex items-center justify-between my-2'}>
					<strong>Totale</strong>
					<span>{toCurrency(props.subtotal + SHIPPING_PRICE)}</span>
				</div>
				<div>
					<Button buttonText={"concludi l'acquisto"} onClick={() => alert('Acquisto concluso')} />
				</div>
			</div>
		</div>
	);
}
