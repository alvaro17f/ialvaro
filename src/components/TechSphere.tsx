"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import skillsData from "src/data/skills.json";

type Skill = (typeof skillsData)[number];

const SPIRAL_ARMS = 3;
const BASE_RADIUS = 1.35;
const RADIUS_STEP = 0.55;

const skillColors: Record<string, string> = {
	"react.js": "#61dafb",
	"vue.js": "#42b883",
	typescript: "#3178c6",
	javascript: "#f0db4f",
	tailwind: "#06b6d4",
	"next.js": "#f5f5f5",
	rust: "#dea584",
	go: "#00add8",
	jest: "#c21325",
	"node.js": "#5fa04e",
	docker: "#2496ed",
	sql: "#e38c00",
};

function getColor(title: string): string {
	return skillColors[title] ?? "#3b82f6";
}

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

function TechOrb({
	skill,
	position,
}: {
	skill: Skill;
	position: [number, number, number];
}) {
	const [hovered, setHovered] = useState(false);
	const color = getColor(skill.title);

	return (
		<Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.4}>
			<group
				position={position}
				scale={hovered ? 1.5 : 1}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
			>
				{/* Faceted sphere */}
				<mesh>
					<icosahedronGeometry args={[0.18, 1]} />
					<meshStandardMaterial
						color={color}
						emissive={color}
						emissiveIntensity={hovered ? 0.8 : 0.2}
						roughness={0.15}
						metalness={0.3}
						side={THREE.DoubleSide}
					/>
				</mesh>

				{/* Wireframe overlay */}
				<mesh>
					<icosahedronGeometry args={[0.2, 1]} />
					<meshBasicMaterial
						color={color}
						wireframe
						transparent
						opacity={hovered ? 0.6 : 0.2}
						side={THREE.DoubleSide}
					/>
				</mesh>

				{/* Connecting line to center */}
				{hovered && (
					<mesh>
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
								opacity={0.3}
							/>
						</line>
					</mesh>
				)}

				{/* Label */}
				<Html
					position={[0, -0.4, 0]}
					center
					distanceFactor={7}
					style={{ pointerEvents: "none" }}
				>
					<span
						className={`text-[9px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
							hovered
								? "text-white scale-125"
								: "text-alvaro-muted/40"
						}`}
					>
						{skill.title}
					</span>
				</Html>
			</group>
		</Float>
	);
}

function Starfield() {
	const positions = useMemo(() => {
		const pts = new Float32Array(400 * 3);
		for (let i = 0; i < 400; i++) {
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
					count={400}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.012}
				color="#3b82f6"
				transparent
				opacity={0.35}
				sizeAttenuation
			/>
		</points>
	);
}

function CentralCore() {
	const coreRef = useRef<THREE.Mesh>(null);
	const wireRef = useRef<THREE.Mesh>(null);

	useFrame((_, delta) => {
		if (coreRef.current) coreRef.current.rotation.y += delta * 0.15;
		if (wireRef.current) wireRef.current.rotation.x += delta * 0.1;
	});

	return (
		<Float speed={1.6} rotationIntensity={0} floatIntensity={0.2}>
			{/* Glow aura */}
			<mesh>
				<sphereGeometry args={[0.9, 32, 32]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.03}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Wireframe outer shell */}
			<mesh ref={wireRef}>
				<icosahedronGeometry args={[0.55, 2]} />
				<meshBasicMaterial
					color="#3b82f6"
					wireframe
					transparent
					opacity={0.25}
				/>
			</mesh>

			{/* Solid inner core */}
			<mesh ref={coreRef}>
				<icosahedronGeometry args={[0.35, 2]} />
				<meshStandardMaterial
					color="#3b82f6"
					emissive="#3b82f6"
					emissiveIntensity={0.5}
					roughness={0.08}
					metalness={0.7}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Inner bright core */}
			<mesh>
				<sphereGeometry args={[0.15, 32, 32]} />
				<meshBasicMaterial color="#93c5fd" />
			</mesh>
		</Float>
	);
}

function OrbitalRings() {
	return (
		<>
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[2.6, 0.005, 8, 180]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.04}
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
				<torusGeometry args={[2.2, 0.004, 8, 150]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.03}
					side={THREE.DoubleSide}
				/>
			</mesh>
		</>
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
			<Starfield />
			<CentralCore />
			<OrbitalRings />

			{cards.map(({ skill, position }) => (
				<TechOrb
					key={skill.id}
					skill={skill}
					position={position}
				/>
			))}
		</group>
	);
}

export const TechSphere = () => {
	return (
		<div className="w-full h-[500px] md:h-[550px] overflow-visible">
			<Canvas
				camera={{ position: [0, 1.5, 8], fov: 50 }}
				gl={{ antialias: true, alpha: true }}
				style={{ overflow: "visible" }}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={0.6} />
					<pointLight position={[5, 5, 5]} intensity={1.5} />
					<pointLight
						position={[-5, -3, -3]}
						intensity={0.5}
						color="#3b82f6"
					/>
					<Scene />
					<OrbitControls
						enableZoom={false}
						enablePan={false}
						autoRotate
						autoRotateSpeed={0.2}
						maxPolarAngle={Math.PI / 1.6}
						minPolarAngle={Math.PI / 2.5}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
};
