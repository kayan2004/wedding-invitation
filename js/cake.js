(function() {
  function initAmeliaWeddingCake(canvas) {
  if (!canvas || typeof THREE === 'undefined') return null;
  if (canvas.__ameliaCakeInstance && typeof canvas.__ameliaCakeInstance.destroy === 'function') {
    canvas.__ameliaCakeInstance.destroy();
  }

  canvas.style.pointerEvents = 'none';
  canvas.style.touchAction = 'pan-y';

  var scene = new THREE.Scene();
  var initialWidth = canvas.clientWidth || (canvas.parentElement && canvas.parentElement.clientWidth) || 300;
  var initialHeight = canvas.clientHeight || (canvas.parentElement && canvas.parentElement.clientHeight) || 300;
  var camera = new THREE.PerspectiveCamera(40, initialWidth / initialHeight, 0.1, 1000);
  camera.position.set(0, 2, 7);
  camera.lookAt(0, 0, 0);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  var dir1 = new THREE.DirectionalLight(0xffffff, 1.2);
  dir1.position.set(5, 10, 5);
  dir1.castShadow = true;
  scene.add(dir1);
  var dir2 = new THREE.DirectionalLight(0xfff0f5, 0.6);
  dir2.position.set(-5, 5, -5);
  scene.add(dir2);
  var spot = new THREE.SpotLight(0xffffff, 0.8, 0, 0.5, 1);
  spot.position.set(0, 8, 0);
  spot.castShadow = true;
  scene.add(spot);

  // Cake group positioned down
  var cakeGroup = new THREE.Group();
  cakeGroup.position.set(0, -0.9, 0);
  scene.add(cakeGroup);

  var weddingCake = new THREE.Group();
  cakeGroup.add(weddingCake);

  function createTier(radius, height, pos, color, drapeCount) {
    var tier = new THREE.Group();
    tier.position.set(pos[0], pos[1], pos[2]);

    // Main cylinder body
    var bodyGeo = new THREE.CylinderGeometry(radius, radius, height, 48);
    var bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3 });
    var body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    tier.add(body);

    // White torus rim at top
    var rimGeo = new THREE.TorusGeometry(radius, 0.03, 16, 48);
    var rimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    var rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.y = height / 2;
    rim.rotation.x = Math.PI / 2;
    tier.add(rim);

    // Drape arches + gold balls
    for (var i = 0; i < drapeCount; i++) {
      var angle = (i / drapeCount) * Math.PI * 2;
      var archGroup = new THREE.Group();
      archGroup.rotation.y = angle;

      // Torus arch drape
      var archGeo = new THREE.TorusGeometry(0.25, 0.04, 8, 24, Math.PI);
      var archMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      var arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(radius, 0.1, 0);
      arch.rotation.set(0, Math.PI / 2, 0);
      archGroup.add(arch);

      // Gold sphere between arches
      var goldGeo = new THREE.SphereGeometry(0.05, 16, 16);
      var goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.4, roughness: 0.2 });
      var gold = new THREE.Mesh(goldGeo, goldMat);
      gold.position.set(
        radius * Math.cos(Math.PI / drapeCount),
        0.35,
        radius * Math.sin(Math.PI / drapeCount)
      );
      archGroup.add(gold);

      tier.add(archGroup);
    }

    // Bottom dots
    var dotCount = drapeCount * 5;
    for (var j = 0; j < dotCount; j++) {
      var dotAngle = (j / dotCount) * Math.PI * 2;
      var dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      var dotMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 });
      var dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(
        Math.cos(dotAngle) * (radius + 0.02),
        -height / 2 + 0.05,
        Math.sin(dotAngle) * (radius + 0.02)
      );
      dot.castShadow = true;
      tier.add(dot);
    }

    return tier;
  }

  // Three tiers
  weddingCake.add(createTier(1.3, 0.8, [0, 0, 0], '#fce7f3', 12));
  weddingCake.add(createTier(0.95, 0.7, [0, 0.75, 0], '#fbcfe8', 9));
  weddingCake.add(createTier(0.6, 0.6, [0, 1.4, 0], '#fdf2f8', 6));

  // Cake Topper
  var topperGroup = new THREE.Group();
  topperGroup.position.set(0, 1.7, 0);
  var topperInner = new THREE.Group();
  topperGroup.add(topperInner);

  // Bride
  var brideGroup = new THREE.Group();
  brideGroup.position.set(-0.12, 0, 0);

  var dressGeo = new THREE.ConeGeometry(0.2, 0.5, 32);
  var dressMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
  var dress = new THREE.Mesh(dressGeo, dressMat);
  dress.position.set(0, 0.25, 0);
  dress.castShadow = true;
  brideGroup.add(dress);

  var brideHeadGeo = new THREE.SphereGeometry(0.07, 16, 16);
  var brideHeadMat = new THREE.MeshStandardMaterial({ color: 0xffe0bd, roughness: 0.5 });
  var brideHead = new THREE.Mesh(brideHeadGeo, brideHeadMat);
  brideHead.position.set(0, 0.55, 0);
  brideHead.castShadow = true;
  brideGroup.add(brideHead);

  var veilGeo = new THREE.SphereGeometry(0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  var veilMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
  var veil = new THREE.Mesh(veilGeo, veilMat);
  veil.position.set(0, 0.58, -0.05);
  veil.rotation.set(-0.2, 0, 0);
  brideGroup.add(veil);

  topperInner.add(brideGroup);

  // Groom
  var groomGroup = new THREE.Group();
  groomGroup.position.set(0.12, 0, 0);

  var suitGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
  var suitMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c, roughness: 0.6 });
  var suit = new THREE.Mesh(suitGeo, suitMat);
  suit.position.set(0, 0.3, 0);
  suit.castShadow = true;
  groomGroup.add(suit);

  var groomHeadGeo = new THREE.SphereGeometry(0.075, 16, 16);
  var groomHeadMat = new THREE.MeshStandardMaterial({ color: 0xffe0bd, roughness: 0.5 });
  var groomHead = new THREE.Mesh(groomHeadGeo, groomHeadMat);
  groomHead.position.set(0, 0.65, 0);
  groomHead.castShadow = true;
  groomGroup.add(groomHead);

  topperInner.add(groomGroup);

  // Connecting arm
  var armGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 8);
  var armMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c });
  var arm = new THREE.Mesh(armGeo, armMat);
  arm.position.set(0, 0.4, 0);
  arm.rotation.set(0, 0, Math.PI / 2);
  arm.castShadow = true;
  topperInner.add(arm);

  // Red gem on top
  var gemGeo = new THREE.BoxGeometry(0.1, 0.1, 0.05);
  var gemMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.2 });
  var gem = new THREE.Mesh(gemGeo, gemMat);
  gem.position.set(0, 0.9, 0);
  gem.rotation.set(0, 0, Math.PI / 4);
  gem.castShadow = true;
  topperGroup.add(gem);

  weddingCake.add(topperGroup);

  // Animation loop
  var clock = new THREE.Clock();
  var animationFrame = null;
  var isVisible = true;
  var isRunning = false;
  var visibilityObserver = null;

  function animate() {
    if (!isRunning) return;

    animationFrame = requestAnimationFrame(animate);
    if (document.hidden || !isVisible) return;

    var delta = clock.getDelta();
    weddingCake.rotation.y += delta * 0.2;
    topperInner.rotation.y += delta * 0.8;
    renderer.render(scene, camera);
  }

  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    clock.getDelta();
    animationFrame = requestAnimationFrame(animate);
  }

  function stopAnimation() {
    isRunning = false;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  function handleVisibilityChange() {
    if (document.hidden || !isVisible) {
      stopAnimation();
      return;
    }

    startAnimation();
  }

  renderer.render(scene, camera);

  if ('IntersectionObserver' in window) {
    visibilityObserver = new IntersectionObserver(function(entries) {
      isVisible = entries.some(function(entry) {
        return entry.isIntersecting;
      });
      handleVisibilityChange();
    }, { rootMargin: '120px 0px' });
    visibilityObserver.observe(canvas.parentElement || canvas);
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  startAnimation();

  // Responsive resize
  var ro = new ResizeObserver(function() {
    var w = canvas.parentElement.clientWidth;
    var h = canvas.parentElement.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  });
  ro.observe(canvas.parentElement);

  var instance = {
    destroy: function() {
      stopAnimation();
      ro.disconnect();
      if (visibilityObserver) visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
      canvas.__ameliaCakeInstance = null;
    }
  };
  canvas.__ameliaCakeInstance = instance;
  return instance;
  }

  window.initAmeliaWeddingCake = initAmeliaWeddingCake;

  window.initAmeliaCakeOnReady = function() {
    var canvas = document.getElementById('wedding-cake-canvas');
    if (canvas) initAmeliaWeddingCake(canvas);
  };

  window.initAmeliaCakeOnReady();
})();
