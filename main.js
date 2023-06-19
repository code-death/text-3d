import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import * as dat from 'lil-gui'





/**
 * Base
*/
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#04010e')

// Axeshelper

// const axes = new THREE.AxesHelper(5, 5, 5)
// scene.add(axes)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapMaterial1 = textureLoader.load('/textures/matcaps/1.png')
const matcapMaterial2 = textureLoader.load('/textures/matcaps/2.png')
const matcapMaterial3 = textureLoader.load('/textures/matcaps/3.png')
const matcapMaterial4 = textureLoader.load('/textures/matcaps/4.png')
const matcapMaterial5 = textureLoader.load('/textures/matcaps/5.png')
const matcapMaterial6 = textureLoader.load('/textures/matcaps/6.png')
const matcapMaterial7 = textureLoader.load('/textures/matcaps/7.png')
const matcapMaterial8 = textureLoader.load('/textures/matcaps/8.png')
const matcapMaterial9 = textureLoader.load('/textures/matcaps/9.png')

//Material
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapMaterial9

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1.975754137945633
camera.position.y = 0.7415067867547493
camera.position.z = 7.969940009179165

scene.add(camera)

// FontLoader
const fontLoader = new FontLoader()
fontLoader.load(
    '/helvetiker_regular.typeface.json',
    (font) => {
        const textGeo = new TextGeometry('Poorvansh Kavta', {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        })
        // textGeo.computeBoundingBox()
        // textGeo.translate(
        //     -(textGeo.boundingBox.max.x  - 0.02)*0.5,
        //     -(textGeo.boundingBox.max.y  - 0.02)*0.5,
        //     -(textGeo.boundingBox.max.z  - 0.02)*0.5,
        // )
        textGeo.center()

        const text = new THREE.Mesh(textGeo, material)

        scene.add(text)
    }
)
console.time('donut')

// ShapeMaker
const shapeMaker = (geo, mat) => {
    const shape = new THREE.Mesh(geo, mat)

    shape.position.x = (Math.random() - 0.5) * 30
    shape.position.y = (Math.random() - 0.5) * 30
    shape.position.z = (Math.random() - 0.5) * 30

    shape.rotation.x = Math.random() * Math.PI
    shape.rotation.y = Math.random() * Math.PI
    const scale = Math.random()*2
    shape.scale.set(scale, scale, scale)

    scene.add(shape)
}

// Random Donuts
const donutGeo = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const cubeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2)
const sphereGeo = new THREE.SphereGeometry(0.2, 32, 32)
const coneGeo = new THREE.ConeGeometry(0.2, 0.4, 32, 32)


gui.add(material, 'matcap', {
    1: matcapMaterial1,
    2: matcapMaterial2,
    3: matcapMaterial3,
    4: matcapMaterial4,
    5: matcapMaterial5,
    6: matcapMaterial6,
    7: matcapMaterial7,
    8: matcapMaterial8,
    9: matcapMaterial9}
    )

for(let i=0; i < 100; i++) {
    shapeMaker(donutGeo, material)
    shapeMaker(cubeGeo, material)
    shapeMaker(sphereGeo, material)
    shapeMaker(coneGeo, material)
}



console.timeEnd('donut')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()