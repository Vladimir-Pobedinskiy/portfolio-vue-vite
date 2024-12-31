export const useInitMargins = () => {
	const header = document.querySelector('header') as HTMLElement
	const main = document.querySelector('main') as HTMLElement

	if (header && main) {
		const headerHeight = header.offsetHeight
		main.style.marginTop = `${headerHeight}px`
	}
}
