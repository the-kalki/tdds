import React, { useEffect, useRef, useState } from 'react';

export interface FluidImpactTextProps {
  className?: string;
  targetFps?: number;
}

/**
 * FluidImpactText - WebGL Liquid Aurora Shader with strict FPS cap
 * Renders an organic, multi-stop liquid fluid mesh (Tangerine, Coral, Crimson, Magenta, Cosmic Indigo)
 * clipped directly to the "IMPACT." typographic letterforms.
 *
 * Invariants:
 * - Strict FPS cap (default 30 FPS) to eliminate GPU/battery drain.
 * - IntersectionObserver pauses RAF loop when out of viewport.
 * - Document visibility listener pauses RAF loop on tab switch.
 * - Fallback to CSS multi-radial gradient for prefers-reduced-motion or missing WebGL.
 */
export const FluidImpactText: React.FC<FluidImpactTextProps> = ({
  className = '',
  targetFps = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mousePosRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check user motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    // Vertex Shader: full quad
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        // Invert Y for canvas orientation
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Domain-warped organic liquid aurora fluid
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform sampler2D u_text_texture;

      // Color Palette: Image 3 target stops
      // 1. Tangerine:   #FF7A00 -> (1.0, 0.478, 0.0)
      // 2. Flame Coral: #FF5722 -> (1.0, 0.341, 0.133)
      // 3. Crimson:     #E02B20 -> (0.878, 0.168, 0.125)
      // 4. Magenta:     #D81B60 -> (0.847, 0.106, 0.376)
      // 5. Deep Indigo: #311B92 -> (0.192, 0.106, 0.572)

      void main() {
        // Sample text mask alpha
        float textAlpha = texture2D(u_text_texture, v_uv).a;
        if (textAlpha < 0.05) {
          discard;
        }

        vec2 p = v_uv;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 q = p;
        q.x *= aspect;

        // Mouse influence
        vec2 m = u_mouse;
        m.x *= aspect;
        float distToMouse = length(q - m);
        float mouseRipple = sin(distToMouse * 10.0 - u_time * 2.5) * exp(-distToMouse * 3.5) * 0.08;

        // Liquid domain warping layers (metaball fluid turbulence)
        float t = u_time * 0.35;
        vec2 warp1 = vec2(
          sin(p.y * 4.0 + t + mouseRipple),
          cos(p.x * 4.0 - t * 0.8)
        ) * 0.22;

        vec2 warp2 = vec2(
          cos((p.x + warp1.x) * 5.0 - t * 0.6),
          sin((p.y + warp1.y) * 5.0 + t * 0.9)
        ) * 0.25;

        vec2 finalUV = p + warp1 + warp2;

        // Wave mixing ratios
        float blend1 = smoothstep(0.1, 0.8, sin(finalUV.x * 3.5 + finalUV.y * 2.0 + t) * 0.5 + 0.5);
        float blend2 = smoothstep(0.2, 0.9, cos(finalUV.y * 4.0 - t * 1.2 + mouseRipple * 2.0) * 0.5 + 0.5);
        float blend3 = smoothstep(0.3, 0.85, sin((finalUV.x + finalUV.y) * 4.5 + t * 0.7) * 0.5 + 0.5);

        vec3 cTangerine = vec3(1.0, 0.48, 0.0);
        vec3 cCoral     = vec3(1.0, 0.34, 0.13);
        vec3 cCrimson   = vec3(0.88, 0.17, 0.12);
        vec3 cMagenta   = vec3(0.85, 0.11, 0.38);
        vec3 cIndigo    = vec3(0.19, 0.11, 0.57);

        // Multi-stop liquid blending
        vec3 colA = mix(cTangerine, cCoral, blend1);
        vec3 colB = mix(cMagenta, cIndigo, blend2);
        vec3 finalColor = mix(colA, colB, blend3);
        finalColor = mix(finalColor, cCrimson, sin(finalUV.x * 6.0 + t) * 0.5 + 0.5);

        // Saturation boost
        finalColor = pow(finalColor, vec3(0.92));

        gl_FragColor = vec4(finalColor, textAlpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) {
      setHasWebGL(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      setHasWebGL(false);
      return;
    }

    gl.useProgram(program);

    // Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTextTexture = gl.getUniformLocation(program, 'u_text_texture');

    // Offscreen 2D canvas to render crisp text mask
    const textCanvas = document.createElement('canvas');
    const textCtx = textCanvas.getContext('2d', { willReadFrequently: false });

    // Texture for text mask
    const textTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const updateTextTexture = () => {
      if (!textCtx || !canvas || !container) return;

      const rect = container.getBoundingClientRect();
      width = Math.max(Math.floor(rect.width * dpr), 200);
      height = Math.max(Math.floor(rect.height * dpr), 60);

      canvas.width = width;
      canvas.height = height;
      textCanvas.width = width;
      textCanvas.height = height;

      gl.viewport(0, 0, width, height);

      // Render crisp typographic mask
      textCtx.clearRect(0, 0, width, height);
      textCtx.fillStyle = '#FFFFFF';
      textCtx.textBaseline = 'middle';
      textCtx.textAlign = 'left';

      const text = 'IMPACT.';
      // Font size relative to container height with automatic width containment
      let fontSize = height * 0.78;
      textCtx.font = `900 ${fontSize}px Syne, "Clash Display", sans-serif`;

      const metrics = textCtx.measureText(text);
      const maxAllowedWidth = width * 0.82; // Generous margin ensuring 'T' and '.' are always fully visible
      if (metrics.width > maxAllowedWidth && metrics.width > 0) {
        fontSize = fontSize * (maxAllowedWidth / metrics.width);
        textCtx.font = `900 ${fontSize}px Syne, "Clash Display", sans-serif`;
      }

      // Position text within canvas
      const startX = width * 0.015;
      const startY = height * 0.52;

      textCtx.fillText(text, startX, startY);

      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textCanvas
      );
    };

    // Ensure fonts are loaded before generating texture
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateTextTexture();
      });
    } else {
      updateTextTexture();
    }

    const resizeObserver = new ResizeObserver(() => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      updateTextTexture();
    });
    resizeObserver.observe(container);

    // Viewport IntersectionObserver: Pause RAF loop when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Tab visibility handler: Pause RAF loop when tab is backgrounded
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else {
        // Re-check bounding box visibility
        const rect = container.getBoundingClientRect();
        isVisibleRef.current =
          rect.top < window.innerHeight && rect.bottom > 0;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mousePosRef.current.targetX = Math.max(0, Math.min(1, x));
      mousePosRef.current.targetY = Math.max(0, Math.min(1, y));
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Strict FPS Cap Loop (Timestamp Delta Throttling)
    let animationFrameId: number;
    let lastFrameTime = performance.now();
    const frameInterval = 1000 / targetFps;
    const startTime = performance.now();

    const renderLoop = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(renderLoop);

      // Do nothing if out of view or tab inactive
      if (!isVisibleRef.current) return;

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) return;

      // Adjust lastFrameTime for drift
      lastFrameTime = currentTime - (elapsed % frameInterval);

      // Smooth mouse interpolation
      const mouse = mousePosRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const time = (currentTime - startTime) * 0.0015;

      gl.useProgram(program);
      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textTexture);
      gl.uniform1i(uTextTexture, 0);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);

      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteTexture(textTexture);
    };
  }, [hasWebGL, prefersReducedMotion, targetFps]);

  // Graceful fallback for prefers-reduced-motion or unsupported WebGL
  if (prefersReducedMotion || !hasWebGL) {
    return (
      <span
        className={`block text-gradient-coral font-display font-black text-5xl sm:text-6xl lg:text-6xl xl:text-7xl tracking-tight uppercase leading-[0.92] select-none ${className}`}
      >
        IMPACT.
      </span>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[540px] h-[54px] sm:h-[68px] lg:h-[80px] xl:h-[90px] select-none ${className}`}
      role="heading"
      aria-label="IMPACT."
    >
      {/* Hidden semantic text for accessibility and search engines */}
      <span className="sr-only">IMPACT.</span>

      {/* Hardware-accelerated WebGL Liquid Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block pointer-events-none filter drop-shadow-sm"
      />
    </div>
  );
};
