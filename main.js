import * as THREE from "./node_modules/three/src/Three.js";
import { OrbitControls } from "./orbitControls.js";


//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//window.addEventListener('resize', onWindowResize, false);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);



//helpers
//const lightHelper = new THREE.PointLightHelper(pointLight)
const helper = new THREE.CameraHelper(camera);

const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);

//scene.add(helper);
//scene.add(gridHelper);



//lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10, 10, 10)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);



//stars
function addStar() {
  const starGeometry = new THREE.SphereGeometry(1, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3).fill().map(
    () => THREE.MathUtils.randFloatSpread(1000)
  );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(500).fill().forEach(addStar)



//background
const spaceTexture = new THREE.TextureLoader().load('img/space.jpg');
scene.background = spaceTexture;



//The Sun
const sunTexture = new THREE.TextureLoader().load('img/sun.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(80, 30, 30),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
sun.position.set(50, 0, -100)
scene.add(sun);



//Mercury
const mercuryTexture = new THREE.TextureLoader().load('img/mercury.jpg');

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 30, 30),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);
mercury.position.set(-8, 0, 38)
scene.add(mercury);


//Venus
const venusTexture = new THREE.TextureLoader().load('img/venus_surface.jpg');
const atmosphereTexture = new THREE.TextureLoader().load('img/venus_atmosphere.jpg');

const venus = new THREE.Mesh (
  new THREE.SphereGeometry(7.5, 30, 30),
  new THREE.MeshStandardMaterial ({
    map: venusTexture,
  })
);

const venusAtmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(7.6, 30, 30),
  new THREE.MeshStandardMaterial({
    map: atmosphereTexture,
  })
);
//venus.position.set(8, 0, 67)
venusAtmosphere.position.set(8, 0, 67)

//scene.add(venus);
scene.add(venusAtmosphere);



//Earth
const earthTexture = new THREE.TextureLoader().load('img/earth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(8, 30, 30),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.set(10, 0, 95)
scene.add(earth);



//Mars
const marsTexture = new THREE.TextureLoader().load('img/mars.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(4, 30, 30),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);
mars.position.set(-8, 0, 155)
scene.add(mars);



//Jupiter
const jupiterTexture = new THREE.TextureLoader().load('img/jupiter.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(88, 30, 30),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(100, 0, 268)
scene.add(jupiter);



//Saturn
const saturnTexture = new THREE.TextureLoader().load('img/saturn.jpg');

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(50, 30, 30),
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
);

saturn.position.set(-50, 0, 468);
scene.add(saturn);



//Saturn ring
const saturnRingTexture = new THREE.TextureLoader().load('img/saturn_ring.png');

const saturnGeometry = new THREE.RingBufferGeometry(60, 90, 80);
var pos = saturnGeometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
  v3.fromBufferAttribute(pos, i);
  saturnGeometry.attributes.uv.setXY(i, v3.length() < 61 ? 0 : 1, 1);
}

const saturnMaterial = new THREE.MeshBasicMaterial ({
  map: saturnRingTexture,
  side: THREE.DoubleSide,
  transparent: true,
})

const saturnRing = new THREE.Mesh(saturnGeometry, saturnMaterial);

saturnGeometry.uvsNeedUpdate = true;
saturnRing.position.set(-40, 0, 468);
saturnRing.rotateX(8)
scene.add(saturnRing);



//Uranus
const uranusTexture = new THREE.TextureLoader().load('img/uranus.jpg');

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(31, 30, 30),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);

uranus.position.set(40, 0, 720);
scene.add(uranus);



//Neptune
const neptuneTexture = new THREE.TextureLoader().load('img/neptune.jpg');

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(30, 30, 30),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);

neptune.position.set(-30, 0, 900);
scene.add(neptune);



//scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  sun.rotation.y += 0.002;
  mercury.rotation.y += 0.03;
  //venus.rotation.y += 0.03;
  earth.rotation.y += 0.03;
  mars.rotation.y += 0.03;
  jupiter.rotation.y += 0.02;
  saturn.rotation.y += 0.03;


  camera.position.z = t * -0.05;
  //camera.position.x = t * -0.0002;
  //camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();



//animation loop
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.0002;
  mercury.rotation.y += 0.001;
  //venus.rotation.y += 0.001;
  venusAtmosphere.rotation.y += 0.001;
  earth.rotation.y += 0.001;
  mars.rotation.y += 0.001;
  jupiter.rotation.y += 0.0008;
  saturn.rotation.y += 0.001;

  window.addEventListener('resize', onWindowResize, false);
  //controls.update();

  renderer.render(scene, camera);
}

animate();
