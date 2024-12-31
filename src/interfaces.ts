export interface IBreadcrumb {
	title: string
	url: string
}

export interface IDescription {
	title: string | null
	descriptionList: string[] | null
}

export interface INav {
	title: string
	url: string
}

export interface ITag {
	title: string
	selected: boolean
}

export interface ITask {
	title: string
	date: string
	tags: ITag[]
}
