import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize ( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render ( scene, camera );

//octahedron

const geometry = new THREE.OctahedronGeometry(5,0)
const material = new THREE.MeshStandardMaterial({ color: 0x34d5eb});
/*
const octahedron = new THREE.Mesh( geometry, material);

octahedron.position.set(10, 5, -20)
scene.add(octahedron)
*/
//lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10, 10, 10)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)

const controls = new OrbitControls( camera, renderer.domElement );

//stars
function addStar() {
  const geometry = new THREE.SphereGeometry (0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial ({ color: 0xffffff })
  const star = new THREE.Mesh ( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

//background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//The Sun
const sunTexture = new THREE.TextureLoader().load('sun.jpg');

const sun = new THREE.Mesh (
  new THREE.SphereGeometry(43, 30, 30),
  new THREE.MeshStandardMaterial({
    map:sunTexture,
  })
);
sun.position.set(50, 0, -100)
scene.add(sun);


//earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');

const earth = new THREE.Mesh (
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.set(-10, 0, 40)
scene.add(earth);
//earth.position.z = 30;
//earth.position.setX(-10);

//scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  earth.rotation.y += 0.03;


  camera.position.z = t * -0.05;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//animation loop
function animate() {
    requestAnimationFrame( animate );

    sun.rotation.y += 0.001;
/*
    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.005;
    octahedron.rotation.z += 0.01;
*/
    //controls.update();

    renderer.render( scene, camera );
}

animate();