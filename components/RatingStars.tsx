import Image from 'next/image';

type Props = {
	rating: number;
};

export default function RatingStars(props: Props) {
	const ratingIntPart = Math.trunc(props.rating);
	let stars: JSX.Element[] = [];
	Array.from(Array(ratingIntPart)).map((_, index) =>
		stars.push(<Image key={`fullstar-${index}`} src={'/fullstar.svg'} alt={'full star'} width={20} height={20} className={'object-contain'} />)
	);

	if (!Number.isInteger(props.rating)) {
		stars = [...stars, <Image key={'halfstar'} src={'/halfstar.svg'} alt={'half star'} width={20} height={20} className={'object-contain'} />];
	}

	Array.from(Array(Math.trunc(5 - props.rating))).map((_, index) =>
		stars.push(<Image key={`emptystar-${index}`} src={'/emptystar.svg'} alt={'empty star'} width={20} height={20} className={'object-contain'} />)
	);

	return <div className={'flex'}>{stars.map(star => star)}</div>;
}
