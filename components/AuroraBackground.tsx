'use client'

import { useRef, useEffect } from 'react'

const vertexSrc = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
    v_uv = a_position;
    gl_Position = vec4(a_position, 0.0, 1.0);
}`

const fragmentSrc = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

const mat2 m = mat2(0.80, 0.60, -0.60, 0.80);

float fbm4(vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p = m * p * 2.02;
    f += 0.2500 * noise(p); p = m * p * 2.03;
    f += 0.1250 * noise(p); p = m * p * 2.01;
    f += 0.0625 * noise(p);
    return f / 0.9375;
}

vec3 forestPalette(float t) {
    vec3 a = vec3(0.08, 0.4, 0.10);
    vec3 b = vec3(0.15, 0.3, 0.12);
    vec3 c = vec3(0.6, 0.8, 0.4);
    vec3 d = vec3(0.00, 0.20, 0.30);
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;

    float t = u_time * 0.025;

    vec2 q = uv * 1.4 + vec2(t * 0.08, t * 0.04);
    float f1 = fbm4(q);
    float f2 = fbm4(q + vec2(2.3, 8.7) + t * 0.06);

    vec2 warp = uv * 1.4 + vec2(f1 * 0.2 - f2 * 0.12, f2 * 0.2 + f1 * 0.12) + t * 0.03;
    float f = fbm4(warp);

    vec3 col = forestPalette(f * 0.6 + t * 0.005);
    col += vec3(0.0, 0.05, 0.0);

    float d = max(abs(uv.x / aspect), abs(uv.y));
    float vig = 1.0 - smoothstep(0.15, 0.75, d);
    col *= vig;

    fragColor = vec4(col, 1.0);
}`

export default function AuroraBackground({ opacity = 0.12 }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    startRef.current = Date.now()

    const gl = canvas.getContext('webgl2', { alpha: true })
    if (!gl) {
      console.warn('WebGL2 not available')
      return
    }

    const vs = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vs, vertexSrc)
    gl.compileShader(vs)
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.warn('Vertex shader error:', gl.getShaderInfoLog(vs))
      return
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fs, fragmentSrc)
    gl.compileShader(fs)
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.warn('Fragment shader error:', gl.getShaderInfoLog(fs))
      return
    }

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }

    function render() {
      gl.uniform1f(uTime, (Date.now() - startRef.current) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animRef.current = requestAnimationFrame(render)
    }

    resize()
    gl.useProgram(program)
    render()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="aurora-canvas"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}
