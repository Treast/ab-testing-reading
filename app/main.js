import App from '@/app/app.component'
import Hammer from 'hammerjs'
import {TweenMax} from 'gsap'

let currentPage = null
let currentParagraphe = 0

let scroll = document.querySelector("#scroll")
let swipe = document.querySelector("#swipe")
let touch = document.querySelector("#touch")

const app = new App()
app.isReady()
.then(() => {

	currentPage = scroll

	swipe.querySelectorAll("p").forEach((text, i) => {
		let h = new Hammer(text)

		h.on('swipe', () => {
			console.log("Swiping")
			showNextParagraphe(swipe)
		})
	})

	touch.querySelectorAll("p").forEach((text, i) => {
		let h = new Hammer(text)

		h.on('tap', () => {
			console.log("Swiping")
			showNextParagraphe(touch)
		})
	})

	let btnSwipe = document.querySelector("#btnSwipe")
	btnSwipe.addEventListener("click", () => { goToPage(swipe) })

	let btnTouch = document.querySelector("#btnTouch")
	btnTouch.addEventListener("click", () => { goToPage(touch) })
})

function goToPage(nextPage) {
	showLoader()
		.then(() => {
			currentPage.style.display = "none"
			nextPage.style.display = "block"
			window.scrollTo(0, 0)
			currentPage = nextPage
			currentParagraphe = 0
			setTimeout(hideLoader, 1000)
		})
}

function showNextParagraphe(section) {
	section.querySelectorAll("p")[currentParagraphe].style.display = "none"
	currentParagraphe++
	if(currentParagraphe < swipe.querySelectorAll("p").length) {
		section.querySelectorAll("p")[currentParagraphe].style.display = "block"
	} else {
		section.querySelector("a").style.display = "block"
	}
}

function showLoader() {
	return new Promise((resolve, reject) => {
		let loader = document.querySelector("#loader")

		TweenMax.to(loader, 0.4, {
			opacity: 1,
			onStart: () => {
				loader.style.display = "block";
				resolve()
			}
		})
	})
}

function hideLoader() {
	let loader = document.querySelector("#loader")

	TweenMax.to(loader, 0.4, {
		opacity: 0,
		onComplete: () => {
			loader.style.display = "none";
		}
	})
}
