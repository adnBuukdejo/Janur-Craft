import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

export interface KetupatStageInfo {
  index: number;
  title: string;
  indonesianTerm: string;
  description: string;
  craftDetail: string;
}

export const KETUPAT_STAGES: KetupatStageInfo[] = [
  {
    index: 0,
    title: '01. Material Introduction',
    indonesianTerm: 'Janur Kuning (Cocos nucifera)',
    description:
      'Two fresh young coconut leaflets sit on the woven bamboo mat. Notice the luminous pale yellow-green leaf blade flanking each rigid central wooden midrib (lidi).',
    craftDetail:
      'Optimal leaf length is 70–90 cm with unblemished, supple longitudinal fibers.',
  },
  {
    index: 1,
    title: '02. Leaf Preparation',
    indonesianTerm: 'Menyeset Lidi',
    description:
      'The woody central lidi spine separates away from the twin blades, transforming each leaflet into smooth, flexible botanical weaving ribbons.',
    craftDetail:
      'Artisans preserve the separated lidi midribs to bind brooms (sapu lidi) or carve fastening pins.',
  },
  {
    index: 2,
    title: '03. Folding Process',
    indonesianTerm: 'Gulungan Tiga Lingkar',
    description:
      'Ribbon A (sage) and Ribbon B (pale chartreuse) each coil into three opposing spiral loops—one thick base stem pointing upward, the other pointing downward.',
    craftDetail:
      'Keeping the three coils evenly spaced leaves room for alternating strand passes.',
  },
  {
    index: 3,
    title: '04. Weaving Process',
    indonesianTerm: 'Anyaman Silang (Over–Under)',
    description:
      'The three coils of Ribbon B weave progressively across Ribbon A in an alternating Over–Under–Over sequence, forming a self-locking 3 × 3 lattice.',
    craftDetail:
      'Alternating crossings create mechanical friction so strands grip tightly without adhesive.',
  },
  {
    index: 4,
    title: '05. Shape Formation',
    indonesianTerm: 'Membentuk Ruang Ketupat',
    description:
      'The flat woven lattice folds inward around a hollow diamond volume while base stems wrap the lower equator and tapered tips seal the upper crown.',
    craftDetail:
      'The six intersecting faces create the classic rounded Ketupat Bawang geometry.',
  },
  {
    index: 5,
    title: '06. Final Result',
    indonesianTerm: 'Ketupat Bawang Matang Anyam',
    description:
      'Tightening each strand from center to tip locks all seams shut. Ready to be filled two-thirds with washed rice and simmered in boiling water.',
    craftDetail:
      'Drag anywhere in the viewport to inspect all 360° of the finished interlocking diamond pouch.',
  },
];

// Reusable pre-allocated math objects outside the animation loop (zero GC)
const _vA = new THREE.Vector3();
const _vB = new THREE.Vector3();
const _vC = new THREE.Vector3();
const _tangent = new THREE.Vector3();
const _side = new THREE.Vector3();
const _normal = new THREE.Vector3();
const _upRef = new THREE.Vector3(0, 1, 0);
const _altUp = new THREE.Vector3(0, 0, 1);

const STRAND_SEGMENTS = 72;

/**
 * Procedurally generate authentic young coconut leaf texture with fine parallel longitudinal veins.
 */
