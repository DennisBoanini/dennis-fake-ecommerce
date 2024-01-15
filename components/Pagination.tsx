'use client';
import { PAGINATION_SIZE } from '@/utils/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Props = {
	totalElements: number;
};

export default function Pagination(props: Props) {
	const totalPages = props.totalElements / PAGINATION_SIZE;
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;

	function createPageURL(pageNumber: number | string) {
		const params = new URLSearchParams(searchParams);
		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	}

	return (
		<div className={'flex items-center gap-1 justify-center'}>
			{Array.from(new Array(totalPages)).map((_, index) => (
				<Link
					href={createPageURL(index + 1)}
					title={createPageURL(index + 1)}
					key={index}
					aria-disabled={currentPage === index + 1}
					className={`border p-2 w-14 h-14 flex items-center justify-center cursor-pointer ${currentPage === index + 1 ? 'pointer-events-none cursor-auto bg-primary-black text-white' : 'hover:bg-primary-black hover:text-white'}`}
				>
					{index + 1}
				</Link>
			))}
		</div>
	);
}
