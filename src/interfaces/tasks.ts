export interface ITag {
	title: string
	selected: boolean
}

export interface ITask {
	id: string | number
	title: string
	date: string
	tags: ITag[]
	priority: number
}
