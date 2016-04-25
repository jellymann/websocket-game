/* eslint-env browser */

import THREE from "three";

export default class GraphicsEngine {
  constructor() {
    this.canvas = document.getElementById("webgl_canvas");
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

    this.calculateSize();
    window.addEventListener("resize", () => this.calculateSize());

    const geometry = new THREE.BoxGeometry(100, 100, 1);
    const texture = new THREE.TextureLoader().load("images/floor.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 20, 20 );
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture });
    const floor = new THREE.Mesh( geometry, material );
    floor.receiveShadow = true;
    floor.position.z = -0.5;
    this.scene.add(floor);

    const amLight = new THREE.AmbientLight( 0x404040 );
    this.scene.add(amLight);

    this.light = new THREE.DirectionalLight( 0xffffff );
    this.light.castShadow = true;
    this.light.shadow.mapSize.set(1024, 1024);
    this.light.shadow.camera.near = 5;
    this.light.shadow.camera.far = 50;
    this.light.shadow.camera.right = 10;
    this.light.shadow.camera.left = -10;
    this.light.shadow.camera.top = 10;
    this.light.shadow.camera.bottom = -10;
    this.light.position.set(10, 5, 30);
    this.scene.add(this.light);

    this.camera.position.z = 10;

    this.overlay = document.getElementById("overlay");
    this.scoreboard = document.getElementById("scoreboard");
    this.scoreboardBody = this.scoreboard.getElementsByTagName("tbody")[0];
    this.deathscreen = document.getElementById("deathscreen");
    this.deathtimer = document.getElementById("deathtimer");
    this.deathmessage = document.getElementById("deathmessage");
  }

  calculateSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.widthHalf = this.width / 2;
    this.heightHalf = this.height / 2;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}