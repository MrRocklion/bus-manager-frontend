'use client'
import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

type Point = [number, number]
type PolygonZone = Point[]
type ExcludedZones = PolygonZone[]

type CameraStreamCanvasProps = {
	crossLineY: number
	drawPoints?: boolean
}

export default function CameraStreamCanvas({ crossLineY = 600, drawPoints = false }: CameraStreamCanvasProps) {
	const videoRef = useRef<HTMLVideoElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)

	const [excludedZones, setExcludedZones] = useState<ExcludedZones>([])
	const [currentZone, setCurrentZone] = useState<PolygonZone>([])

	useEffect(() => {
		const video = videoRef.current!
		const canvas = canvasRef.current!
		const ctx = canvas.getContext('2d')!

		// Mouse move para mostrar cruz
		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect()
			const scaleX = canvas.width / rect.width
			const scaleY = canvas.height / rect.height

			const x = (e.clientX - rect.left) * scaleX
			const y = (e.clientY - rect.top) * scaleY
			setMousePos({ x, y })
		}


		const handleClick = (e: MouseEvent) => {
			if (!drawPoints) return
			const rect = canvas.getBoundingClientRect()
			const scaleX = canvas.width / rect.width
			const scaleY = canvas.height / rect.height

			const x = (e.clientX - rect.left) * scaleX
			const y = (e.clientY - rect.top) * scaleY

			setCurrentZone(prev => [...prev, [x, y]])
		}

		// Tecla "Enter" para guardar la zona actual
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && currentZone.length >= 3) {

				const formatedPoints =currentZone.map((point)=>{
					if(point[0]<=25){
						point[0] = 0
					}
					if(point[1]<=25){
						point[1] = 0
					}
					if(point[0]>=1250){
						point[0] = 1280
					}
					if(point[1]>=690){
						point[1] = 720
					}
					return point
				})
				console.log("Zona guardada:", formatedPoints)
				setExcludedZones(prev => [...prev, formatedPoints])
				setCurrentZone([])
			}
		}

		canvas.addEventListener('mousemove', handleMouseMove)
		canvas.addEventListener('click', handleClick)
		window.addEventListener('keydown', handleKeyDown)

		const draw = () => {
			if (!video.paused && !video.ended) {
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

				ctx.strokeStyle = 'rgba(170,255,0,0.8)'
				ctx.lineWidth = 2
				ctx.beginPath()
				ctx.moveTo(0, crossLineY)
				ctx.lineTo(canvas.width, crossLineY)
				ctx.stroke()

				// Zonas guardadas
				excludedZones.forEach(zone => {
					ctx.beginPath()
					ctx.moveTo(zone[0][0], zone[0][1])
					for (let i = 1; i < zone.length; i++) {
						ctx.lineTo(zone[i][0], zone[i][1])
					}
					ctx.closePath()
					ctx.fillStyle = 'rgba(225, 0, 0, 0.4)'
					ctx.fill()
					ctx.strokeStyle = 'rgba(225, 0, 0, 0.8)'
					ctx.stroke()
				})

	
				if (currentZone.length > 0) {
					ctx.beginPath()
					ctx.moveTo(currentZone[0][0], currentZone[0][1])
					for (let i = 1; i < currentZone.length; i++) {
						ctx.lineTo(currentZone[i][0], currentZone[i][1])
					}
		
					if (mousePos) {
						ctx.lineTo(mousePos.x, mousePos.y)
					}
					ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)'
					ctx.lineWidth = 2
					ctx.stroke()

					// Puntos
					currentZone.forEach(([x, y]) => {
						ctx.beginPath()
						ctx.arc(x, y, 4, 0, Math.PI * 2)
						ctx.fillStyle = 'cyan'
						ctx.fill()
					})
				}

				// Cruz de seguimiento del mouse
				if (mousePos && drawPoints) {
					ctx.beginPath()
					ctx.strokeStyle = 'rgba(0,255,255,0.5)'
					ctx.lineWidth = 1
					ctx.moveTo(mousePos.x, 0)
					ctx.lineTo(mousePos.x, canvas.height)
					ctx.moveTo(0, mousePos.y)
					ctx.lineTo(canvas.width, mousePos.y)
					ctx.stroke()
				}

				requestAnimationFrame(draw)
			}
		}

		const startStream = () => {
			canvas.width = video.videoWidth
			canvas.height = video.videoHeight
			draw()
		}

		if (Hls.isSupported()) {
			const hls = new Hls()
			hls.loadSource('/hls/stream.m3u8')
			hls.attachMedia(video)
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video.play().then(startStream).catch(console.error)
			})
			return () => {
				hls.destroy()
				canvas.removeEventListener('mousemove', handleMouseMove)
				canvas.removeEventListener('click', handleClick)
				window.removeEventListener('keydown', handleKeyDown)
			}
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = '/hls/stream.m3u8'
			video.addEventListener('loadedmetadata', () => {
				video.play().then(startStream).catch(console.error)
			})
		}

		return () => {
			canvas.removeEventListener('mousemove', handleMouseMove)
			canvas.removeEventListener('click', handleClick)
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [crossLineY, drawPoints, currentZone, excludedZones])

	return (
		<div style={{ position: 'relative', width: '100%' }}>
			<video ref={videoRef} style={{ display: 'none' }} autoPlay muted />
			<canvas
				ref={canvasRef}
				style={{ width: '100%', height: 'auto', cursor: drawPoints ? 'crosshair' : 'default' }}
			/>
		</div>
	)
}
