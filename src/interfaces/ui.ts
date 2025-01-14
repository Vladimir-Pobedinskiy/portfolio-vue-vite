export interface IMarquee {
	title: string
	marqueeImages: {
		url: string
		title: string
	}[]
}

export interface ITabs {
	title: string
	nav: {
		title: string
	}[]
}

export interface IAccordionItem {
	title: string
	text: string
}

export interface IAccordion {
	title: string
	accordionList: IAccordionItem[]
}
