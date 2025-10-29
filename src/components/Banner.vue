<template>
  <div id="imageContainer"></div>
</template>

<script>
import * as THREE from 'three';
// import BannerParticles from './BannerParticles.vue';
export default {
  name: 'Ban-ner',
  mounted() {
    const container = this.$el;

    const loader = new THREE.TextureLoader();
    loader.load(require('@/assets/banner_bk.jpg'), (texture) => {
      initScene(texture);
    });

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform float u_aberrationIntensity;

      void main() {
        vec2 gridUV = floor(vUv * vec2(20.0)) / vec2(20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0 / 20.0);
        vec2 mouseDirection = u_mouse - u_prevMouse;
        vec2 pixelToMouse = centerOfPixel - u_mouse;
        float dist = length(pixelToMouse);
        float strength = smoothstep(0.2, 0.0, dist);
        vec2 uvOffset = strength * -mouseDirection * 2.5;
        vec2 uv = vUv - uvOffset;

        vec4 r = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.0, 0.0));
        vec4 g = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.02, 0.0));
        vec4 b = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
        
      }
    `;

    let scene, camera, renderer, plane;
    const mouse = new THREE.Vector2(0.2, 0.2);
    const prevMouse = new THREE.Vector2(0.5, 0.5);
    let aberration = 0;

    function initScene(texture) {
      // renderer
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      container.appendChild(renderer.domElement);

      // scene & camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
      camera.position.z = 1;

      const uniforms = {
        u_texture: { value: texture },
        u_mouse: { value: mouse.clone() },
        u_prevMouse: { value: prevMouse.clone() },
        u_aberrationIntensity: { value: 0.0 }
      };
      const fov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * camera.position.z;
      const width = height * camera.aspect;
      const geometry = new THREE.PlaneGeometry(width, height);


      
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
      });

      

      plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      animate();
      window.addEventListener('resize', onResize);
      container.addEventListener('mousemove', onMouseMove);
    }


    function onMouseMove(e) {
      const rect = container.getBoundingClientRect();
      prevMouse.copy(mouse);
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
      aberration = 1.0;
    }

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    function animate() {
      requestAnimationFrame(animate);

      plane.material.uniforms.u_mouse.value.copy(mouse);
      plane.material.uniforms.u_prevMouse.value.copy(prevMouse);
      aberration = Math.max(0.0, aberration - 0.005);
      plane.material.uniforms.u_aberrationIntensity.value = aberration;

      renderer.render(scene, camera);
    }
    

  }
};
</script>

<style>
#imageContainer {
  position: relative;
  width: auto;
  height: 100vh;
  overflow: hidden;
  /* object-fit: cover; */
}

@media (max-width:768px){
  #imageContainer {
    height: 100vh; /* 避免手機瀏覽器 UI 影響顯示高度 */
    width: 100vw;
    overflow: hidden;
    display: none;
  }
}


canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  position: absolute;
  display: block;
  inset: 0;
}

</style>
