'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type ProgressRef = React.MutableRefObject<number>;

const PAPER = '#e9e5dc';
const INK = '#171916';
const ACCENT = '#f1663b';
const MUTED = '#728075';
const RAIL_LENGTH = 54;

const STATIONS = [
  { x: 0, y: 0, z: 2 },
  { x: 1.5, y: 0.2, z: -5 },
  { x: -1.7, y: -0.1, z: -12 },
  { x: 1.6, y: 0.15, z: -19 },
  { x: -1.4, y: -0.15, z: -26 },
  { x: 1.5, y: 0.1, z: -33 },
  { x: -1.5, y: -0.1, z: -40 },
  { x: 1.3, y: 0.1, z: -47 },
  { x: 0, y: 0, z: -52 },
];

function StationFrame({
  position,
  accent = false,
}: {
  position: [number, number, number];
  accent?: boolean;
}) {
  return (
    <group position={position}>
      <mesh>
        <torusGeometry args={[2.15, 0.018, 6, 72]} />
        <meshBasicMaterial color={accent ? ACCENT : MUTED} transparent opacity={accent ? 0.55 : 0.24} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.82, 0.008, 5, 72]} />
        <meshBasicMaterial color={PAPER} transparent opacity={0.1} />
      </mesh>
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0]}
          >
            <circleGeometry args={[index % 3 === 0 ? 0.045 : 0.025, 12]} />
            <meshBasicMaterial color={index % 3 === 0 ? ACCENT : PAPER} transparent opacity={0.62} />
          </mesh>
        );
      })}
    </group>
  );
}

function DataRail() {
  const packets = useRef<THREE.Group>(null);
  const curve = useMemo(() => {
    const points = STATIONS.map(({ x, y, z }) => new THREE.Vector3(x * 0.18, y * 0.2, z));
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.16);
  }, []);
  const railPoints = useMemo(() => curve.getPoints(240), [curve]);

  useFrame(({ clock }) => {
    if (!packets.current) return;
    packets.current.children.forEach((packet, index) => {
      const offset = (clock.elapsedTime * 0.035 + index / packets.current!.children.length) % 1;
      packet.position.copy(curve.getPointAt(offset));
    });
  });

  return (
    <>
      <Line points={railPoints} color={ACCENT} lineWidth={1.25} transparent opacity={0.86} />
      <Line
        points={railPoints.map((point) => point.clone().add(new THREE.Vector3(0.16, -0.12, 0)))}
        color={MUTED}
        lineWidth={0.45}
        transparent
        opacity={0.28}
      />
      <group ref={packets}>
        {Array.from({ length: 9 }, (_, index) => (
          <mesh key={index}>
            <sphereGeometry args={[index % 3 === 0 ? 0.065 : 0.04, 12, 12]} />
            <meshBasicMaterial color={index % 3 === 0 ? PAPER : ACCENT} />
          </mesh>
        ))}
      </group>
    </>
  );
}

function Corridor() {
  return (
    <group>
      {STATIONS.slice(1, -1).map((station, index) => (
        <StationFrame
          key={station.z}
          position={[station.x * 0.08, station.y * 0.08, station.z]}
          accent={index === 1 || index === 4}
        />
      ))}
      {Array.from({ length: 18 }, (_, index) => {
        const z = 3 - index * 3.1;
        return (
          <group key={z}>
            <Line points={[[-3.2, -2.2, z], [3.2, -2.2, z]]} color={MUTED} lineWidth={0.3} transparent opacity={0.12} />
            <Line points={[[-3.2, 2.2, z], [3.2, 2.2, z]]} color={MUTED} lineWidth={0.3} transparent opacity={0.08} />
          </group>
        );
      })}
      {[-3.2, 3.2].map((x) => (
        <Line key={x} points={[[x, -2.2, 4], [x, -2.2, -54]]} color={MUTED} lineWidth={0.4} transparent opacity={0.16} />
      ))}
    </group>
  );
}

function SignalStation() {
  const waveform = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => {
        const x = (index / 89 - 0.5) * 4.7;
        const y = Math.sin(index * 0.44) * 0.36 + Math.sin(index * 0.13) * 0.16;
        return new THREE.Vector3(x, y, 0);
      }),
    [],
  );

  return (
    <group position={[1.35, 0, -5]}>
      <Line points={waveform} color={PAPER} lineWidth={0.85} transparent opacity={0.72} />
      {Array.from({ length: 13 }, (_, index) => {
        const height = 0.18 + Math.abs(Math.sin(index * 1.7)) * 0.9;
        return (
          <mesh key={index} position={[-2.2 + index * 0.36, -1.25 + height / 2, 0]}>
            <planeGeometry args={[0.055, height]} />
            <meshBasicMaterial color={index === 8 ? ACCENT : MUTED} transparent opacity={0.55} />
          </mesh>
        );
      })}
    </group>
  );
}

function VisionStation() {
  return (
    <group position={[-1.55, -0.1, -12]}>
      {[-1.25, 1.25].map((x) => (
        <group key={x} position={[x, 1.25, 0.5]} rotation={[0.1, x > 0 ? -0.28 : 0.28, 0]}>
          <mesh>
            <boxGeometry args={[0.38, 0.28, 0.48]} />
            <meshBasicMaterial color={PAPER} />
          </mesh>
          <Line points={[[0, 0, 0], [-x * 0.7, -1.15, -0.9], [-x * 0.2, -1.15, -0.9]]} color={MUTED} lineWidth={0.55} transparent opacity={0.52} />
        </group>
      ))}
      <group position={[0, -0.45, 0]}>
        <mesh>
          <boxGeometry args={[2.55, 0.72, 1.08]} />
          <meshBasicMaterial color="#d8d3c9" transparent opacity={0.9} />
        </mesh>
        <mesh position={[-0.9, 0.38, 0]}>
          <boxGeometry args={[0.72, 0.78, 1]} />
          <meshBasicMaterial color={MUTED} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(3.05, 1.48, 1.45)]} />
          <lineBasicMaterial color={ACCENT} />
        </lineSegments>
      </group>
    </group>
  );
}

