export interface IHeroPreview {
	id: number
	alias: string
	title: string
	descr: string
	img: {
		url: string
		alt: string
	}
	lvl: string
	info: {
		title: string
		value: string
	}[]
}
