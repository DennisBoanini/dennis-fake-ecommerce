'use server';

import { revalidatePath } from 'next/cache';
import { Product } from '@/models/Product';
import { CartProduct } from '@/models/CartProduct';
import { redirect } from 'next/navigation';

export async function updateQuantityProductInCart(id: number, quantity: number) {
	let response: Response | undefined = undefined;
	if (id === 12) {
		response = await fetch('https://httpstat.us/500?sleep=2000');
	} else {
		response = await fetch(`http://localhost:3001/carts/${id}`, {
			cache: 'no-cache',
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ quantity })
		});
	}

	if (response.status === 500) {
		return { error: 'ERROR_PATCHING' };
	}

	revalidatePath('/carrello');
}

export async function addProductToCart(product: Product) {
	let productPresentResponse: Response | undefined = undefined;
	if (product.id === 4) {
		productPresentResponse = await fetch('https://httpstat.us/500?sleep=2000');
	} else {
		productPresentResponse = await fetch(`http://localhost:3001/carts/${product.id}`, { cache: 'no-cache' });
	}

	if (productPresentResponse.status === 500) {
		return { error: 'ERROR_ADDING' };
	}

	let productInCart: CartProduct | undefined = undefined;
	if (productPresentResponse.ok) {
		productInCart = await productPresentResponse.json();
	}

	if (productInCart) {
		const response = await fetch(`http://localhost:3001/carts/${productInCart.id}`, {
			cache: 'no-cache',
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ quantity: productInCart.quantity + 1 })
		});

		if (!response.ok) {
			return { error: 'ERROR_PATCHING' };
		}

		revalidatePath('/carrello', 'page');
		redirect('/carrello');
	} else {
		const response = await fetch(`http://localhost:3001/carts`, {
			cache: 'no-cache',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...product, quantity: 1 })
		});

		if (!response.ok) {
			return { error: 'ERROR_ADDING_PRODUCT' };
		}

		revalidatePath('/carrello', 'page');
		redirect('/carrello');
	}
}

export async function removeProductFromCart(id: number) {
	let response: Response | undefined = undefined;
	if (id === 6) {
		response = await fetch('https://httpstat.us/500?sleep=2000');
	} else {
		response = await fetch(`http://localhost:3001/carts/${id}`, {
			method: 'DELETE'
		});
	}

	if (!response.ok) {
		return { error: 'ERROR_DELETING' };
	}

	revalidatePath('/carrello', 'page');
}
