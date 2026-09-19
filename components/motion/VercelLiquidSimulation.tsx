"use client";

import React, { useEffect, useRef } from "react";

interface VercelLiquidSimulationProps {
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  time: number;
  strength: number;
}

const MAX_RIPPLES = 16;

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_uv;

  uniform float u_time;
  uniform float u_aspect;
  uniform float u_isDark;
  uniform vec4 u_ripples[16]; // xy = uv coords, z = time, w = strength
  uniform int u_numRipples;

  void main() {
    vec2 uv = v_uv;
    vec2 aspectCoord = vec2(uv.x * u_aspect, uv.y);

    // Ondulação suave contínua de fundo (ambiente vivo e respirante)
    float baseWave = sin(aspectCoord.x * 3.5 + u_time * 0.7) * cos(aspectCoord.y * 2.8 + u_time * 0.5) * 0.012;
    vec2 normalOffset = vec2(
      cos(aspectCoord.x * 3.5 + u_time * 0.7) * 0.012,
      -sin(aspectCoord.y * 2.8 + u_time * 0.5) * 0.012
    );

    float totalDisplacement = baseWave;

    // Acúmulo analítico das ondas líquidas de impacto do mouse/touch
    for (int i = 0; i < 16; i++) {
      if (i >= u_numRipples) break;
      vec4 r = u_ripples[i];
      vec2 rCoord = vec2(r.x * u_aspect, r.y);
      vec2 diff = aspectCoord - rCoord;
      float dist = length(diff);
      float elapsed = u_time - r.z;

      if (elapsed > 0.0 && elapsed < 3.2) {
        float waveSpeed = 0.55;
        float waveFront = elapsed * waveSpeed;
        float distDelta = dist - waveFront;

        // Decaimento exponencial com o tempo e com a distância do centro
        float timeDecay = exp(-elapsed * 1.4);
        float ringEnvelope = exp(-distDelta * distDelta * 110.0);
        float amp = r.w * timeDecay * ringEnvelope;

        // Frequência de dispersão da onda
        float freq = 34.0;
        float wave = sin(distDelta * freq) * amp;
        totalDisplacement += wave;

        vec2 dir = normalize(diff + vec2(0.00001));
        normalOffset += dir * cos(distDelta * freq) * amp * 3.2;
      }
    }

    // Vetor Normal da Superfície Líquida
    vec3 N = normalize(vec3(-normalOffset * 6.5, 1.0));
    vec3 L = normalize(vec3(0.35, 0.55, 0.75));
    vec3 V = vec3(0.0, 0.0, 1.0);

    // Reflexo especular (Brilho cromado / mercúrio)
    vec3 R = reflect(-L, N);
    float spec = pow(max(dot(R, V), 0.0), 38.0);
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.8);

    vec3 finalColor;

    if (u_isDark > 0.5) {
      // MODO ESCURO (Dark Obsidian & Chrome com refração esmeralda e ciano)
      vec3 darkObsidian = vec3(0.02, 0.032, 0.048);
      vec3 emeraldCaustic = vec3(0.063, 0.725, 0.502); // #10B981
      vec3 cyanHighlight = vec3(0.008, 0.518, 0.776);  // #0284C7
      vec3 liquidChrome = vec3(0.85, 0.92, 0.98);

      vec3 fluidGlow = mix(emeraldCaustic, cyanHighlight, clamp((N.x + 1.0) * 0.5, 0.0, 1.0));
      vec3 causticRefract = fluidGlow * (abs(totalDisplacement) * 14.0 + fresnel * 0.4);

      finalColor = darkObsidian + causticRefract + liquidChrome * (spec * 0.85);
    } else {
      // MODO CLARO (Cristalino fluido e luminoso)
      vec3 lightCanvas = vec3(0.973, 0.980, 0.988); // #F8FAFC
      vec3 emeraldDeep = vec3(0.016, 0.471, 0.341); // #047857
      vec3 navyDeep = vec3(0.059, 0.169, 0.282);    // #0F2B48
      vec3 whiteShine = vec3(1.0, 1.0, 1.0);

      vec3 fluidTint = mix(emeraldDeep, navyDeep, clamp((N.x + 1.0) * 0.5, 0.0, 1.0));
      vec3 causticRefract = fluidTint * (abs(totalDisplacement) * 5.5 + fresnel * 0.15);

      finalColor = lightCanvas - causticRefract * 0.4 + whiteShine * (spec * 0.65);
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

/**
 * VercelLiquidSimulation (Skiper 12 Flagship Component)
 * Simulação física de fluidos via WebGL shaders com ondulações cáusticas interativas,
 * reagindo com inércia cinemática ao mouse e ao toque touch mobile.
 */
export function VercelLiquidSimulation({ className = "" }: VercelLiquidSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL não disponível para VercelLiquidSimulation.");
      return;
    }

    // Criação dos shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Erro compilando shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Erro linkando programa WebGL:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Geometria de tela cheia (Quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uAspectLoc = gl.getUniformLocation(program, "u_aspect");
    const uIsDarkLoc = gl.getUniformLocation(program, "u_isDark");
    const uRipplesLoc = gl.getUniformLocation(program, "u_ripples");
    const uNumRipplesLoc = gl.getUniformLocation(program, "u_numRipples");

    // Gerenciamento de ondas interativas
    const ripples: Ripple[] = [];
    let lastDropTime = 0;
    let lastX = 0;
    let lastY = 0;

    const addRipple = (x: number, y: number, strength = 1.0) => {
      const now = performance.now() / 1000;
      if (now - lastDropTime < 0.04) return; // Limitar taxa de disparo
      lastDropTime = now;

      ripples.unshift({ x, y, time: now, strength });
      if (ripples.length > MAX_RIPPLES) {
        ripples.pop();
      }
    };

    // Listeners de mouse e toque
    const handlePointerMove = (clientX: number, clientY: number, forceStrength = 1.0) => {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      if (x < 0 || x > 1 || y < 0 || y > 1) return;

      const distMoved = Math.hypot(x - lastX, y - lastY);
      if (distMoved > 0.015) {
        lastX = x;
        lastY = y;
        addRipple(x, y, Math.min(forceStrength + distMoved * 5, 2.2));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY, 1.0);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY, 1.4);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY, 1.8);
      }
    };

    // Resize com ajuste DPR
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    handleResize();

    // Detecção de tema Dark / Light
    const checkIsDark = () => document.documentElement.classList.contains("dark");
    let isDark = checkIsDark();

    const themeObserver = new MutationObserver(() => {
      isDark = checkIsDark();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Injeção de ondulação inicial elegante ao carregar
    setTimeout(() => {
      addRipple(0.5, 0.5, 1.5);
      addRipple(0.72, 0.45, 1.2);
    }, 400);

    // Loop de renderização WebGL
    let animId: number;
    const startTime = performance.now() / 1000;
    const rippleArray = new Float32Array(MAX_RIPPLES * 4);

    const render = () => {
      const now = performance.now() / 1000;
      const time = now - startTime;

      // Filtrar ripples expirados (> 3.5s)
      while (ripples.length > 0 && now - ripples[ripples.length - 1].time > 3.5) {
        ripples.pop();
      }

      // Preencher array uniform
      for (let i = 0; i < MAX_RIPPLES; i++) {
        if (i < ripples.length) {
          rippleArray[i * 4 + 0] = ripples[i].x;
          rippleArray[i * 4 + 1] = ripples[i].y;
          rippleArray[i * 4 + 2] = ripples[i].time - startTime;
          rippleArray[i * 4 + 3] = ripples[i].strength;
        } else {
          rippleArray[i * 4 + 0] = 0;
          rippleArray[i * 4 + 1] = 0;
          rippleArray[i * 4 + 2] = -999;
          rippleArray[i * 4 + 3] = 0;
        }
      }

      const aspect = canvas.width / (canvas.height || 1);

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, time);
      gl.uniform1f(uAspectLoc, aspect);
      gl.uniform1f(uIsDarkLoc, isDark ? 1.0 : 0.0);
      gl.uniform4fv(uRipplesLoc, rippleArray);
      gl.uniform1i(uNumRipplesLoc, ripples.length);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      themeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 block transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    />
  );
}
