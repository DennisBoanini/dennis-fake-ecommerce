import Spinner from '@/components/Spinner';

type Props = {
	buttonText: string;
	isLoading?: boolean;
	style?: 'danger';
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Props) {
	return (
		<button
			className={`border-[1px] ${props.style === 'danger' ? 'border-red-500 bg-red-500' : 'border-primary-black bg-primary-black'} rounded-md w-full py-3 px-5 text-white uppercase ${
				props.isLoading || props.disabled ? 'hover:cursor-not-allowed opacity-10' : 'hover:cursor-pointer hover:bg-white hover:text-primary-black'
			}`}
			onClick={props.onClick}
			disabled={props.isLoading || props.disabled}
			aria-disabled={props.isLoading || props.disabled}
		>
			<div className={'flex items-center justify-center'}>
				{props.isLoading && <Spinner />}
				{!props.isLoading && <span>{props.buttonText}</span>}
			</div>
		</button>
	);
}
