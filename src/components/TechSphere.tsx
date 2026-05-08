"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
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
	index,
}: {
	position: readonly [number, number, number];
	color: string;
	index: number;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [hovered, setHovered] = useState(false);

	return (
		<Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
			<mesh
				ref={meshRef}
				position={position}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				scale={hovered ? 1.4 : 1}
			>
				<sphereGeometry args={[0.28, 32, 32]} />
				<meshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={hovered ? 0.6 : 0.15}
					roughness={0.2}
				/>
			</mesh>
			{/* Connecting line to center */}
			{hovered && (
				<line>
					<bufferGeometry>
						<bufferAttribute
							attach="attributes-position"
							count={2}
							array={new Float32Array([
								0, 0, 0,
								position[0], position[1], position[2],
							])}
							itemSize={3}
						/>
					</bufferGeometry>
					<lineBasicMaterial
						color={color}
						transparent
						opacity={0.3}
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
			groupRef.current.rotation.y += delta * 0.08;
		}
	});

	const positions = useMemo(() => {
		return techStack.map((_, i) => fibonacciSphere(i + 1, techStack.length + 2, 3.2));
	}, []);

	return (
		<group ref={groupRef}>
			{/* Central core */}
			<Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
				<mesh>
					<sphereGeometry args={[0.9, 64, 64]} />
					<meshStandardMaterial
						color="#3b82f6"
						emissive="#3b82f6"
						emissiveIntensity={0.4}
						roughness={0.1}
						metalness={0.3}
					/>
				</mesh>
				{/* Outer glow ring */}
				<mesh>
					<sphereGeometry args={[1.05, 32, 32]} />
					<meshBasicMaterial
						color="#3b82f6"
						transparent
						opacity={0.08}
					/>
				</mesh>
			</Float>

			{/* Tech orbs */}
			{techStack.map((tech, i) => (
				<TechOrb
					key={tech.name}
					position={positions[i]}
					color={tech.color}
					index={i}
				/>
			))}

			{/* Orbital ring */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[3.8, 0.01, 16, 100]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.08}
				/>
			</mesh>
		</group>
	);
}

export const TechSphere = () => {
	return (
		<div className="w-full h-[500px] md:h-[550px]">
			<Canvas
				camera={{ position: [0, 0, 8], fov: 45 }}
				gl={{ antialias: true, alpha: true }}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={0.4} />
					<pointLight position={[10, 10, 10]} intensity={1.5} />
					<pointLight
						position={[-5, -5, -5]}
						intensity={0.5}
						color="#3b82f6"
					/>
					<Scene />
					<OrbitControls
						enableZoom={false}
						enablePan={false}
						autoRotate
						autoRotateSpeed={0.3}
						maxPolarAngle={Math.PI / 1.8}
						minPolarAngle={Math.PI / 2.5}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
};
