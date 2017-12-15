let connections = new Array(0)
let images = new Array(1).fill(0)

const display = (obj) => {
	push()
	noFill()
	strokeWeight(2)
	stroke(360, 100, 52,Math.min(1,(Date.now()-obj.creationTime)/3000))
	beginShape()
	obj.vertices.forEach(({x,y,z})=>vertex(x,y,z))
	endShape(CLOSE)
	pop()
	return obj
}

const flatten = (obj)=>({
	...obj,
	vertices: obj.vertices.map(({x,y,z})=>({x,y}))
})

const jitter = (obj)=>({
	...obj,
	vertices: obj.vertices
		.map(({x,y,z})=>({
			x: x+Math.random()*2-1,
			y: y+Math.random()*2-1,
			z
		}))
})

const shape = ()=> {
	const x = Math.random()*((window.innerWidth/8)+window.innerWidth-(2*(window.innerWidth/8)))
	const y = Math.random()*((window.innerHeight/8)+window.innerHeight-(2*(window.innerHeight/8)))
	const diameter = window.innerWidth/10
	const depth = Math.floor(Math.random()*(images.length-3))
	const creationTime = Date.now()
	const vertices = Array(Math.floor(Math.random()*2) + 3)
		.fill(0)
		.map(vert=>({
			x: x+Math.random()*diameter,
			y: y+Math.random()*diameter,
			z: depth+Math.floor(Math.random()*3)
		}))
	return {
		creationTime,
		vertices
	}
}

function preload() {
	images = images.map((_,i)=>loadImage(`images/${i}.jpg`))
}

function windowResized (){
  resizeCanvas(windowWidth,windowHeight);
}

function setup() {
	frameRate(24)
	colorMode(HSL)
	createCanvas(windowWidth,windowHeight)
}

function draw() {
	image(images[0],0,0,width,height)
	connections = connections.map(connection=>display(flatten(jitter(connection))))
}

function updateConnections(data) {
	if(connections.length === data) return 0
	if(connections.length > data) {
		connections.shift()
		updateConnections(data)
	}
	if(connections.length < data) {
		connections.push(shape())
		updateConnections(data)
	}
}
