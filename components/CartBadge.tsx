type Props = {
	totalElements: number;
};
export default function CartBadge(props: Props) {
	if (props.totalElements <= 0) {
		return null;
	}

	return (
		<div className={'rounded-full bg-red-500 h-6 w-6 flex items-center justify-center p-2 font-bold text-sm text-white absolute -top-3 -right-3'}>
			{props.totalElements}
		</div>
	);
}
