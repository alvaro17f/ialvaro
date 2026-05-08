"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import skillsData from "src/data/skills.json";

type Skill = (typeof skillsData)[number];

const SPIRAL_ARMS = 3;
const BASE_RADIUS = 1.3;
const RADIUS_STEP = 0.55;

function getSpiralPosition(
	armIndex: number,
	stepIndex: number,
): [number, number, number] {
	const armOffset = (armIndex / SPIRAL_ARMS) * Math.PI * 2;
	const theta = armOffset + stepIndex * 0.85;
	const r = BASE_RADIUS + stepIndex * RADIUS_STEP;
	const y = (stepIndex - 1.5) * 0.5;

	return [r * Math.cos(theta), y, r * Math.sin(theta)];
}

function SkillCard({
	skill,
	position,
}: {
	skill: Skill;
	position: [number, number, number];
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [hovered, setHovered] = useState(false);
	const texture = useTexture(skill.image);

	return (
		<Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
			<mesh
				ref={meshRef}
				position={position}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				scale={hovered ? 1.25 : 1}
			>
				<planeGeometry args={[0.55, 0.55]} />
				<meshStandardMaterial
					map={texture}
					transparent
					roughness={0.4}
					metalness={0.1}
				/>
			</mesh>

			{/* Glow behind card on hover */}
			{hovered && (
				<mesh position={[position[0], position[1], position[2] - 0.05]}>
					<planeGeometry args={[0.65, 0.65]} />
					<meshBasicMaterial
						color="#3b82f6"
						transparent
						opacity={0.12}
					/>
				</mesh>
			)}

			{/* Label */}
			<Html
				position={[
					position[0],
					position[1] - 0.45,
					position[2],
				]}
				center
				distanceFactor={8}
				style={{ pointerEvents: "none" }}
			>
				<span
					className={`text-[9px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
						hovered
							? "text-alvaro-white"
							: "text-alvaro-muted/50"
					}`}
				>
					{skill.title}
				</span>
			</Html>
		</Float>
	);
}

function Starfield() {
	const positions = useMemo(() => {
		const pts = new Float32Array(300 * 3);
		for (let i = 0; i < 300; i++) {
			pts[i * 3] = (Math.random() - 0.5) * 14;
			pts[i * 3 + 1] = (Math.random() - 0.5) * 10;
			pts[i * 3 + 2] = (Math.random() - 0.5) * 14;
		}
		return pts;
	}, []);

	return (
		<points>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={300}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.015}
				color="#3b82f6"
				transparent
				opacity={0.4}
				sizeAttenuation
			/>
		</points>
	);
}

function Scene() {
	const groupRef = useRef<THREE.Group>(null);

	useFrame((_, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.y += delta * 0.05;
		}
	});

	const cards = useMemo(() => {
		const result: {
			skill: Skill;
			position: [number, number, number];
		}[] = [];

		let idx = 0;
		for (let step = 0; step < 4; step++) {
			for (let arm = 0; arm < SPIRAL_ARMS; arm++) {
				if (idx < skillsData.length) {
					result.push({
						skill: skillsData[idx],
						position: getSpiralPosition(arm, step),
					});
					idx++;
				}
			}
		}

		return result;
	}, []);

	return (
		<group ref={groupRef}>
			{/* Starfield background */}
			<Starfield />

			{/* Central core */}
			<Float speed={1.8} rotationIntensity={0} floatIntensity={0.2}>
				<mesh>
					<sphereGeometry args={[0.55, 64, 64]} />
					<meshStandardMaterial
						color="#3b82f6"
						emissive="#3b82f6"
						emissiveIntensity={0.5}
						roughness={0.05}
						metalness={0.5}
					/>
				</mesh>
				<mesh>
					<sphereGeometry args={[0.7, 32, 32]} />
					<meshBasicMaterial
						color="#3b82f6"
						transparent
						opacity={0.06}
					/>
				</mesh>
				<mesh>
					<sphereGeometry args={[0.85, 32, 32]} />
					<meshBasicMaterial
						color="#3b82f6"
						transparent
						opacity={0.03}
					/>
				</mesh>
			</Float>

			{/* Skill cards */}
			{cards.map(({ skill, position }) => (
				<SkillCard
					key={skill.id}
					skill={skill}
					position={position}
				/>
			))}

			{/* Orbital ring */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[2.5, 0.006, 8, 160]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.04}
				/>
			</mesh>
		</group>
	);
}

export const TechSphere = () => {
	return (
		<div className="w-full h-[500px] md:h-[550px] overflow-visible">
			<Canvas
				camera={{ position: [0, 1.5, 8], fov: 48 }}
				gl={{ antialias: true, alpha: true }}
				style={{ overflow: "visible" }}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={0.7} />
					<pointLight position={[6, 6, 6]} intensity={1.5} />
					<pointLight
						position={[-4, -4, -4]}
						intensity={0.4}
						color="#3b82f6"
					/>
					<Scene />
					<OrbitControls
						enableZoom={false}
						enablePan={false}
						autoRotate
						autoRotateSpeed={0.25}
						maxPolarAngle={Math.PI / 1.6}
						minPolarAngle={Math.PI / 2.5}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
};
