import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AuroraClock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec4 iDate;
      varying vec2 vUv;

      #define TWELVE_HOUR_CLOCK 1
      #define GLOWPULSE 1

      float pi = atan(1.0)*4.0;
      float tau = atan(1.0)*8.0;
      const float scale = 1.0 / 12.0;
      vec2 digitSize = vec2(1.0,1.5) * scale;
      vec2 digitSpacing = vec2(1.1,1.6) * scale;

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * .1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec2 pos) {
        vec2 i = floor(pos);
        vec2 f = fract(pos);
        float a = hash12(i);
        float b = hash12(i + vec2(1, 0));
        float c = hash12(i + vec2(0, 1));
        float d = hash12(i + vec2(1, 1));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      float dfLine(vec2 start, vec2 end, vec2 uv) {
        start *= scale;
        end *= scale;
        vec2 line = end - start;
        float frac = dot(uv - start,line) / dot(line,line);
        return distance(start + line * clamp(frac, 0.0, 1.0), uv);
      }

      float dfCircle(vec2 origin, float radius, vec2 uv) {
        origin *= scale;
        radius *= scale;
        return abs(length(uv - origin) - radius);
      }

      float dfArc(vec2 origin, float start, float sweep, float radius, vec2 uv) {
        origin *= scale;
        radius *= scale;
        uv -= origin;
        uv *= mat2(cos(start), sin(start),-sin(start), cos(start));
        float offs = (sweep / 2.0 - pi);
        float ang = mod(atan(uv.y, uv.x) - offs, tau) + offs;
        ang = clamp(ang, min(0.0, sweep), max(0.0, sweep));
        return distance(radius * vec2(cos(ang), sin(ang)), uv);
      }

      float dfDigit(vec2 origin, float d, vec2 uv) {
        uv -= origin;
        d = floor(d);
        float dist = 1e6;
        
        if(d == 0.0) {
          dist = min(dist, dfLine(vec2(1.000,1.000), vec2(1.000,0.500), uv));
          dist = min(dist, dfLine(vec2(0.000,1.000), vec2(0.000,0.500), uv));
          dist = min(dist, dfArc(vec2(0.500,1.000),0.000, 3.142, 0.500, uv));
          dist = min(dist, dfArc(vec2(0.500,0.500),3.142, 3.142, 0.500, uv));
        }
        else if(d == 1.0) {
          dist = min(dist, dfLine(vec2(0.500,1.500), vec2(0.500,0.000), uv));
        }
        else if(d == 2.0) {
          dist = min(dist, dfLine(vec2(1.000,0.000), vec2(0.000,0.000), uv));
          dist = min(dist, dfLine(vec2(0.388,0.561), vec2(0.806,0.719), uv));
          dist = min(dist, dfArc(vec2(0.500,1.000),0.000, 3.142, 0.500, uv));
          dist = min(dist, dfArc(vec2(0.700,1.000),5.074, 1.209, 0.300, uv));
          dist = min(dist, dfArc(vec2(0.600,0.000),1.932, 1.209, 0.600, uv));
        }
        else if(d == 3.0) {
          dist = min(dist, dfLine(vec2(0.000,1.500), vec2(1.000,1.500), uv));
          dist = min(dist, dfLine(vec2(1.000,1.500), vec2(0.500,1.000), uv));
          dist = min(dist, dfArc(vec2(0.500,0.500),3.142, 4.712, 0.500, uv));
        }
        else if(d == 4.0) {
          dist = min(dist, dfLine(vec2(0.700,1.500), vec2(0.000,0.500), uv));
          dist = min(dist, dfLine(vec2(0.000,0.500), vec2(1.000,0.500), uv));
          dist = min(dist, dfLine(vec2(0.700,1.200), vec2(0.700,0.000), uv));
        }
        else if(d == 5.0) {
          dist = min(dist, dfLine(vec2(1.000,1.500), vec2(0.300,1.500), uv));
          dist = min(dist, dfLine(vec2(0.300,1.500), vec2(0.200,0.900), uv));
          dist = min(dist, dfArc(vec2(0.500,0.500),3.142, 5.356, 0.500, uv));
        }
        else if(d == 6.0) {
          dist = min(dist, dfLine(vec2(0.067,0.750), vec2(0.500,1.500), uv));
          dist = min(dist, dfCircle(vec2(0.500,0.500), 0.500, uv));
        }
        else if(d == 7.0) {
          dist = min(dist, dfLine(vec2(0.000,1.500), vec2(1.000,1.500), uv));
          dist = min(dist, dfLine(vec2(1.000,1.500), vec2(0.500,0.000), uv));
        }
        else if(d == 8.0) {
          dist = min(dist, dfCircle(vec2(0.500,0.400), 0.400, uv));
          dist = min(dist, dfCircle(vec2(0.500,1.150), 0.350, uv));
        }
        else if(d == 9.0) {
          dist = min(dist, dfLine(vec2(0.933,0.750), vec2(0.500,0.000), uv));
          dist = min(dist, dfCircle(vec2(0.500,1.000), 0.500, uv));
        }
        return dist;
      }

      float dfNumberInt(vec2 origin, int inum, vec2 uv) {
        float num = float(inum);
        uv -= origin;
        float dist = 1e6;
        float offs = 0.0;
        
        for(float i = 1.0; i >= 0.0; i--) {
          float d = mod(num / pow(10.0,i), 10.0);
          vec2 pos = digitSpacing * vec2(offs,0.0);
          dist = min(dist, dfDigit(pos, d, uv));
          offs++;
        }
        return dist;
      }

      float dfColon(vec2 origin, vec2 uv) {
        uv -= origin;
        float dist = 1e6;
        float offs = 0.0;
        dist = min(dist, dfCircle(vec2(offs+0.9,0.9)*1.1, 0.04, uv));
        dist = min(dist, dfCircle(vec2(offs+0.9,0.4)*1.1, 0.04, uv));
        return dist;
      }

      void main() {
        vec2 aspect = iResolution.xy / iResolution.y;
        vec2 uv = (vUv * iResolution.xy / iResolution.y - aspect/2.0);
        
        int hour = int(iDate.w/3600.0);
        #if TWELVE_HOUR_CLOCK
        if(hour > 12) hour -= 12;
        if(hour == 0) hour = 12;
        #endif
        int minute = int(mod(iDate.w/60.0, 60.0));
        
        // Center the clock
        vec2 basepos = -digitSpacing * vec2(2.5, 0.75);
        vec2 pos = basepos;
        
        pos.x = basepos.x + 0.0;
        float dist = 1e6;
        dist = min(dist, dfNumberInt(pos, hour, uv));
        
        pos.x = basepos.x + 0.24;
        dist = min(dist, dfColon(pos, uv));
        
        pos.x = basepos.x + 0.44;
        dist = min(dist, dfNumberInt(pos, minute, uv));
        
        vec3 color = vec3(0);
        float shade = 0.006 / dist;
        
        // Aurora colors: cyan, green, purple, pink
        float timeOffset = iTime * 0.3;
        vec3 aurora1 = vec3(0.0, 1.0, 0.8); // cyan
        vec3 aurora2 = vec3(0.2, 1.0, 0.3); // green
        vec3 aurora3 = vec3(0.8, 0.2, 1.0); // purple
        vec3 aurora4 = vec3(1.0, 0.4, 0.8); // pink
        
        float cycle = sin(timeOffset) * 0.5 + 0.5;
        float cycle2 = sin(timeOffset + 2.0) * 0.5 + 0.5;
        
        vec3 auroraColor = mix(
          mix(aurora1, aurora2, cycle),
          mix(aurora3, aurora4, cycle2),
          sin(timeOffset * 0.7) * 0.5 + 0.5
        );
        
        color += auroraColor * shade;
        
        #if GLOWPULSE
        float pulseNoise = noise((uv + vec2(iTime*0.5)) * 2.5 + 0.5);
        color += auroraColor * shade * pulseNoise * 0.8;
        #endif
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        iResolution: { value: new THREE.Vector2() },
        iTime: { value: 0 },
        iDate: { value: new THREE.Vector4() }
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width, height);
    };

    const animate = () => {
      const now = new Date();
      const secondsInDay = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
      
      material.uniforms.iTime.value = performance.now() * 0.001;
      material.uniforms.iDate.value.w = secondsInDay;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AuroraClock;
