export interface IHeroPreview {
	id: number
	url: string
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

export interface IHero {
	id: number
	url: string
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
