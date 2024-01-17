'use server';

import { revalidatePath } from 'next/cache';
import { Product } from '@/models/Product';
import { CartProduct } from '@/models/CartProduct';
import { redirect } from 'next/navigation';

export async function updateQuantityProductInCart(id: number, quantity: number) {
	try {
		const response = await fetch(`http://localhost:3001/carts/${id}${id === 12 ? 'error' : ''}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ quantity })
		});

		if (!response.ok) {
			return { error: 'ERROR_PATCHING' };
		}
	} catch (e) {
		console.error('error server action', e);
	}

	revalidatePath('/carrello', 'page');
}

export async function addProductToCart(product: Product) {
	const productPresentResponse = await fetch(`http://localhost:3001/carts/${product.id}`);
	if (productPresentResponse.status.toString().split('')[0] === '5') {
		throw new Error('Error fetching product');
	}

	let productInCart: CartProduct | undefined = undefined;
	if (productPresentResponse.ok) {
		productInCart = await productPresentResponse.json();
	}

	if (productInCart) {
		return updateQuantityProductInCart(productInCart.id, productInCart.quantity + 1);
	} else {
		const response = await fetch(`http://localhost:3001/carts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...product, quantity: 1 })
		});

		if (!response.ok) {
			throw new Error(`Error adding product to cart. Error ${JSON.stringify(response)}`);
		}

		revalidatePath('/carrello', 'page');
		redirect('/carrello');
	}
}

export async function removeProductFromCart(id: number) {
	const response = await fetch(`http://localhost:3001/carts/${id}`, {
		method: 'DELETE'
	});

	if (!response.ok) {
		throw new Error(`Error deleting product with id ${id}. Error ${JSON.stringify(response)}`);
	}

	revalidatePath('/carrello', 'page');
}