function RetrievalStation() {
  return (
    <group position={[1.45, 0, -19]}>
      {Array.from({ length: 9 }, (_, index) => {
        const angle = (index / 9) * Math.PI * 2;
        const x = Math.cos(angle) * 1.65;
        const y = Math.sin(angle) * 1.18;
        return (
          <group key={index}>
            <mesh position={[x, y, 0]}>
              <planeGeometry args={[0.58, 0.76]} />
              <meshBasicMaterial color={PAPER} transparent opacity={0.72} side={THREE.DoubleSide} />
            </mesh>
            <Line points={[[x, y, 0], [0, 0, 0.22]]} color={index % 3 === 0 ? ACCENT : MUTED} lineWidth={0.5} transparent opacity={0.42} />
          </group>
        );
      })}
      <mesh position={[0, 0, 0.24]}>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe />
      </mesh>
    </group>
  );
}

function PredictionStation() {
  return (
    <group position={[-1.3, 0, -26]}>
      {Array.from({ length: 18 }, (_, index) => {
        const x = -2.2 + index * 0.26;
        const height = 0.25 + Math.abs(Math.sin(index * 0.72) + Math.cos(index * 0.31)) * 0.7;
        return (
          <mesh key={index} position={[x, -1.1 + height / 2, 0]}>
            <boxGeometry args={[0.08, height, 0.08]} />
            <meshBasicMaterial color={index > 12 ? ACCENT : MUTED} transparent opacity={0.62} />
          </mesh>
        );
      })}
      <Line
        points={Array.from({ length: 34 }, (_, index) => [
          -2.25 + index * 0.135,
          Math.sin(index * 0.58) * 0.5 + Math.sin(index * 0.17) * 0.22 + 0.45,
          0.12,
        ])}
        color={PAPER}
        lineWidth={0.8}
        transparent
        opacity={0.72}
      />
    </group>
  );
}

function ProductStation({
  position,
  variant,
}: {
  position: [number, number, number];
  variant: 'map' | 'agents' | 'mobile';
}) {
  const isMobile = variant === 'mobile';

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[isMobile ? 1.4 : 3.2, isMobile ? 2.45 : 1.95, 0.12]} />
        <meshBasicMaterial color={PAPER} transparent opacity={0.84} />
      </mesh>
      {variant === 'map' && (
        <>
          <Line points={[[-1.2, 0.45, 0.08], [-0.45, 0.82, 0.08], [0.15, 0.15, 0.08], [1.18, 0.62, 0.08]]} color={ACCENT} lineWidth={1} />
          {[-1.2, -0.45, 0.15, 1.18].map((x, index) => (
            <mesh key={x} position={[x, [0.45, 0.82, 0.15, 0.62][index], 0.09]}>
              <circleGeometry args={[0.075, 14]} />
              <meshBasicMaterial color={index === 2 ? ACCENT : INK} />
            </mesh>
          ))}
        </>
      )}
      {variant === 'agents' && (
        <>
          {[-0.85, 0, 0.85].map((x, index) => (
            <mesh key={x} position={[x, index === 1 ? 0.45 : -0.25, 0.09]}>
              <circleGeometry args={[0.16, 18]} />
              <meshBasicMaterial color={index === 1 ? ACCENT : MUTED} />
            </mesh>
          ))}
          <Line points={[[-0.85, -0.25, 0.1], [0, 0.45, 0.1], [0.85, -0.25, 0.1]]} color={INK} lineWidth={0.8} />
        </>
      )}
      {variant === 'mobile' && (
        <>
          <mesh position={[0, 0.45, 0.08]}>
            <circleGeometry args={[0.36, 24]} />
            <meshBasicMaterial color={ACCENT} />
          </mesh>
          {[-0.45, -0.72].map((y, index) => (
            <mesh key={y} position={[0, y, 0.08]}>
              <planeGeometry args={[0.86 - index * 0.15, 0.05]} />
              <meshBasicMaterial color={INK} transparent opacity={0.48} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function World({ progress }: { progress: ProgressRef }) {
  useFrame(({ camera }, delta) => {
    const p = progress.current;
    const z = 6 - p * RAIL_LENGTH;
    const x = Math.sin(p * Math.PI * 7) * 0.42;
    const y = Math.sin(p * Math.PI * 4) * 0.14;

    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 3.1, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x, 3.1, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y, 3.1, delta);
    camera.lookAt(x * 0.12, y * 0.12, z - 4);
  });

  return (
    <>
      <fog attach="fog" args={['#101310', 8, 17]} />
      <Corridor />
      <DataRail />
      <SignalStation />
      <VisionStation />
      <RetrievalStation />
      <PredictionStation />
      <ProductStation position={[1.35, 0, -33]} variant="map" />
      <ProductStation position={[-1.35, 0, -40]} variant="agents" />
      <ProductStation position={[1.2, 0, -47]} variant="mobile" />
    </>
  );
}

export default function ImmersiveScene({ progress }: { progress: ProgressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 48, near: 0.1, far: 75 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#101310']} />
      <World progress={progress} />
    </Canvas>
  );
}
