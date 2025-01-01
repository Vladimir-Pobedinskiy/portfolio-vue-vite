export interface ITag {
	title: string
	selected: boolean
}

export interface ITask {
	title: string
	date: string
	tags: ITag[]
}
