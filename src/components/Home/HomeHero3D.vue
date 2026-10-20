<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Шрифт урезан до глифов слова PORTFOLIO — другие буквы в нём отсутствуют
import fontJson from '@/assets/fonts/three/gentilis-bold-portfolio.typeface.json'

gsap.registerPlugin(ScrollTrigger)

const WORD = 'PORTFOLIO'
const SUBTITLE = 'Frontend-разработчик · Vue / Nuxt'
const GRADIENT_TOP = new THREE.Color('#6ee7b7')
const GRADIENT_BOTTOM = new THREE.Color('#047857')
const FILL_WIDTH = 0.8

const [ROLE, STACK] = SUBTITLE.split(' · ')
const toChars = (text: string) => Array.from(text).map((char) => (char === ' ' ? ' ' : char))
const roleChars = toChars(ROLE)
const stackChars = toChars(STACK)

const root = ref<HTMLElement | null>(null)
const canvasWrapper = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const hint = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer | undefined
let scene: THREE.Scene | undefined
let camera: THREE.PerspectiveCamera | undefined
let mesh: THREE.Mesh<TextGeometry, THREE.MeshPhysicalMaterial> | undefined
let envTexture: THREE.Texture | undefined
let textWidth = 1
let textHeight = 1
let rafId = 0
let scrollTrigger: ScrollTrigger | undefined
let subtitleTimeline: gsap.core.Timeline | undefined
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

// Целевой угол задаёт скролл, текущий плавно догоняет его в цикле рендера
const rotation = { targetY: 0, targetX: 0, y: 0, x: 0 }

const render = () => {
	if (renderer && scene && camera) renderer.render(scene, camera)
}

const fitCamera = () => {
	if (!renderer || !camera || !canvasWrapper.value) return
	const { clientWidth: width, clientHeight: height } = canvasWrapper.value
	renderer.setSize(width, height, false)
	camera.aspect = width / height

	const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
	const distanceByWidth = textWidth / FILL_WIDTH / (2 * tanHalfFov * camera.aspect)
	const distanceByHeight = (textHeight * 2.2) / (2 * tanHalfFov)
	camera.position.z = Math.max(distanceByWidth, distanceByHeight)
	camera.updateProjectionMatrix()
	render()
}

const tick = () => {
	rafId = requestAnimationFrame(tick)
	if (!mesh) return
	rotation.y += (rotation.targetY - rotation.y) * 0.08
	rotation.x += (rotation.targetX - rotation.x) * 0.08
	mesh.rotation.y = rotation.y
	mesh.rotation.x = rotation.x
	render()
}

const startLoop = () => {
	if (!rafId) tick()
}

const stopLoop = () => {
	cancelAnimationFrame(rafId)
	rafId = 0
}

const createSubtitleTimeline = (start: () => string) => {
	const el = subtitle.value!
	const roleEls = el.querySelectorAll('.home-hero__subtitle-role .home-hero__subtitle-char')
	const stackEls = el.querySelectorAll('.home-hero__subtitle-stack .home-hero__subtitle-char')
	const dropIn = (each: number) =>
		[
			{ opacity: 0, yPercent: -140, scale: 1.8, filter: 'blur(6px)' },
			{
				opacity: 1,
				yPercent: 0,
				scale: 1,
				filter: 'blur(0px)',
				duration: 0.1,
				ease: 'back.out(2.5)',
				stagger: { each, from: 'random' as const },
			},
		] as const

	return gsap
		.timeline({
			scrollTrigger: { trigger: root.value, start, end: 'bottom bottom', scrub: 1 },
		})
		.fromTo(
			roleEls,
			{ opacity: 0, xPercent: -60, filter: 'blur(6px)' },
			{ opacity: 1, xPercent: 0, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out', stagger: 0.005 },
			0.3
		)
		.fromTo(
			'.home-hero__subtitle-dot',
			{ opacity: 0, scale: 0, rotation: -180 },
			{ opacity: 1, scale: 1, rotation: 0, duration: 0.06, ease: 'back.out(3)' },
			0.47
		)
		.fromTo(stackEls, ...dropIn(0.012), 0.5)
		.fromTo('.home-hero__subtitle-line', { scaleX: 0 }, { scaleX: 1, duration: 0.1, ease: 'power2.inOut' }, 0.64)
		.to({}, { duration: 0.26 })
}

const initScene = () => {
	if (!root.value || !canvasWrapper.value) return

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	canvasWrapper.value.appendChild(renderer.domElement)

	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000)

	const pmrem = new THREE.PMREMGenerator(renderer)
	envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
	scene.environment = envTexture
	pmrem.dispose()

	const keyLight = new THREE.DirectionalLight(0xffffff, 1.6)
	keyLight.position.set(4, 6, 8)
	const rimLight = new THREE.DirectionalLight(0x7fbfa4, 2)
	rimLight.position.set(-6, -2, -6)
	scene.add(keyLight, rimLight)

	const font = new FontLoader().parse(fontJson as never)
	const geometry = new TextGeometry(WORD, {
		font,
		size: 1,
		depth: 0.35,
		curveSegments: 10,
		bevelEnabled: true,
		bevelThickness: 0.04,
		bevelSize: 0.025,
		bevelSegments: 5,
	})
	geometry.center()
	geometry.computeBoundingBox()
	const box = geometry.boundingBox!
	textWidth = box.max.x - box.min.x
	textHeight = box.max.y - box.min.y

	const positions = geometry.getAttribute('position')
	const colors = new Float32Array(positions.count * 3)
	const color = new THREE.Color()
	for (let i = 0; i < positions.count; i++) {
		const t = (positions.getY(i) - box.min.y) / textHeight
		color.lerpColors(GRADIENT_BOTTOM, GRADIENT_TOP, t)
		color.toArray(colors, i * 3)
	}
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

	const material = new THREE.MeshPhysicalMaterial({
		vertexColors: true,
		metalness: 0.35,
		roughness: 0.22,
		clearcoat: 1,
		clearcoatRoughness: 0.08,
		iridescence: 0.35,
		iridescenceIOR: 1.4,
	})
	mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)

	resizeObserver = new ResizeObserver(fitCamera)
	resizeObserver.observe(canvasWrapper.value)
	fitCamera()

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

	// Сцена прилипает под фиксированной шапкой — стартуем с её высоты
	const start = () => `top ${parseFloat(getComputedStyle(root.value!.firstElementChild!).top) || 0}px`

	subtitleTimeline = createSubtitleTimeline(start)

	scrollTrigger = ScrollTrigger.create({
		trigger: root.value,
		start,
		end: 'bottom bottom',
		onUpdate: ({ progress }) => {
			rotation.targetY = progress * Math.PI * 2
			rotation.targetX = Math.sin(progress * Math.PI) * 0.35
			const fade = Math.min(progress * 8, 1)
			gsap.set(hint.value, { opacity: 1 - fade })
		},
	})

	// Рендерим только пока сцена видна на экране
	intersectionObserver = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) startLoop()
		else stopLoop()
	})
	intersectionObserver.observe(canvasWrapper.value)
}

