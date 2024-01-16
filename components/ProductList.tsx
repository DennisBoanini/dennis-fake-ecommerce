import { Product } from '@/models/Product';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { titleToSlug } from '@/utils/misc';

type Props = {
	products: Product[];
};

export default function ProductList(props: Props) {
	return (
		<div className={'grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 my-4'}>
			{props.products.map((product, index) => (
				<Link
					key={product.id}
					href={`${product.category}/${titleToSlug(product.title)}/${product.id}${product.title.includes('Infinix') ? '98765' : ''}`}
				>
					<ProductCard product={product} />
				</Link>
			))}
		</div>
	);
}
