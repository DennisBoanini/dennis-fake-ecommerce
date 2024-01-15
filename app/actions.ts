'use server';

import { revalidatePath } from 'next/cache';
import { Product } from '@/models/Product';

export async function updateQuantityProductInCart(id: number, quantity: number) {
	const response = await fetch(`http://localhost:3001/carts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ quantity })
	});

	if (!response.ok) {
		throw new Error(`Error patching product with id ${id}. Error ${JSON.stringify(response)}`);
	}

	revalidatePath('/');
}

export async function addProductToCart(product: Product) {
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

	revalidatePath('/carrello');
}

export async function removeProductFromCart(id: number) {
	const response = await fetch(`http://localhost:3001/carts/${id}`, {
		method: 'DELETE'
	});

	if (!response.ok) {
		throw new Error(`Error deleting product with id ${id}. Error ${JSON.stringify(response)}`);
	}

	revalidatePath('/');
}
