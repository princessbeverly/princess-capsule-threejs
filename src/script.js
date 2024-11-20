/* JS GOES HERE. */
console.log('Hello Three.js')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object

const geometry = new THREE.CapsuleGeometry(1, 1, 16, 32); 
const colors = [];
const colorTop = new THREE.Color(154360 ); 
const colorBottom = new THREE.Color(154360); 
const colorMiddle = new THREE.Color(0xfdfefe); 

const position = geometry.attributes.position;
for (let i = 0; i < position.count; i++) {
    const y = position.getY(i); // Check the Y position

    if (y > 0.5) {
        // Top hemisphere
        colors.push(colorTop.r, colorTop.g, colorTop.b);
    } else if (y < -0.5) {
        // Bottom hemisphere
        colors.push(colorBottom.r, colorBottom.g, colorBottom.b);
    } else {
        // Cylindrical side
        colors.push(colorMiddle.r, colorMiddle.g, colorMiddle.b);
    }
}

geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));


const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    color: 0xECE2D9,
    roughness: 0.5,
    metalness: 0.3,
});
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Sizes

const sizes = {
    width : 800,
    height: 600
}

scene.background = new THREE.Color(0xADD8E6); // Light blue

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Event listeners

addEventListener('resize', () => {
    // Update sizes
    sizes.width = canvas.clientWidth
    sizes.height = canvas.clientHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
})
// Animation loop

const clock = new THREE.Clock()

function animate() {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.x = Math.sin(elapsedTime) * 0.5
    mesh.rotation.y = Math.cos(elapsedTime) * 0.5

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    requestAnimationFrame(animate)
}

animate()