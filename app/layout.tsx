import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cart } from '@/models/Cart';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dennis Fake ECommerce',
	description: 'Dennis Fake ECommerce'
};

async function getData() {
	const res = await fetch('http://localhost:3001/carts');

	if (!res.ok) {
		throw new Error('Error fetching data');
	}

	return res.json();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cart: Cart = await getData();
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header totalElements={cart.length} />
				{children}
				<Footer />
			</body>
		</html>
	);
}
