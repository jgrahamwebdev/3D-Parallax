
//Variables for Setup
let container;
let camera;
let renderer;
let scene;
let moon;

const moonTitle = document.querySelector('.title');
const moonImg = document.querySelector('.moonImg');

window.addEventListener('scroll', function() {
  let value = window.scrollY;
  moonTitle.style.left = value * -1 + 'px';
  moonImg.style.top = value * 1 + 'px';
});

//Init Function
function init() {
  container = document.querySelector('.scene');

  //Create Scene
  scene = new THREE.Scene();

  //Field Of View
  const fov = 45;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 2000;

  //Camera Setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 4);

  //Light
  const ambient = new THREE.AmbientLight(0x404040, 4);
  scene.add(ambient);

  //Directional Light(s)
  const sideLight = new THREE.DirectionalLight(0xffffff, 2);
  sideLight.position.set(-500, 500, 50);
  scene.add(sideLight);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load('./3D/scene.gltf', function(gltf){
    scene.add(gltf.scene);
    moon = gltf.scene.children[0];
    animate();
  });
}

//Animation
function animate() {
  requestAnimationFrame(animate);
  moon.rotation.z += 0.005;
  renderer.render(scene, camera);
  
}

//Moves Object When Resizing Window
function onWindowResize () {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

//Calls 'init' Function
init();