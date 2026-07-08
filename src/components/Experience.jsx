import { Float, Html, OrbitControls, Stars, Environment, ContactShadows, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { projects } from '../data/projects.js'

function LaptopDesk() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.055
    group.current.position.y = -0.05 + Math.sin(state.clock.elapsedTime * 0.85) * 0.035
  })

  return (
    <group ref={group} position={[0.35, -1.05, 0]} rotation={[0, -0.35, 0]}>
      {/* desk top */}
      <mesh receiveShadow castShadow position={[0, -0.08, 0]}>
        <boxGeometry args={[5.9, 0.22, 3.05]} />
        <meshStandardMaterial color="#181d2c" roughness={0.58} metalness={0.18} />
      </mesh>

      {/* glowing desk edge */}
      <mesh position={[0, 0.045, 1.55]}>
        <boxGeometry args={[5.8, 0.035, 0.035]} />
        <meshBasicMaterial color="#00e0a4" transparent opacity={0.58} />
      </mesh>
      <mesh position={[-2.95, 0.045, 0]}>
        <boxGeometry args={[0.035, 0.035, 2.95]} />
        <meshBasicMaterial color="#ffb000" transparent opacity={0.42} />
      </mesh>

      {/* laptop base */}
      <mesh castShadow receiveShadow position={[0, 0.18, 0.42]} rotation={[0.04, 0, 0]}>
        <boxGeometry args={[2.55, 0.09, 1.55]} />
        <meshStandardMaterial color="#d7d3c5" roughness={0.42} metalness={0.28} />
      </mesh>
      <mesh position={[0, 0.235, 0.06]}>
        <boxGeometry args={[0.72, 0.012, 0.42]} />
        <meshStandardMaterial color="#777f92" roughness={0.5} metalness={0.35} />
      </mesh>

      {/* laptop screen */}
      <group position={[0, 0.92, -0.42]} rotation={[-0.22, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.65, 1.55, 0.08]} />
          <meshStandardMaterial color="#060914" roughness={0.38} metalness={0.24} emissive="#07131f" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[2.35, 1.22]} />
          <meshBasicMaterial color="#050712" transparent opacity={0.98} />
        </mesh>
        <Html transform distanceFactor={1.52} position={[0, -0.01, 0.09]} rotation={[0, 0, 0]} center>
          <div className="laptop-code">
            <div className="code-top"><span></span><span></span><span></span><b>karim.dev</b></div>
            <p><i>const</i> developer = <strong>"Karim Ehab"</strong>;</p>
            <p><i>build</i>(React, Next.js, TypeScript);</p>
            <p><i>deploy</i>.to(<strong>"Vercel"</strong>);</p>
            <p className="code-glow">portfolio.status = "ready";</p>
          </div>
        </Html>
      </group>

      {/* coffee + small objects */}
      <mesh castShadow position={[-1.85, 0.35, 0.18]}>
        <cylinderGeometry args={[0.22, 0.2, 0.34, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.36} metalness={0.08} />
      </mesh>
      <mesh position={[-1.85, 0.54, 0.18]}>
        <cylinderGeometry args={[0.18, 0.18, 0.018, 32]} />
        <meshBasicMaterial color="#3b2416" />
      </mesh>
      <mesh castShadow position={[1.95, 0.27, 0.22]} rotation={[0.25, -0.7, 0]}>
        <boxGeometry args={[0.62, 0.055, 0.96]} />
        <meshStandardMaterial color="#121827" roughness={0.45} metalness={0.22} emissive="#00e0a4" emissiveIntensity={0.04} />
      </mesh>

      {/* subtle keyboard bars */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-0.86 + i * 0.215, 0.255, 0.58]}>
          <boxGeometry args={[0.14, 0.014, 0.055]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#00e0a4' : '#ffffff'} transparent opacity={i % 3 === 0 ? 0.72 : 0.32} />
        </mesh>
      ))}
    </group>
  )
}

function ProjectScreen({ project, index }) {
  const ref = useRef()
  const texture = useTexture(project.image)
  const positions = useMemo(() => [
    [-2.85, 1.25, -0.55],
    [2.75, 1.38, -0.65],
    [0.05, 2.45, -0.95],
  ], [])
  const rotations = useMemo(() => [
    [0.02, 0.44, -0.06],
    [0.02, -0.48, 0.055],
    [-0.02, 0, 0],
  ], [])
  const screenStyle = Object.assign({}, { '--planet': project.color })

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = positions[index][1] + Math.sin(state.clock.elapsedTime * 1.05 + index * 1.4) * 0.09
    ref.current.rotation.z = rotations[index][2] + Math.sin(state.clock.elapsedTime * 0.55 + index) * 0.018
  })

  return (
    <Float speed={1.1 + index * 0.18} floatIntensity={0.2} rotationIntensity={0.05}>
      <group ref={ref} position={positions[index]} rotation={rotations[index]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.86, 1.13, 0.055]} />
          <meshStandardMaterial color="#111827" roughness={0.34} metalness={0.24} emissive={project.color} emissiveIntensity={0.08} />
        </mesh>
        <mesh position={[0, 0.04, 0.038]}>
          <planeGeometry args={[1.68, 0.82]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.55, 0.04]}>
          <boxGeometry args={[1.86, 0.18, 0.02]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.82} />
        </mesh>
        <Html transform distanceFactor={1.5} position={[0, -0.58, 0.065]} center>
          <a className="screen-label" style={screenStyle} href="#projects">
            <b>{project.title}</b>
            <span>{project.type}</span>
          </a>
        </Html>
      </group>
    </Float>
  )
}

function DeskLights() {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.12
  })
  return (
    <group ref={group} position={[0, 0.48, 0]}>
      {[2.1, 2.7, 3.25].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + i * 0.025, 0, i * 0.45]}>
          <torusGeometry args={[r, 0.005, 8, 160]} />
          <meshBasicMaterial color={i === 1 ? '#ffb000' : '#00e0a4'} transparent opacity={0.18} />
        </mesh>
      ))}
    </group>
  )
}

function Particles() {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(620 * 3)
    for (let i = 0; i < 620; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15
      arr[i * 3 + 1] = Math.random() * 7 - 2.2
      arr[i * 3 + 2] = (Math.random() - 0.5) * 13
    }
    return arr
  }, [])
  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.012
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.018} transparent opacity={0.58} />
    </points>
  )
}

export function Experience() {
  return (
    <>
      <color attach="background" args={["#050712"]} />
      <fog attach="fog" args={["#050712", 7, 17]} />
      <ambientLight intensity={0.72} />
      <directionalLight castShadow position={[4, 6, 5]} intensity={1.7} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3.7, 3.2, -2.4]} intensity={2.9} color="#ffb000" />
      <pointLight position={[4.3, 2.8, 1.4]} intensity={2.7} color="#00e0a4" />
      <Stars radius={60} depth={28} count={2400} factor={4} saturation={0} fade speed={0.45} />
      <Particles />
      <DeskLights />
      <LaptopDesk />
      {projects.map((project, index) => <ProjectScreen key={project.id} project={project} index={index} />)}
      <ContactShadows position={[0, -1.28, 0]} opacity={0.34} scale={8} blur={2.5} far={4} />
      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} minPolarAngle={Math.PI / 3.35} maxPolarAngle={Math.PI / 2.05} />
    </>
  )
}
