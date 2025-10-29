<template>
  <div class="particles" ref="threeContainer" id="container">
    <div class="mobile">
      <img src="../assets/2025banner.jpg">
    </div>

   
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'BannerPt',
  mounted() {
    // === 基本場景設置 ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // 完全透明背景
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.threeContainer.appendChild(renderer.domElement);

    // === 建立圓形貼圖 ===
    // const canvas = document.createElement('canvas');
    // canvas.width = 64;
    // canvas.height = 64;
    // const ctx = canvas.getContext('2d');
    // const center = 32;
    // const radius = 30;

    // // 畫一個白色圓形，背景透明
    // ctx.clearRect(0, 0, 64, 64);
    // ctx.beginPath();
    // ctx.arc(center, center, radius, 0, Math.PI * 2);
    // ctx.closePath();
    // ctx.fillStyle = 'white';
    // ctx.fill();
    const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const center = 32;
    const radius = 30;

    // 清空背景
    ctx.clearRect(0, 0, 64, 64);

    // 建立徑向漸層
    const gradient = ctx.createLinearGradient(center, center, 0, center, center, radius);
    gradient.addColorStop(0, '#ffb9eb'); // 中心色：粉紅
    gradient.addColorStop(1, '#86e3ff'); // 外圍色：淺藍

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    const circleTexture = new THREE.CanvasTexture(canvas);


    // const circleTexture = new THREE.CanvasTexture(canvas);

    // === 建立粒子幾何體與材質 ===
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const particleCount = 500;
    for (let i = 0; i < particleCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(20);
      const y = THREE.MathUtils.randFloatSpread(20);
      const z = THREE.MathUtils.randFloatSpread(20);
      vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2,
      map: circleTexture,
      transparent: true,
      alphaTest: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xFFE4FF,
      rotation:45
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // === 單一粒子（可選）===
    const singleGeometry = new THREE.BufferGeometry();
    singleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([45, 0, 0], 3)
    );
    const spherePoint = new THREE.Points(singleGeometry, material);
    scene.add(spherePoint);

    // === 光源 ===
    const ambientLight = new THREE.AmbientLight(0xffbdff); // 改成正確顏色
    scene.add(ambientLight);

    // === 動畫迴圈 ===
    function animate() {
      requestAnimationFrame(animate);
      // particles.rotation.y += 0.001;
      particles.rotation.y += 0.0006;
      renderer.render(scene, camera);
    }
    animate();

    // === 窗口調整 ===
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
};
</script>
<style>
.mobile{
  position:absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  /* display: none; */
}
.mobile img{
  /* position: absolute; */
  top: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}


@media (min-width:768px){
  .mobile {
    height: 100vh; /* 避免手機瀏覽器 UI 影響顯示高度 */
    width: 100vw;
    overflow: hidden;
    object-fit: cover;
    display: none;
  }
}

@media (max-width:768px){
  .mobile{
    height: 80vh;
    width: 80vw;
  }
  .mobile img{
    height: 100vh; /* 避免手機瀏覽器 UI 影響顯示高度 */
    width: 100vw;
    /* overflow: hidden; */
    object-fit:cover;
  }
}


</style>