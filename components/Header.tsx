import ShoppingCart from '@/components/ShoppingCart';
import Logo from '@/components/Logo';

type Props = {
	totalElements: number;
};

export default function Header(props: Props) {
	return (
		<header className={'w-full'}>
			<nav className={'mx-auto flex justify-between items-center sm:px-16 px-6 py-4 border-b-[1px] border-b-gray-100'}>
				<Logo />
				<ShoppingCart totalElements={props.totalElements} />
			</nav>
		</header>
	);
}
