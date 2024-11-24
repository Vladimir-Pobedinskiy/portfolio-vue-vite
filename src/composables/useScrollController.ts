export const useScrollController = {
	scrollPosition: 0,
	paddingOffset: 0,
	disableScroll() {
		useScrollController.scrollPosition = window.scrollY
		useScrollController.paddingOffset = window.innerWidth - document.documentElement.clientWidth
		document.body.classList.add('lock-js')
		const header = document.querySelector('header') as HTMLElement
		const donationReceiptsNotification = document.querySelector('.donation-receipts-notification') as HTMLElement
		if (header) header.style.paddingRight = `${useScrollController.paddingOffset}px`
		if (donationReceiptsNotification) donationReceiptsNotification.style.display = 'none'
		document.body.style.cssText = `
      position: fixed;
      left: 0;
      top: -${useScrollController.scrollPosition}px;
      padding-right: ${useScrollController.paddingOffset}px;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    `
	},
	enableScroll() {
		const header = document.querySelector('header') as HTMLElement
		const donationReceiptsNotification = document.querySelector('.donation-receipts-notification') as HTMLElement
		document.body.classList.remove('lock-js')
		document.body.style.cssText = ''
		if (header) header.style.paddingRight = '0px'
		if (donationReceiptsNotification) donationReceiptsNotification.style.display = 'block'
		window.scroll({
			top: useScrollController.scrollPosition,
		})
	},
}