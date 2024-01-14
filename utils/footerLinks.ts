import { FooterLink } from '@/models/FooterLink';

export const footerLinks: FooterLink[] = [
	{
		title: 'Chi siamo',
		isSocial: false,
		links: [
			{
				title: 'La nostra azienda',
				url: 'la-nostra-azienda'
			},
			{
				title: 'Lavora con noi',
				url: 'lavora-con-noi'
			}
		]
	},
	{
		title: 'Servizio clienti',
		isSocial: false,
		links: [
			{
				title: 'FAQ',
				url: 'faq'
			},
			{
				title: 'Contatti',
				url: 'contatti'
			}
		]
	},
	{
		title: 'Seguici sui social',
		isSocial: true,
		links: [
			{
				title: 'facebook',
				url: ''
			},
			{
				title: 'instagram',
				url: ''
			}
		]
	}
];
