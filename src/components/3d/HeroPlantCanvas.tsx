import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useLanguage } from '../../context/LanguageContext';
import { RotateCw, ZoomIn, Eye, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react';

interface HeroPlantCanvasProps {
  onScanClick?: () => void;
  onOpenVideo?: () => void;
}

export const HeroPlantCanvas: React.FC<HeroPlantCanvasProps> = ({ onScanClick, onOpenVideo }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeView, setActiveView] = useState<'full' | 'fruit' | 'leaves' | 'top'>('full');
  const [plantHealth, setPlantHealth] = useState<'healthy' | 'blighted' | 'healing'>('healthy');
  const [isHoveringTomato, setIsHoveringTomato] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { t, isUrdu } = useLanguage();

  // Animation state references (isolated from React state updates to preserve 60fps)
  const stateRef = useRef({
    isRotating: true,
    targetCamPos: new THREE.Vector3(0, 1.7, 4.3),
    targetLookAt: new THREE.Vector3(0, 1.25, 0),
    mouseX: 0,
    mouseY: 0,
    isDragging: false,
    dragStartX: 0,
    plantRotationY: 0.25,
    targetRotationY: 0.25,
    tomatoMeshes: [] as THREE.Mesh[],
    leafMeshes: [] as THREE.Mesh[],
    scanBeam: null as THREE.Mesh | null,
    scanBeamProgress: 0,
    isScanningActive: false,
    targetLeafColor: new THREE.Color(0x1f7a3a),
    currentLeafColor: new THREE.Color(0x1f7a3a),
    camera: null as THREE.PerspectiveCamera | null
  });

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
  }, [isRotating]);

  // Camera preset transitions
  useEffect(() => {
    if (activeView === 'full') {
      stateRef.current.targetCamPos.set(0, 1.7, 4.3);
      stateRef.current.targetLookAt.set(0, 1.25, 0);
    } else if (activeView === 'fruit') {
      // Zoom right in to the ripe tomato cluster
      stateRef.current.targetCamPos.set(0.48, 1.22, 1.85);
      stateRef.current.targetLookAt.set(0.18, 1.15, 0);
    } else if (activeView === 'leaves') {
      // Angle towards foliage
      stateRef.current.targetCamPos.set(-0.75, 1.9, 2.3);
      stateRef.current.targetLookAt.set(-0.25, 1.65, 0);
    } else if (activeView === 'top') {
      // Top down inspection
      stateRef.current.targetCamPos.set(0, 3.2, 2.2);
      stateRef.current.targetLookAt.set(0, 1.1, 0);
    }
  }, [activeView]);

  // Handle Plant Health Transformation
  useEffect(() => {
    if (plantHealth === 'healthy') {
      stateRef.current.targetLeafColor.setHex(0x1f7a3a);
    } else if (plantHealth === 'blighted') {
      // Chlorotic brownish-yellow leaf discoloration of early blight
      stateRef.current.targetLeafColor.setHex(0x8a7a2a);
    }
  }, [plantHealth]);

  const handleFruitZoom = () => {
    setActiveView('fruit');
    setIsRotating(false);
    setToastMessage(isUrdu ? 'ٹماٹر کا معائنہ: 360° گھمانے کے لیے ڈریگ کریں' : 'Tomato Inspection: Drag to inspect 360°');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetView = () => {
    setActiveView('full');
    setIsRotating(true);
  };

  // Section 7 Requirement: Interactive Plant Healing & Scan Simulation
  const handleSimulateHealing = () => {
    setPlantHealth('healing');
    stateRef.current.isScanningActive = true;
    stateRef.current.scanBeamProgress = 0;
    setActiveView('leaves');
    setIsRotating(false);

    setToastMessage(t.plant3d.healingToast);

    // After scanning sweep completes, transition leaf colors back to healthy
    setTimeout(() => {
      setPlantHealth('healthy');
      stateRef.current.targetLeafColor.setHex(0x1f7a3a);
    }, 1800);

    setTimeout(() => {
      stateRef.current.isScanningActive = false;
      setActiveView('full');
      setIsRotating(true);
      setToastMessage(
        isUrdu
          ? 'صحتیابی مکمل! پودا اب مکمل طور پر صحت مند اور محفوظ ہے۔'
          : 'Healing Complete! Leaves restored to full photosynthetic vigor.'
      );
      setTimeout(() => setToastMessage(null), 4000);
    }, 3800);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Fog matching warm cream / sage atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#faf8f2', 0.035);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.7, 4.3);
    stateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Balanced Studio Lighting
    const hemiLight = new THREE.HemisphereLight('#fefdf8', '#bbf7d0', 1.6);
    scene.add(hemiLight);

    const sunKeyLight = new THREE.DirectionalLight('#fffbeb', 2.4);
    sunKeyLight.position.set(4, 7, 4);
    sunKeyLight.castShadow = !isSoftwareGl;
    if (sunKeyLight.castShadow) {
      sunKeyLight.shadow.mapSize.width = 1024;
      sunKeyLight.shadow.mapSize.height = 1024;
      sunKeyLight.shadow.camera.near = 0.5;
      sunKeyLight.shadow.camera.far = 14;
      sunKeyLight.shadow.bias = -0.0004;
    }
    scene.add(sunKeyLight);

    const fillLight = new THREE.DirectionalLight('#e0f2fe', 0.85);
    fillLight.position.set(-3, 3, -2);
    scene.add(fillLight);

    // Ground Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x2d4334,
      transparent: true,
      opacity: 0.18,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    scene.add(shadowMesh);

    // Plant Group
    const plantGroup = new THREE.Group();
    scene.add(plantGroup);

    // Terracotta Planter Pot
    const potGeo = new THREE.CylinderGeometry(0.72, 0.52, 0.72, 32);
    const potMat = new THREE.MeshStandardMaterial({
      color: 0xbf6747,
      roughness: 0.7,
      metalness: 0.05
    });
    const potMesh = new THREE.Mesh(potGeo, potMat);
    potMesh.position.y = 0.36;
    potMesh.receiveShadow = !isSoftwareGl;
    plantGroup.add(potMesh);

    // Pot Rim Lip
    const rimGeo = new THREE.TorusGeometry(0.72, 0.05, 14, 32);
    const rimMesh = new THREE.Mesh(rimGeo, potMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.72;
    plantGroup.add(rimMesh);

    // Rich Dark Potting Soil
    const soilGeo = new THREE.CylinderGeometry(0.69, 0.69, 0.08, 32);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x22170f,
      roughness: 0.95
    });
    const soilMesh = new THREE.Mesh(soilGeo, soilMat);
    soilMesh.position.y = 0.69;
    soilMesh.receiveShadow = !isSoftwareGl;
    plantGroup.add(soilMesh);

    // Bamboo Garden Stake
    const stakeGeo = new THREE.CylinderGeometry(0.024, 0.024, 2.4, 16);
    const stakeMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      roughness: 0.8
    });
    const stakeMesh = new THREE.Mesh(stakeGeo, stakeMat);
    stakeMesh.position.set(-0.06, 1.85, -0.04);
    stakeMesh.castShadow = !isSoftwareGl;
    plantGroup.add(stakeMesh);

    // Main Vine Stem
    const stemPoints = [
      new THREE.Vector3(0, 0.68, 0),
      new THREE.Vector3(0.03, 1.05, 0.02),
      new THREE.Vector3(-0.04, 1.45, -0.02),
      new THREE.Vector3(0.02, 1.85, 0.03),
      new THREE.Vector3(-0.02, 2.25, 0.01),
      new THREE.Vector3(0.0, 2.6, 0.0)
    ];
    const stemCurve = new THREE.CatmullRomCurve3(stemPoints);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 40, 0.038, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x2f6b3b,
      roughness: 0.55
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.castShadow = !isSoftwareGl;
    plantGroup.add(stemMesh);

    // Realistic Compound Tomato Leaf Generator
    const createLeafGeometry = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.14, 0.08, 0.18, 0.35, 0.16, 0.55);
      shape.bezierCurveTo(0.12, 0.75, 0.04, 0.9, 0, 1.05);
      shape.bezierCurveTo(-0.04, 0.9, -0.12, 0.75, -0.16, 0.55);
      shape.bezierCurveTo(-0.18, 0.35, -0.14, 0.08, 0, 0);
      return new THREE.ShapeGeometry(shape, 8);
    };

    const healthyLeafMat = new THREE.MeshStandardMaterial({
      color: 0x1f7a3a,
      roughness: 0.45,
      side: THREE.DoubleSide
    });

    const leafGroupList: THREE.Group[] = [];
    const leafMeshes: THREE.Mesh[] = [];
    const leafGeo = createLeafGeometry();

    const makeCompoundLeaf = (scale = 1.0) => {
      const branchGroup = new THREE.Group();
      const mainPetiolePoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0.1, 0.25),
        new THREE.Vector3(0, 0.15, 0.55)
      ];
      const pCurve = new THREE.CatmullRomCurve3(mainPetiolePoints);
      const pGeo = new THREE.TubeGeometry(pCurve, 12, 0.014 * scale, 6, false);
      const pMesh = new THREE.Mesh(pGeo, stemMat);
      branchGroup.add(pMesh);

      const terminalLeaf = new THREE.Mesh(leafGeo, healthyLeafMat);
      terminalLeaf.scale.set(0.9 * scale, 0.9 * scale, 0.9 * scale);
      terminalLeaf.position.set(0, 0.15, 0.55);
      terminalLeaf.rotation.x = Math.PI / 3;
      terminalLeaf.castShadow = !isSoftwareGl;
      branchGroup.add(terminalLeaf);
      leafMeshes.push(terminalLeaf);

      const subPairs = [
        { z: 0.22, xOff: 0.22, rotZ: 0.6 },
        { z: 0.22, xOff: -0.22, rotZ: -0.6 },
        { z: 0.4, xOff: 0.18, rotZ: 0.5 },
        { z: 0.4, xOff: -0.18, rotZ: -0.5 }
      ];

      subPairs.forEach((sp) => {
        const subLeaf = new THREE.Mesh(leafGeo, healthyLeafMat);
        subLeaf.scale.set(0.65 * scale, 0.65 * scale, 0.65 * scale);
        subLeaf.position.set(sp.xOff * scale, 0.12 * scale, sp.z * scale);
        subLeaf.rotation.x = Math.PI / 3.5;
        subLeaf.rotation.z = sp.rotZ;
        subLeaf.castShadow = !isSoftwareGl;
        branchGroup.add(subLeaf);
        leafMeshes.push(subLeaf);
      });

      return branchGroup;
    };

    // Branch arrangements
    const leafConfigs = [
      { y: 1.15, rotY: 0.2, rotX: 0.2, scale: 0.95 },
      { y: 1.38, rotY: 2.1, rotX: 0.25, scale: 1.0 },
      { y: 1.62, rotY: 4.2, rotX: 0.18, scale: 1.05 },
      { y: 1.88, rotY: 1.1, rotX: 0.3, scale: 1.0 },
      { y: 2.15, rotY: 3.2, rotX: 0.22, scale: 0.9 },
      { y: 2.4, rotY: 5.3, rotX: 0.35, scale: 0.8 }
    ];

    leafConfigs.forEach((cfg) => {
      const lGroup = makeCompoundLeaf(cfg.scale);
      lGroup.position.set(0, cfg.y, 0);
      lGroup.rotation.y = cfg.rotY;
      lGroup.rotation.x = cfg.rotX;
      plantGroup.add(lGroup);
      leafGroupList.push(lGroup);
    });

    stateRef.current.leafMeshes = leafMeshes;

    // Holographic AI Scanning Plane (Section 7 Animation Requirement)
    const scanPlaneGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.04, 32);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const scanBeam = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanBeam.position.set(0, 1.2, 0);
    plantGroup.add(scanBeam);
    stateRef.current.scanBeam = scanBeam;

    // Tomato Fruit Meshes with Glossy PBR Material
    const tomatoMat = new THREE.MeshPhysicalMaterial({
      color: 0xdf2b18,
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15
    });

    const tomatoUnripeMat = new THREE.MeshPhysicalMaterial({
      color: 0x86bd42,
      roughness: 0.3,
      metalness: 0.05,
      clearcoat: 0.6
    });

    const tomatoMeshes: THREE.Mesh[] = [];

    const createTomatoFruit = (radius: number, isRipe = true) => {
      const fruitGroup = new THREE.Group();
      const geo = new THREE.SphereGeometry(radius, 24, 20);
      geo.scale(1.0, 0.9, 1.0);
      const mesh = new THREE.Mesh(geo, isRipe ? tomatoMat : tomatoUnripeMat);
      mesh.castShadow = !isSoftwareGl;
      fruitGroup.add(mesh);
      tomatoMeshes.push(mesh);

      // Calyx / green sepal star on top
      const calyxGeo = new THREE.ConeGeometry(radius * 0.35, 0.04, 5);
      const calyxMesh = new THREE.Mesh(calyxGeo, stemMat);
      calyxMesh.position.y = radius * 0.88;
      fruitGroup.add(calyxMesh);

      return fruitGroup;
    };

    // Tomato Cluster 1 (Ripe Red Tomatoes - Main focal point)
    const cluster1 = new THREE.Group();
    cluster1.position.set(0.18, 1.35, 0.18);

    const tomato1 = createTomatoFruit(0.14, true);
    tomato1.position.set(0, -0.06, 0.08);
    cluster1.add(tomato1);

    const tomato2 = createTomatoFruit(0.11, true);
    tomato2.position.set(0.12, -0.04, 0.02);
    cluster1.add(tomato2);

    const tomato3 = createTomatoFruit(0.09, false); // Green ripening
    tomato3.position.set(-0.08, 0.02, 0.06);
    cluster1.add(tomato3);

    plantGroup.add(cluster1);

    // Tomato Cluster 2 (Higher branch, ripening)
    const cluster2 = new THREE.Group();
    cluster2.position.set(-0.16, 1.95, 0.14);

    const tomato4 = createTomatoFruit(0.12, true);
    tomato4.position.set(0, -0.04, 0.04);
    cluster2.add(tomato4);

    const tomato5 = createTomatoFruit(0.085, false);
    tomato5.position.set(-0.09, 0.02, -0.02);
    cluster2.add(tomato5);

    plantGroup.add(cluster2);

    stateRef.current.tomatoMeshes = tomatoMeshes;

    // Ambient floating plant pollen / bio-particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 3.5;
      particlePositions[i * 3 + 1] = Math.random() * 2.8 + 0.3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      particleSpeeds.push(0.15 + Math.random() * 0.25);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x86efac,
      size: 0.035,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Raycasting for Direct Tomato Clicking
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mouseX = normX;
      stateRef.current.mouseY = normY;

      mouseCoord.x = normX;
      mouseCoord.y = normY;

      // Raycast test for hover state
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(tomatoMeshes, false);
      setIsHoveringTomato(intersects.length > 0);

      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragStartX;
        stateRef.current.targetRotationY += deltaX * 0.008;
        stateRef.current.dragStartX = e.clientX;
      }
    };

    const handlePointerUp = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseCoord.x = normX;
      mouseCoord.y = normY;

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(tomatoMeshes, false);

      if (intersects.length > 0) {
        handleFruitZoom();
      }

      stateRef.current.isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    // Touch Support for mobile
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        stateRef.current.isDragging = true;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (stateRef.current.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        stateRef.current.targetRotationY += deltaX * 0.01;
        touchStartX = e.touches[0].clientX;
      }
    };
    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera smooth interpolation
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        stateRef.current.targetCamPos.x + stateRef.current.mouseX * 0.25,
        3.5,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        stateRef.current.targetCamPos.y + stateRef.current.mouseY * 0.2,
        3.5,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        stateRef.current.targetCamPos.z,
        3.5,
        delta
      );
      camera.lookAt(stateRef.current.targetLookAt);

      // Auto rotation when enabled and not dragging
      if (stateRef.current.isRotating && !stateRef.current.isDragging) {
        stateRef.current.targetRotationY += 0.22 * delta;
      }

      stateRef.current.plantRotationY = THREE.MathUtils.damp(
        stateRef.current.plantRotationY,
        stateRef.current.targetRotationY,
        6.0,
        delta
      );
      plantGroup.rotation.y = stateRef.current.plantRotationY;

      // Smooth leaf color transition between Healthy & Blighted
      stateRef.current.currentLeafColor.lerp(stateRef.current.targetLeafColor, delta * 3.0);
      healthyLeafMat.color.copy(stateRef.current.currentLeafColor);

      // Holographic Scan Beam Animation (Sweeps up and down plant)
      if (stateRef.current.isScanningActive && scanBeam) {
        stateRef.current.scanBeamProgress += delta * 1.5;
        const scanY = 1.0 + Math.sin(stateRef.current.scanBeamProgress * 3.0) * 0.9;
        scanBeam.position.y = scanY;
        (scanBeam.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(time * 10) * 0.25;
      } else if (scanBeam) {
        (scanBeam.material as THREE.MeshBasicMaterial).opacity = 0;
      }

      // Organic gentle breeze animation on leaves
      leafGroupList.forEach((leaf, idx) => {
        const sway = Math.sin(time * 2.0 + idx * 0.8) * 0.035;
        leaf.rotation.z = Math.sin(time * 1.5 + idx) * 0.025;
        leaf.rotation.x = leafConfigs[idx].rotX + sway;
      });

      cluster1.rotation.z = Math.sin(time * 1.8) * 0.02;

      // Floating bio-particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i] * delta * 0.25;
        if (positions[i * 3 + 1] > 3.4) {
          positions[i * 3 + 1] = 0.3;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[520px] lg:min-h-[640px] flex flex-col justify-end">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className={`absolute inset-0 w-full h-full select-none ${
          isHoveringTomato ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
        }`}
        title={isUrdu ? 'پودے کو گھمانے کے لیے ڈریگ کریں، یا زوم کرنے کے لیے ٹماٹر پر کلک کریں' : 'Drag to rotate 360°, or click red tomato to zoom in'}
      />

      {/* Interactive Helper Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 bg-emerald-900 text-white text-xs font-semibold rounded-full shadow-lg border border-emerald-500 animate-in fade-in slide-in-from-top-2 duration-300">
          {toastMessage}
        </div>
      )}

      {/* Top Left: Plant Health State Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-sm backdrop-blur-md ${
            plantHealth === 'blighted'
              ? 'bg-amber-100/90 text-amber-900 border-amber-300'
              : plantHealth === 'healing'
              ? 'bg-emerald-100/90 text-emerald-950 border-emerald-400 animate-pulse'
              : 'bg-white/90 text-emerald-900 border-emerald-200'
          }`}
        >
          {plantHealth === 'blighted' ? (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
          ) : plantHealth === 'healing' ? (
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
          ) : (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span>
            {plantHealth === 'blighted'
              ? t.plant3d.blightedMode
              : plantHealth === 'healing'
              ? isUrdu
                ? 'اے آئی اسکین جاری ہے...'
                : 'AI Scanning Plant...'
              : t.plant3d.healthyMode}
          </span>
        </div>
      </div>

      {/* Top Right: Subtle Spec Badge */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 text-xs text-emerald-900 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="font-semibold">{t.plant3d.badge}</span>
      </div>

      {/* Clean, Useful Light Sage Theme Bottom Controls Dock */}
      <div className="relative z-10 mx-auto mb-6 px-4 py-2.5 bg-white/95 backdrop-blur-md border border-[#cbdcd0] rounded-2xl shadow-xl flex flex-wrap items-center justify-center gap-2.5 text-xs max-w-[96vw]">
        {/* Camera Views */}
        <div className="flex items-center gap-1 bg-[#f4f7f5] p-1 rounded-xl">
          <button
            onClick={handleResetView}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              activeView === 'full'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-[#3d5947] hover:text-[#13281c]'
            }`}
          >
            {t.plant3d.wholePlant}
          </button>
          <button
            onClick={handleFruitZoom}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'fruit'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-[#3d5947] hover:text-[#13281c]'
            }`}
            title="Zoom in on red fruit cluster"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{t.plant3d.tomatoes}</span>
          </button>
          <button
            onClick={() => setActiveView('leaves')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              activeView === 'leaves'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-[#3d5947] hover:text-[#13281c]'
            }`}
          >
            {t.plant3d.leaves}
          </button>
        </div>

        <div className="h-4 w-px bg-[#cbdcd0] hidden sm:block" />

        {/* Section 7 Plant Health Simulator Button */}
        <button
          onClick={handleSimulateHealing}
          className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold border border-emerald-300 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm active:scale-95"
          title="Watch the AI scan and restore blighted leaves to health"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t.plant3d.healSimulationBtn}</span>
        </button>

        {/* Toggle Unhealthy / Healthy manually */}
        <button
          onClick={() => setPlantHealth(plantHealth === 'healthy' ? 'blighted' : 'healthy')}
          className={`px-2.5 py-1.5 rounded-lg border font-medium transition-colors whitespace-nowrap text-[11px] ${
            plantHealth === 'blighted'
              ? 'bg-amber-100 border-amber-300 text-amber-900'
              : 'bg-white border-[#cbdcd0] text-[#3d5947]'
          }`}
        >
          {plantHealth === 'blighted'
            ? isUrdu
              ? 'صحت مند دکھائیں'
              : 'Show Healthy'
            : isUrdu
            ? 'بیمار پتہ دکھائیں'
            : 'Show Blighted'}
        </button>

        <div className="h-4 w-px bg-[#cbdcd0] hidden sm:block" />

        {/* Rotation toggle */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-2.5 py-1.5 rounded-lg border transition-colors font-medium whitespace-nowrap flex items-center gap-1.5 text-[11px] ${
            isRotating
              ? 'bg-[#edf5ef] border-emerald-300 text-emerald-900'
              : 'bg-white border-[#cbdcd0] text-[#3d5947]'
          }`}
        >
          <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          <span>{isRotating ? t.plant3d.pauseSpin : t.plant3d.spinPlant}</span>
        </button>

        {onOpenVideo && (
          <button
            onClick={onOpenVideo}
            className="px-3 py-1.5 text-emerald-800 bg-[#edf5ef] hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            {isUrdu ? 'ویڈیو گائیڈ' : 'Watch Video'}
          </button>
        )}

        {onScanClick && (
          <button
            onClick={onScanClick}
            className="px-4 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
          >
            {t.plant3d.checkLeaf}
          </button>
        )}
      </div>
    </div>
  );
};
