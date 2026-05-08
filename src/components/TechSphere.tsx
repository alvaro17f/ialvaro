"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";

const techStack = [
	{ name: "React", color: "#61dafb" },
	{ name: "TypeScript", color: "#3178c6" },
	{ name: "Node.js", color: "#5fa04e" },
	{ name: "Astro", color: "#ff5a03" },
	{ name: "Tailwind", color: "#06b6d4" },
	{ name: "PostgreSQL", color: "#336791" },
	{ name: "Docker", color: "#2496ed" },
	{ name: "AWS", color: "#ff9900" },
];

const SPHERE_RADIUS = 2.4;
const RING_RADIUS = 2.7;

function fibonacciSphere(index: number, total: number, radius: number) {
	const phi = Math.acos(-1 + (2 * index) / total);
	const theta = Math.sqrt(total * Math.PI) * phi;
	return [
		radius * Math.sin(phi) * Math.cos(theta),
		radius * Math.sin(phi) * Math.sin(theta),
		radius * Math.cos(phi),
	] as const;
}

function TechOrb({
	position,
	color,
	name,
}: {
	position: readonly [number, number, number];
	color: string;
	name: string;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [hovered, setHovered] = useState(false);

	return (
		<Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
			<mesh
				ref={meshRef}
				position={position}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				scale={hovered ? 1.5 : 1}
			>
				<sphereGeometry args={[0.24, 32, 32]} />
				<meshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={hovered ? 0.7 : 0.15}
					roughness={0.15}
				/>
			</mesh>

			{/* Label — always visible, fades on distance */}
			<Html
				position={[position[0] * 1.3, position[1] * 1.3, position[2] * 1.3]}
				center
				distanceFactor={6}
				style={{ pointerEvents: "none" }}
			>
				<span
					className={`text-[10px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
						hovered
							? "text-alvaro-white scale-110"
							: "text-alvaro-muted/60"
					}`}
				>
					{name}
				</span>
			</Html>

			{/* Connecting line on hover */}
			{hovered && (
				<line>
					<bufferGeometry>
						<bufferAttribute
							attach="attributes-position"
							count={2}
							array={
								new Float32Array([
									0, 0, 0, position[0], position[1],
									position[2],
								])
							}
							itemSize={3}
						/>
					</bufferGeometry>
					<lineBasicMaterial
						color={color}
						transparent
						opacity={0.25}
					/>
				</line>
			)}
		</Float>
	);
}

function Scene() {
	const groupRef = useRef<THREE.Group>(null);

	useFrame((_, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.y += delta * 0.06;
		}
	});

	const positions = useMemo(() => {
		return techStack.map((_, i) =>
			fibonacciSphere(i + 1, techStack.length + 2, SPHERE_RADIUS),
		);
	}, []);

	return (
		<group ref={groupRef}>
			{/* Central core */}
			<Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
				<mesh>
					<sphereGeometry args={[0.7, 64, 64]} />
					<meshStandardMaterial
						color="#3b82f6"
						emissive="#3b82f6"
						emissiveIntensity={0.45}
						roughness={0.08}
						metalness={0.4}
					/>
				</mesh>
				<mesh>
					<sphereGeometry args={[0.85, 32, 32]} />
					<meshBasicMaterial
						color="#3b82f6"
						transparent
						opacity={0.06}
					/>
				</mesh>
			</Float>

			{/* Tech orbs */}
			{techStack.map((tech, i) => (
				<TechOrb
					key={tech.name}
					position={positions[i]}
					color={tech.color}
					name={tech.name}
				/>
			))}

			{/* Orbital ring */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[RING_RADIUS, 0.008, 16, 120]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.06}
				/>
			</mesh>
		</group>
	);
}

export const TechSphere = () => {
	return (
		<div className="w-full h-[500px] md:h-[550px] overflow-visible">
			<Canvas
				camera={{ position: [0, 0, 8.5], fov: 48 }}
				gl={{ antialias: true, alpha: true }}
				style={{ overflow: "visible" }}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={0.5} />
					<pointLight position={[8, 8, 8]} intensity={1.5} />
					<pointLight
						position={[-5, -5, -5]}
						intensity={0.4}
						color="#3b82f6"
					/>
					<Scene />
					<OrbitControls
						enableZoom={false}
						enablePan={false}
						autoRotate
						autoRotateSpeed={0.3}
						maxPolarAngle={Math.PI / 1.7}
						minPolarAngle={Math.PI / 2.2}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
};
