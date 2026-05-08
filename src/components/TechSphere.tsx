"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import skillsData from "src/data/skills.json";

type Skill = (typeof skillsData)[number];

const SPIRAL_ARMS = 3;
const BASE_RADIUS = 1.4;
const RADIUS_STEP = 0.58;

const skillColors: Record<string, string> = {
	"react.js": "#61dafb",
	"vue.js": "#42b883",
	typescript: "#3178c6",
	javascript: "#f0db4f",
	tailwind: "#06b6d4",
	"next.js": "#a0a0a0",
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
	const y = (stepIndex - 1.5) * 0.55;
	return [r * Math.cos(theta), y, r * Math.sin(theta)];
}

function TechOrb({
	skill,
	position,
}: {
	skill: Skill;
	position: [number, number, number];
}) {
	const groupRef = useRef<THREE.Group>(null);
	const [hovered, setHovered] = useState(false);
	const color = getColor(skill.title);

	return (
		<Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.45}>
			<group
				ref={groupRef}
				position={position}
				scale={hovered ? 1.45 : 1}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
			>
				{/* Ring around orb */}
				<mesh rotation={[Math.PI / 2, 0, 0]}>
					<torusGeometry args={[0.19, 0.012, 8, 24]} />
					<meshBasicMaterial
						color={color}
						transparent
						opacity={hovered ? 0.5 : 0.15}
						side={THREE.DoubleSide}
					/>
				</mesh>

				{/* Outer wireframe icosahedron */}
				<mesh>
					<icosahedronGeometry args={[0.18, 1]} />
					<meshBasicMaterial
						color={color}
						wireframe
						transparent
						opacity={hovered ? 0.8 : 0.25}
						side={THREE.DoubleSide}
					/>
				</mesh>

				{/* Inner wireframe for depth */}
				<mesh>
					<icosahedronGeometry args={[0.11, 1]} />
					<meshBasicMaterial
						color={color}
						wireframe
						transparent
						opacity={hovered ? 0.4 : 0.1}
						side={THREE.DoubleSide}
					/>
				</mesh>

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

				{/* Label */}
				<Html
					position={[0, -0.45, 0]}
					center
					distanceFactor={6.5}
					prepend
					style={{ pointerEvents: "none" }}
				>
					<span
						className={`inline-block text-[9px] font-semibold tracking-wider whitespace-nowrap transition-all duration-300 px-2 py-0.5 rounded-full ${
							hovered
								? "text-alvaro-white bg-alvaro-primary/15 scale-110"
								: "text-alvaro-muted/60"
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
		const pts = new Float32Array(500 * 3);
		for (let i = 0; i < 500; i++) {
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
					count={500}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.01}
				color="#6080c0"
				transparent
				opacity={0.3}
				sizeAttenuation
			/>
		</points>
	);
}

function CentralCore() {
	const wireRef = useRef<THREE.Mesh>(null);

	useFrame((_, delta) => {
		if (wireRef.current) {
			wireRef.current.rotation.y += delta * 0.12;
			wireRef.current.rotation.x += delta * 0.08;
		}
	});

	return (
		<Float speed={1.8} rotationIntensity={0} floatIntensity={0.15}>
			{/* Wide soft glow */}
			<mesh>
				<sphereGeometry args={[0.95, 32, 32]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.025}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Medium glow ring */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[0.6, 0.015, 16, 64]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.08}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Outer wireframe shell */}
			<mesh ref={wireRef}>
				<icosahedronGeometry args={[0.5, 2]} />
				<meshBasicMaterial
					color="#60a5fa"
					wireframe
					transparent
					opacity={0.3}
				/>
			</mesh>

			{/* Inner wireframe */}
			<mesh>
				<icosahedronGeometry args={[0.32, 2]} />
				<meshBasicMaterial
					color="#3b82f6"
					wireframe
					transparent
					opacity={0.15}
				/>
			</mesh>

			{/* Bright center dot */}
			<mesh>
				<sphereGeometry args={[0.08, 16, 16]} />
				<meshBasicMaterial color="#93c5fd" />
			</mesh>
		</Float>
	);
}

function OrbitalRings() {
	return (
		<>
			<mesh rotation={[Math.PI / 2.1, 0, 0]}>
				<torusGeometry args={[2.7, 0.004, 8, 200]} />
				<meshBasicMaterial
					color="#3b82f6"
					transparent
					opacity={0.035}
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh rotation={[Math.PI / 2.8, Math.PI / 5, 0]}>
				<torusGeometry args={[2.3, 0.003, 8, 160]} />
				<meshBasicMaterial
					color="#60a5fa"
					transparent
					opacity={0.025}
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
			groupRef.current.rotation.y += delta * 0.04;
		}
	});

	const orbs = useMemo(() => {
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

			{orbs.map(({ skill, position }) => (
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
					<ambientLight intensity={0.7} />
					<pointLight position={[5, 5, 5]} intensity={1.5} />
					<pointLight
						position={[-5, -3, -3]}
						intensity={0.4}
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
