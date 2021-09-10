class CircularPath {
    constructor(r, t = 0, speed = 1) {
        this.r = r;
        this.t = t;
        this.x = r * Math.cos(t);
        this.y = r * Math.sin(t);
        this.speed = speed;
    }

    next() {
        this.t += 0.01 * this.speed;
        this.x = this.r * Math.cos(this.t);
        this.y = this.r * Math.sin(this.t);
        return [this.x, this.y];
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth / window.innerHeight) * 2,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight / 2);
canvas = renderer.domElement;
document.body.appendChild(canvas);

const geometry = new THREE.BoxGeometry();
const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
});
const cube1 = new THREE.Line(geometry, material);
const cube2 = new THREE.Line(geometry, material);

cube1.position.x = 1;
cube2.position.x = -1;
scene.add(cube1);
scene.add(cube2);

path1 = new CircularPath(1, 0, 2);
path2 = new CircularPath(1, Math.PI, 2);
path3 = new CircularPath(5, 0, 5);

camera.position.z = 10;

on = true;

const animate = function() {
    if (on) {
        requestAnimationFrame(animate);
    }

    [cube1.position.x, cube1.position.y] = [cube1.rotation.x, cube1.rotation.z] =
    path1.next();

    [cube2.position.x, cube2.position.y] = [cube2.rotation.x, cube2.rotation.z] =
    path2.next();

    [camera.position.z, camera.position.x] = path3.next();
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
};

animate();

canvas.addEventListener("click", () => {
    on = !on;
    if (on) {
        animate();
    }
});

document.body.onresize = function() {
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    camera.aspect = (window.innerWidth / window.innerHeight) * 2;
    camera.updateProjectionMatrix();
};