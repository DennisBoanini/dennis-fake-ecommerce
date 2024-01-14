import { Product } from '@/models/Product';

export type CartProduct = Product & { quantity: number };