onMounted(initScene)

onBeforeUnmount(() => {
	stopLoop()
	scrollTrigger?.kill()
	subtitleTimeline?.scrollTrigger?.kill()
	subtitleTimeline?.kill()
	resizeObserver?.disconnect()
	intersectionObserver?.disconnect()
	mesh?.geometry.dispose()
	mesh?.material.dispose()
	envTexture?.dispose()
	renderer?.dispose()
	renderer?.domElement.remove()
})
</script>

<template>
	<section ref="root" class="home-hero">
		<div class="home-hero__sticky">
			<h2 class="visually-hidden">{{ WORD }}</h2>
			<div ref="canvasWrapper" class="home-hero__canvas" aria-hidden="true"></div>

			<p ref="subtitle" class="home-hero__subtitle s1" :aria-label="SUBTITLE">
				<span class="home-hero__subtitle-role" aria-hidden="true">
					<span v-for="(char, i) in roleChars" :key="i" class="home-hero__subtitle-char">{{ char }}</span>
				</span>
				<span class="home-hero__subtitle-dot" aria-hidden="true">·</span>
				<span class="home-hero__subtitle-stack" aria-hidden="true">
					<span v-for="(char, i) in stackChars" :key="i" class="home-hero__subtitle-char">{{ char }}</span>
					<span class="home-hero__subtitle-line"></span>
				</span>
			</p>

			<div ref="hint" class="home-hero__hint" aria-hidden="true">
				<span class="home-hero__hint-line"></span>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.home-hero {
	position: relative;
	height: 300vh;
	margin-bottom: 48px;

	@media (prefers-reduced-motion: reduce) {
		height: auto;
	}

	@media (min-width: variables.$desktop) {
		margin-bottom: 80px;
	}

	&__sticky {
		position: sticky;
		top: 66px;
		height: calc(100vh - 66px);
		height: calc(100svh - 66px);
		overflow: hidden;

		@media (min-width: variables.$desktop) {
			top: 82px;
			height: calc(100vh - 82px);
		}

		@media (prefers-reduced-motion: reduce) {
			position: relative;
			top: 0;
			height: 70vh;
		}
	}

	&__canvas {
		position: relative;
		width: 100%;
		height: 100%;

		canvas {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	&__subtitle {
		position: absolute;
		left: 0;
		right: 0;
		top: calc(50% + clamp(56px, 9vw, 150px));
		padding: 0 16px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: baseline;
		gap: 0 0.5em;
		color: variables.$color-gray-dark;
		pointer-events: none;
	}

	&__subtitle-role,
	&__subtitle-stack {
		position: relative;
		display: inline-flex;
	}

	&__subtitle-role {
		@media (max-width: calc(variables.$tablet - 1px)) {
			font-size: 0.75em;
		}
	}

	&__subtitle-char {
		display: inline-block;
		will-change: transform, opacity;
	}

	&__subtitle-dot {
		display: inline-block;
		color: variables.$color-vue;
	}

	&__subtitle-stack {
		color: #059669;
		font-weight: 450;
	}

	&__subtitle-line {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -6px;
		height: 2px;
		border-radius: 2px;
		background: linear-gradient(90deg, #6ee7b7, variables.$color-vue, #047857);
		transform-origin: left center;
	}

	&__hint {
		position: absolute;
		left: 50%;
		bottom: 24px;
		transform: translateX(-50%);
		pointer-events: none;
	}

	&__hint-line {
		position: relative;
		display: block;
		width: 1px;
		height: 48px;
		overflow: hidden;
		background-color: rgba(variables.$color-vue, 0.25);

		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: -50%;
			width: 100%;
			height: 50%;
			background-color: variables.$color-vue;
			animation: home-hero-hint 1.6s ease-in-out infinite;
		}
	}
}

@keyframes home-hero-hint {
	to {
		top: 100%;
	}
}
</style>