function createJanurTexture(variant: 'sage' | 'chartreuse', maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    if (variant === 'sage') {
      grad.addColorStop(0, '#6E8F52');
      grad.addColorStop(0.5, '#89AB66');
      grad.addColorStop(1, '#5D7D44');
    } else {
      grad.addColorStop(0, '#B9CA7A');
      grad.addColorStop(0.5, '#D2DF94');
      grad.addColorStop(1, '#A7BA6A');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 128);

    // Fine longitudinal coconut-leaf veins
    ctx.strokeStyle = variant === 'sage' ? 'rgba(42, 68, 28, 0.24)' : 'rgba(92, 112, 46, 0.22)';
    ctx.lineWidth = 1;
    for (let y = 4; y < 128; y += 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Slight bright outer margin highlight
    ctx.fillStyle = 'rgba(245, 248, 224, 0.22)';
    ctx.fillRect(0, 0, 512, 4);
    ctx.fillRect(0, 124, 512, 4);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/**
 * Procedurally generate woven bamboo pedestal mat texture.
 */
function createBambooMatTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#D9C9A5';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 16) {
      for (let x = 0; x < 256; x += 16) {
        const even = ((x + y) / 16) % 2 === 0;
        ctx.fillStyle = even ? '#C7B388' : '#E3D5B4';
        ctx.fillRect(x + 1, y + 1, 14, 14);
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/**
 * Create a fixed-topology ribbon BufferGeometry updated smoothly in place (zero GC).
 */
function createRibbonGeometry(segments: number): THREE.BufferGeometry {
  const vertCount = (segments + 1) * 2;
  const positions = new Float32Array(vertCount * 3);
  const normals = new Float32Array(vertCount * 3);
  const uvs = new Float32Array(vertCount * 2);
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    uvs[i * 4] = u * 4;
    uvs[i * 4 + 1] = 0;
    uvs[i * 4 + 2] = u * 4;
    uvs[i * 4 + 3] = 1;
    if (i < segments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

/**
 * Evaluate parametric center position for Strand A or B at parameter t in [0, 1] for a given continuous stage progress s in [0, 5].
 */
function evalStrandPoint(
  strand: 'A' | 'B',
  t: number,
  stageProgress: number,
  out: THREE.Vector3
) {
  // Clamp stageProgress [0..5]
  const s = THREE.MathUtils.clamp(stageProgress, 0, 5);
  const seg = Math.min(Math.floor(s), 4);
  const localT = THREE.MathUtils.smoothstep(s - seg, 0, 1);

  const sign = strand === 'A' ? 1 : -1;

  // Compute keyframe coordinates for stage k in {0..5}
  const getStagePos = (k: number, target: THREE.Vector3) => {
    const u = t * 2 - 1; // [-1, 1]
    if (k === 0) {
      // Stage 1: Straight fresh leaves lying side-by-side on the studio mat
      target.set(
        u * 2.1,
        0.12 + Math.sin(t * Math.PI) * 0.04,
        sign * 0.42
      );
    } else if (k === 1) {
      // Stage 2: Stripped ribbons lift gently apart ready for coiling
      target.set(
        u * 2.0,
        0.35 + Math.sin(t * Math.PI) * 0.16,
        sign * 0.58
      );
    } else if (k === 2) {
      // Stage 3: 3 opposing spiral loops per hand
      const turns = 2.65;
      const theta = t * Math.PI * 2 * turns;
      const radius = 0.56;
      const axialSpread = (t - 0.5) * 1.15;
      if (strand === 'A') {
        target.set(
          -0.88 + axialSpread * 0.55,
          0.95 + Math.sin(theta) * radius,
          Math.cos(theta) * radius
        );
      } else {
        target.set(
          0.88 - axialSpread * 0.55,
          0.95 + Math.cos(theta) * radius,
          Math.sin(theta) * radius
        );
      }
    } else if (k === 3) {
      // Stage 4: Progressive interlocking Over-Under-Over weave grid!
      // 3 passes along X (Strand A) vs 3 passes along Z/Y (Strand B)
      const passFloat = t * 3.0;
      const passIdx = Math.min(2, Math.floor(passFloat));
      const inPass = passFloat - passIdx;
      const waveAmp = 0.07;

      if (strand === 'A') {
        const x = (inPass - 0.5) * 1.35 * (passIdx % 2 === 0 ? 1 : -1);
        const z = (passIdx - 1) * 0.34;
        // Alternating over-under wave along X
        const overUnder = Math.sin(inPass * Math.PI * 3.0 + passIdx * Math.PI) * waveAmp;
        target.set(x, 1.05 + overUnder, z);
      } else {
        const z = (inPass - 0.5) * 1.35 * (passIdx % 2 === 0 ? 1 : -1);
        const x = (passIdx - 1) * 0.34;
        const overUnder = -Math.sin(inPass * Math.PI * 3.0 + passIdx * Math.PI) * waveAmp;
        target.set(x, 1.05 + overUnder, z);
      }
    } else if (k === 4) {
      // Stage 5: Shape Formation - folding into a 3D hollow octahedron/diamond ketupat
      const angle = t * Math.PI * 4.2 + (strand === 'A' ? 0 : Math.PI * 0.5);
      const lat = (t - 0.5) * Math.PI * 0.92;
      const r = 0.72 * Math.cos(lat * 0.75) + 0.16;
      const px = Math.cos(angle) * r;
      const pz = Math.sin(angle) * r;
      const py = 1.05 + Math.sin(lat) * 0.78;
      target.set(px, py, pz);
    } else {
      // Stage 6: Final tightened Ketupat Bawang 3D diamond weave with stems
      if (t < 0.09) {
        // Bottom base stem tail
        const st = (0.09 - t) / 0.09;
        target.set(sign * 0.06, 0.25 - st * 0.16, sign * 0.06);
      } else if (t > 0.91) {
        // Top tapered crown stem
        const st = (t - 0.91) / 0.09;
        target.set(-sign * 0.05, 1.82 + st * 0.36, sign * 0.05);
      } else {
        // Interlocking diamond faces of Ketupat Bawang
        const coreT = (t - 0.09) / 0.82;
        const phase = strand === 'A' ? 0 : Math.PI * 0.5;
        const u = coreT * Math.PI * 6.0 + phase;
        const v = (coreT - 0.5) * Math.PI;
        // Diamond octahedron radial profile (L1-like diamond shaping)
        const diamondEnv = 1.0 - Math.abs(Math.sin(v)) * 0.52;
        const weaveRipple = Math.sin(u * 2.0 + (strand === 'A' ? 0 : Math.PI)) * 0.028;
        const radius = 0.66 * diamondEnv + weaveRipple;
        const x = Math.cos(u) * radius;
        const z = Math.sin(u) * radius;
        const y = 1.04 + Math.sin(v) * 0.78;
        target.set(x, y, z);
      }
    }
  };

  getStagePos(seg, _vA);
  getStagePos(seg + 1, _vB);
  out.copy(_vA).lerp(_vB, localT);
}

/**
 * Update a ribbon BufferGeometry in-place with realistic botanical taper and width.
 */
function updateRibbonGeometry(
  geo: THREE.BufferGeometry,
  strand: 'A' | 'B',
  stageProgress: number
) {
  const posAttr = geo.attributes.position as THREE.BufferAttribute;
  const baseWidth = 0.14;

  for (let i = 0; i <= STRAND_SEGMENTS; i++) {
    const t = i / STRAND_SEGMENTS;
    evalStrandPoint(strand, t, stageProgress, _vC);

    const tNext = Math.min(1, t + 0.015);
    const tPrev = Math.max(0, t - 0.015);
    evalStrandPoint(strand, tNext, stageProgress, _vB);
    evalStrandPoint(strand, tPrev, stageProgress, _vA);
    _tangent.copy(_vB).sub(_vA).normalize();

    const ref = Math.abs(_tangent.y) > 0.9 ? _altUp : _upRef;
    _side.crossVectors(_tangent, ref).normalize();

    // Natural coconut leaflet taper near tip (t -> 1)
    const tipTaper = t > 0.78 ? 1.0 - ((t - 0.78) / 0.22) * 0.7 : 1.0;
    const halfW = baseWidth * tipTaper;

    posAttr.setXYZ(
      i * 2,
      _vC.x - _side.x * halfW,
      _vC.y - _side.y * halfW,
      _vC.z - _side.z * halfW
    );
    posAttr.setXYZ(
      i * 2 + 1,
      _vC.x + _side.x * halfW,
      _vC.y + _side.y * halfW,
      _vC.z + _side.z * halfW
    );
  }

  posAttr.needsUpdate = true;
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
}

export const KetupatStudio3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [webglError, setWebglError] = useState(false);

  // Mutable refs for smooth animation loop without recreating WebGL context
  const targetStageRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isPlayingRef = useRef(false);
  const autoRotateRef = useRef(true);
  const controlsApiRef = useRef<{
    zoomIn: () => void;
    zoomOut: () => void;
    resetView: () => void;
  } | null>(null);

  useEffect(() => {
    targetStageRef.current = currentStage;
  }, [currentStage]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL detection per Three.js skill
    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 540;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    const handleContextRestored = () => setWebglError(false);
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F3EFE6');
    scene.fog = new THREE.Fog('#F3EFE6', 9, 22);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(2.8, 2.55, 3.6);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.target.set(0, 0.95, 0);
    orbit.enableDamping = !isSoftwareGl;
    orbit.dampingFactor = 0.06;
    orbit.minDistance = 1.8;
    orbit.maxDistance = 7.5;
    orbit.maxPolarAngle = Math.PI * 0.48;
    orbit.update();

    // 3-Point Studio Lighting Rig + Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight('#FFFDF8', '#C7B899', 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#FFF6E6', 1.65);
    keyLight.position.set(3.8, 6.2, 4.2);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -3.2;
    keyLight.shadow.camera.right = 3.2;
    keyLight.shadow.camera.top = 3.2;
    keyLight.shadow.camera.bottom = -3.2;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#DCE8D8', 0.7);
    rimLight.position.set(-4.0, 3.0, -3.5);
    scene.add(rimLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    // Studio Pedestal & Woven Bamboo Tampah Tray (Composite Multi-part Assembly)
    const studioGroup = new THREE.Group();
    const matTex = createBambooMatTexture(maxAniso);

    const trayDiscGeo = new THREE.CylinderGeometry(2.35, 2.25, 0.06, 48);
    const trayDiscMat = new THREE.MeshStandardMaterial({
      map: matTex,
      roughness: 0.82,
      metalness: 0.0,
    });
    const trayDisc = new THREE.Mesh(trayDiscGeo, trayDiscMat);
    trayDisc.position.y = -0.03;
    trayDisc.receiveShadow = true;
    studioGroup.add(trayDisc);

    const trayRimGeo = new THREE.TorusGeometry(2.35, 0.055, 16, 64);
    trayRimGeo.rotateX(Math.PI / 2);
    const trayRimMat = new THREE.MeshStandardMaterial({
      color: '#8D724B',
      roughness: 0.65,
      metalness: 0.05,
    });
    const trayRim = new THREE.Mesh(trayRimGeo, trayRimMat);
    trayRim.position.y = 0.01;
    trayRim.castShadow = true;
    trayRim.receiveShadow = true;
    studioGroup.add(trayRim);

    // Subtle Museum Plinth below tray
    const plinthGeo = new THREE.CylinderGeometry(2.7, 2.8, 0.6, 48);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: '#E6DFCF',
      roughness: 0.9,
      metalness: 0.0,
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = -0.36;
    plinth.receiveShadow = true;
    studioGroup.add(plinth);
    scene.add(studioGroup);

    // Procedural Janur Leaf Strands + Lidi Midribs
    const ketupatGroup = new THREE.Group();
    scene.add(ketupatGroup);

    const texA = createJanurTexture('sage', maxAniso);
    const texB = createJanurTexture('chartreuse', maxAniso);

    const matA = new THREE.MeshStandardMaterial({
      map: texA,
      roughness: 0.44,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
    const matB = new THREE.MeshStandardMaterial({
      map: texB,
      roughness: 0.4,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    const geoA = createRibbonGeometry(STRAND_SEGMENTS);
    const geoB = createRibbonGeometry(STRAND_SEGMENTS);
    const meshA = new THREE.Mesh(geoA, matA);
    const meshB = new THREE.Mesh(geoB, matB);
    meshA.castShadow = true;
    meshB.castShadow = true;
    ketupatGroup.add(meshA, meshB);

    // Woody Lidi Midribs visible in Stage 1 and lifting away in Stage 2
    const lidiGeo = new THREE.CylinderGeometry(0.018, 0.012, 4.1, 10);
    lidiGeo.rotateZ(Math.PI / 2);
    const lidiMat = new THREE.MeshStandardMaterial({
      color: '#7A5C3E',
      roughness: 0.72,
      metalness: 0.0,
      transparent: true,
      opacity: 1,
    });
    const lidiA = new THREE.Mesh(lidiGeo, lidiMat);
    const lidiB = new THREE.Mesh(lidiGeo, lidiMat.clone());
    lidiA.position.set(0, 0.14, 0.42);
    lidiB.position.set(0, 0.14, -0.42);
    ketupatGroup.add(lidiA, lidiB);

    // Inner structural core envelope subtly visible in Stages 5–6 so ketupat feels solid
    const coreGeo = new THREE.OctahedronGeometry(0.56, 1);
    coreGeo.scale(1.0, 1.24, 1.0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: '#AFC47B',
      roughness: 0.58,
      metalness: 0.0,
      transparent: true,
      opacity: 0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 1.04, 0);
    coreMesh.castShadow = true;
    ketupatGroup.add(coreMesh);

    updateRibbonGeometry(geoA, 'A', 0);
    updateRibbonGeometry(geoB, 'B', 0);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Camera zoom & reset API
    controlsApiRef.current = {
      zoomIn: () => {
        _vA.copy(camera.position).sub(orbit.target);
        const len = Math.max(1.8, _vA.length() * 0.82);
        _vA.setLength(len);
        camera.position.copy(orbit.target).add(_vA);
        orbit.update();
      },
      zoomOut: () => {
        _vA.copy(camera.position).sub(orbit.target);
        const len = Math.min(7.5, _vA.length() * 1.22);
        _vA.setLength(len);
        camera.position.copy(orbit.target).add(_vA);
        orbit.update();
      },
      resetView: () => {
        camera.position.set(2.8, 2.55, 3.6);
        orbit.target.set(0, 0.95, 0);
        orbit.update();
      },
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 960;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let playTimer = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    let disposed = false;

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);

      // Auto-advance stages smoothly while Play is active
      if (isPlayingRef.current) {
        playTimer += delta;
        if (playTimer >= 3.2) {
          playTimer = 0;
          const next = targetStageRef.current + 1;
          if (next > 5) {
            setIsPlaying(false);
          } else {
            setCurrentStage(next);
          }
        }
      } else {
        playTimer = 0;
      }

      // Smooth exponential damping of stage progress
      const prevP = currentProgressRef.current;
      const nextP = THREE.MathUtils.damp(prevP, targetStageRef.current, 4.2, delta);
      currentProgressRef.current = nextP;

      if (Math.abs(nextP - prevP) > 0.0005 || Math.abs(targetStageRef.current - nextP) > 0.001) {
        updateRibbonGeometry(geoA, 'A', nextP);
        updateRibbonGeometry(geoB, 'B', nextP);
      }

      // Lidi midrib separation animation (Stages 1 -> 2 -> fade out by Stage 3)
      const lidiLift = THREE.MathUtils.clamp(nextP, 0, 1.5);
      lidiA.position.y = 0.14 + lidiLift * 0.55;
      lidiB.position.y = 0.14 + lidiLift * 0.55;
      lidiA.rotation.z = lidiLift * 0.12;
      lidiB.rotation.z = -lidiLift * 0.12;
      const lidiAlpha = THREE.MathUtils.clamp(1.6 - nextP, 0, 1);
      lidiA.visible = lidiAlpha > 0.02;
      lidiB.visible = lidiAlpha > 0.02;
      (lidiA.material as THREE.MeshStandardMaterial).opacity = lidiAlpha;
      (lidiB.material as THREE.MeshStandardMaterial).opacity = lidiAlpha;

      // Inner ketupat volume opacity (Stages 5-6)
      const coreAlpha = THREE.MathUtils.clamp((nextP - 3.9) * 0.85, 0, 0.92);
      coreMesh.visible = coreAlpha > 0.02;
      coreMat.opacity = coreAlpha;

      // Gentle 360 rotation when Auto-Rotate is enabled
      if (autoRotateRef.current) {
        ketupatGroup.rotation.y += delta * 0.35;
      }

      orbit.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      orbit.dispose();
      geoA.dispose();
      geoB.dispose();
      lidiGeo.dispose();
      coreGeo.dispose();
      trayDiscGeo.dispose();
      trayRimGeo.dispose();
      plinthGeo.dispose();
      matA.dispose();
      matB.dispose();
      lidiMat.dispose();
      (lidiB.material as THREE.Material).dispose();
      coreMat.dispose();
      trayDiscMat.dispose();
      trayRimMat.dispose();
      plinthMat.dispose();
      texA.dispose();
      texB.dispose();
      matTex.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const stageInfo = KETUPAT_STAGES[currentStage];

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStage((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStage((s) => Math.min(KETUPAT_STAGES.length - 1, s + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStage(0);
    controlsApiRef.current?.resetView();
  };

  return (
    <div className="relative w-full h-[640px] sm:h-[700px] rounded-xl overflow-hidden border border-[#DCD5C5] bg-[#F3EFE6]">
      {/* Isolated WebGL Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Ketupat Weaving Viewport"
      />

      {webglError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F3EFE6] p-8 text-center">
          <p className="font-serif text-2xl text-[#1E241E] mb-2">
            3D WebGL Context Unavailable
          </p>
          <p className="text-sm text-[#525B50] max-w-md">
            Your browser or device has paused WebGL hardware acceleration. You can still inspect all six guided ketupat weaving stages below.
          </p>
        </div>
      )}

      {/* Top-Left Minimal Curatorial Stage Annotation (Non-occluding) */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-md pointer-events-none">
        <div className="bg-[#FBF9F5]/92 border border-[#DCD5C5] rounded-xl p-4 shadow-sm pointer-events-auto">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="font-mono text-xs text-[#1E4D38] font-medium tabular-nums">
              Stage {currentStage + 1} / {KETUPAT_STAGES.length}
            </span>
            <span className="text-xs text-[#525B50] italic font-serif">
              {stageInfo.indonesianTerm}
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#1E241E]">
            {stageInfo.title}
          </h3>
          <p className="text-xs text-[#1E241E] mt-1.5 leading-relaxed">
            {stageInfo.description}
          </p>
          <p className="text-[11px] text-[#525B50] mt-2 pt-2 border-t border-[#E8E2D5]">
            {stageInfo.craftDetail}
          </p>
        </div>
      </div>

      {/* Top-Right Compact Viewport Camera Buttons */}
      <div className="hidden sm:flex flex-col gap-1.5 absolute top-4 right-4">
        <button
          type="button"
          onClick={() => controlsApiRef.current?.zoomIn()}
          className="w-10 h-10 rounded-lg bg-[#FBF9F5]/92 border border-[#DCD5C5] text-[#1E241E] hover:bg-[#E3EAE1] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Zoom In"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => controlsApiRef.current?.zoomOut()}
          className="w-10 h-10 rounded-lg bg-[#FBF9F5]/92 border border-[#DCD5C5] text-[#1E241E] hover:bg-[#E3EAE1] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Zoom Out"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setAutoRotate((r) => !r)}
          className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
            autoRotate
              ? 'bg-[#1E4D38] text-white border-[#1E4D38]'
              : 'bg-[#FBF9F5]/92 text-[#1E241E] border-[#DCD5C5] hover:bg-[#E3EAE1]'
          }`}
          aria-label={autoRotate ? 'Pause 360 rotation' : 'Enable 360 rotation'}
          title={autoRotate ? 'Pause 360° Rotation' : 'Enable 360° Rotation'}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Collapsible Unified Bottom Control Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl flex flex-col items-center">
        <button
          type="button"
          onClick={() => setControlsCollapsed((c) => !c)}
          className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-[#FBF9F5]/95 border border-[#DCD5C5] text-[11px] font-medium text-[#1E241E] hover:bg-[#E3EAE1] transition-colors cursor-pointer"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Hide Controls</span>
            </>
          )}
        </button>

        {!controlsCollapsed && (
          <div className="w-full bg-[#FBF9F5]/95 border border-[#DCD5C5] rounded-xl p-3 sm:p-3.5 shadow-lg space-y-2.5">
            {/* Stage Selector Rail */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {KETUPAT_STAGES.map((st) => {
                const active = st.index === currentStage;
                return (
                  <button
                    key={st.index}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStage(st.index);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate cursor-pointer ${
                      active
                        ? 'bg-[#1E4D38] text-white'
                        : 'bg-[#F3EFE6] text-[#1E241E] hover:bg-[#E3EAE1]'
                    }`}
                    title={st.title}
                  >
                    {st.title.split('. ')[0]}. {st.title.split('. ')[1].split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Playback & Camera Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#E8E2D5]">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStage === 0}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border border-[#DCD5C5] bg-[#F3EFE6] text-[#1E241E] hover:bg-[#E3EAE1] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[38px]"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (currentStage === KETUPAT_STAGES.length - 1 && !isPlaying) {
                      setCurrentStage(0);
                    }
                    setIsPlaying((p) => !p);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[#1E4D38] text-white hover:bg-[#163B2A] transition-colors cursor-pointer min-h-[38px]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStage === KETUPAT_STAGES.length - 1}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border border-[#DCD5C5] bg-[#F3EFE6] text-[#1E241E] hover:bg-[#E3EAE1] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[38px]"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => controlsApiRef.current?.zoomIn()}
                  className="sm:hidden p-2 rounded-lg border border-[#DCD5C5] bg-[#F3EFE6] text-[#1E241E]"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => controlsApiRef.current?.zoomOut()}
                  className="sm:hidden p-2 rounded-lg border border-[#DCD5C5] bg-[#F3EFE6] text-[#1E241E]"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[#DCD5C5] bg-[#F3EFE6] text-[#1E241E] hover:bg-[#E3EAE1] transition-colors cursor-pointer min-h-[38px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
