export const titleToSlug = (title: string): string => title.toLowerCase().split(/\s+/).join('-');

export const toCurrency = (value: number, locale: string = 'it-IT'): string => {
	return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);
};
