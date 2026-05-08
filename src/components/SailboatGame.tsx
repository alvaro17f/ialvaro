"use client";

import {
	useRef,
	useState,
	useEffect,
	useMemo,
	Suspense,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import skillsData from "src/data/skills.json";

type Skill = (typeof skillsData)[number];

const SEA_SIZE = 16;
const SEA_SEGMENTS = 80;
const BOAT_SPEED = 3.5;
const DOLPHIN_INTERVAL = 3.5;
const DOLPHIN_JUMP_HEIGHT = 2.5;
const DOLPHIN_JUMP_DURATION = 2.2;

const dolphinColors = [
	"#61dafb",
	"#42b883",
	"#3178c6",
	"#f0db4f",
	"#06b6d4",
	"#a0a0a0",
	"#dea584",
	"#00add8",
	"#c21325",
	"#5fa04e",
	"#2496ed",
	"#e38c00",
];

/* ── Sea ── */

function Sea() {
	const ref = useRef<THREE.Mesh>(null);

	useFrame(({ clock }) => {
		const mesh = ref.current;
		if (!mesh) return;
		const t = clock.getElapsedTime();
		const geo = mesh.geometry as THREE.PlaneGeometry;
		const pos = geo.attributes.position.array as Float32Array;
		for (let i = 0; i < pos.length; i += 3) {
			const x = pos[i];
			const y = pos[i + 1];
			pos[i + 2] =
				Math.sin(x * 1.5 + t * 1.2) *
				Math.cos(y * 1.3 + t * 0.9) *
				0.18;
		}
		geo.attributes.position.needsUpdate = true;
		geo.computeVertexNormals();
	});

	return (
		<mesh
			ref={ref}
			rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		>
			<planeGeometry args={[SEA_SIZE, SEA_SIZE, SEA_SEGMENTS, SEA_SEGMENTS]} />
			<meshStandardMaterial
				color="#0f5e8a"
				roughness={0.15}
				metalness={0.25}
				side={THREE.DoubleSide}
			/>
		</mesh>
	);
}

/* ── Sailboat ── */

function Sailboat({
	position,
	rotation,
}: {
	position: [number, number, number];
	rotation: number;
}) {
	return (
		<group position={position} rotation={[0, rotation, 0]}>
			{/* Hull */}
			<mesh position={[0, 0.08, 0]}>
				<boxGeometry args={[0.45, 0.12, 1]} />
				<meshStandardMaterial color="#6b3a2a" roughness={0.6} />
			</mesh>
			{/* Mast */}
			<mesh position={[0, 0.55, -0.05]}>
				<cylinderGeometry args={[0.025, 0.03, 0.9, 8]} />
				<meshStandardMaterial color="#4a3520" />
			</mesh>
			{/* Main sail */}
			<mesh position={[0.2, 0.6, -0.02]} rotation={[0, 0.15, 0.08]}>
				<planeGeometry args={[0.35, 0.55]} />
				<meshStandardMaterial
					color="#f5f0e8"
					roughness={0.9}
					side={THREE.DoubleSide}
				/>
			</mesh>
		</group>
	);
}

/* ── Dolphin ── */

function Dolphin({
	position,
	color,
	skill,
	progress,
}: {
	position: [number, number, number];
	color: string;
	skill: Skill;
	progress: number;
}) {
	const bodyRef = useRef<THREE.Group>(null);

	// Arc: start below water, peak at progress=0.5, fall back
	const yOffset = Math.sin(progress * Math.PI) * DOLPHIN_JUMP_HEIGHT;

	// Rotate body along the arc
	const pitch = Math.cos(progress * Math.PI) * 0.6;

	return (
		<group
			position={[position[0], position[1] + yOffset, position[2]]}
			rotation={[pitch, 0, 0]}
			ref={bodyRef}
		>
			{/* Body */}
			<mesh scale={[0.5, 0.25, 0.9]}>
				<sphereGeometry args={[0.2, 8, 8]} />
				<meshStandardMaterial
					color={color}
					roughness={0.3}
					metalness={0.2}
				/>
			</mesh>
			{/* Snout */}
			<mesh position={[0, 0.02, 0.22]} scale={[0.5, 0.35, 0.7]}>
				<coneGeometry args={[0.1, 0.15, 6]} />
				<meshStandardMaterial color={color} roughness={0.3} />
			</mesh>
			{/* Tail fin */}
			<mesh
				position={[0, 0, -0.24]}
				rotation={[0, 0, Math.PI / 2]}
				scale={[0.7, 0.05, 0.6]}
			>
				<planeGeometry args={[0.12, 0.08]} />
				<meshStandardMaterial
					color={color}
					roughness={0.3}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Skill label — always visible while jumping */}
			<Html
				position={[0, 0.4, 0]}
				center
				distanceFactor={7}
				style={{ pointerEvents: "none" }}
			>
				<span className="text-[10px] font-bold tracking-wide whitespace-nowrap text-white bg-black/40 px-2 py-0.5 rounded-full">
					{skill.title}
				</span>
			</Html>
		</group>
	);
}

/* ── Water splash particles ── */

function Splash({
	position,
}: {
	position: [number, number, number];
}) {
	const ref = useRef<THREE.Points>(null);

	const particles = useMemo(() => {
		const count = 15;
		const arr = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			arr[i * 3] = (Math.random() - 0.5) * 0.6;
			arr[i * 3 + 1] = Math.random() * 0.4;
			arr[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
		}
		return arr;
	}, []);

	useFrame(() => {
		if (!ref.current) return;
		ref.current.position.y += 0.04;
		(ref.current.material as THREE.PointsMaterial).opacity -= 0.03;
	});

	return (
		<points ref={ref} position={position}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={15}
					array={particles}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.03}
				color="#a0d8ef"
				transparent
				opacity={0.7}
				sizeAttenuation
			/>
		</points>
	);
}

/* ── Game ── */

type DolphinState = {
	id: number;
	skill: Skill;
	position: [number, number, number];
	color: string;
	startTime: number;
};

function Game() {
	const { camera, gl } = useThree();
	const [boatPos, setBoatPos] = useState<THREE.Vector3>(
		new THREE.Vector3(0, 0.12, 0),
	);
	const [boatRot, setBoatRot] = useState(0);
	const [targetPos, setTargetPos] = useState<THREE.Vector3 | null>(null);
	const dolphinId = useRef(0);
	const lastDolphinTime = useRef(0);
	const splashId = useRef(0);
	const keysRef = useRef<Set<string>>(new Set());

	const [dolphins, setDolphins] = useState<DolphinState[]>(() => {
		const now = performance.now() / 1000;
		return skillsData.slice(0, 6).map((skill, i) => {
			const id = ++dolphinId.current;
			const angle = (i / 6) * Math.PI * 2;
			return {
				id,
				skill,
				position: [
					Math.cos(angle) * 4,
					0.02,
					Math.sin(angle) * 4,
				] as [number, number, number],
				color: dolphinColors[i],
				startTime: now - i * 0.4,
			};
		});
	});
	const [splashes, setSplashes] = useState<
		{ id: number; position: [number, number, number] }[]
	>([]);

	// Keyboard controls
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			keysRef.current.add(e.key);
		};
		const up = (e: KeyboardEvent) => {
			keysRef.current.delete(e.key);
		};
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, []);

	// Mouse click → set target position
	useEffect(() => {
		const canvas = gl.domElement;
		const raycaster = new THREE.Raycaster();
		const seaPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

		const onClick = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const mouse = new THREE.Vector2(
				((e.clientX - rect.left) / rect.width) * 2 - 1,
				-((e.clientY - rect.top) / rect.height) * 2 + 1,
			);
			raycaster.setFromCamera(mouse, camera);
			const target = new THREE.Vector3();
			raycaster.ray.intersectPlane(seaPlane, target);
			if (target) {
				const half = SEA_SIZE / 2 - 0.5;
				target.x = THREE.MathUtils.clamp(target.x, -half, half);
				target.z = THREE.MathUtils.clamp(target.z, -half, half);
				setTargetPos(target);
			}
		};
		canvas.addEventListener("click", onClick);
		return () => canvas.removeEventListener("click", onClick);
	}, [camera, gl.domElement]);

	// Game loop
	useFrame((_, delta) => {
		const dt = Math.min(delta, 0.1);
		const half = SEA_SIZE / 2 - 0.5;

		// Keyboard movement
		const keys = keysRef.current;
		let dx = 0;
		let dz = 0;
		if (keys.has("ArrowUp") || keys.has("w")) dz -= 1;
		if (keys.has("ArrowDown") || keys.has("s")) dz += 1;
		if (keys.has("ArrowLeft") || keys.has("a")) dx -= 1;
		if (keys.has("ArrowRight") || keys.has("d")) dx += 1;

		if (dx !== 0 || dz !== 0) {
			setTargetPos(null); // cancel click target on keyboard input
		}

		// Move boat
		setBoatPos((prev) => {
			let next: THREE.Vector3;

			if (targetPos) {
				const dir = targetPos.clone().sub(prev);
				const dist = dir.length();
				if (dist < 0.15) {
					setTargetPos(null);
					return targetPos.clone();
				}
				dir.normalize();
				next = prev.clone().add(dir.multiplyScalar(BOAT_SPEED * dt));
			} else {
				next = prev.clone();
				next.x += dx * BOAT_SPEED * dt;
				next.z += dz * BOAT_SPEED * dt;
			}

			next.x = THREE.MathUtils.clamp(next.x, -half, half);
			next.z = THREE.MathUtils.clamp(next.z, -half, half);
			return next;
		});

		// Boat rotation toward movement direction
		if ((dx !== 0 || dz !== 0) || targetPos) {
			setBoatRot((prev) => {
				let targetAngle: number;
				if (targetPos) {
					targetAngle = Math.atan2(
						targetPos.x - boatPos.x,
						targetPos.z - boatPos.z,
					);
				} else {
					targetAngle = Math.atan2(dx, -dz);
				}
				return THREE.MathUtils.lerp(prev, targetAngle, 0.1);
			});
		}

		// Spawn dolphins
		const now = performance.now() / 1000;
		if (now - lastDolphinTime.current > DOLPHIN_INTERVAL) {
			lastDolphinTime.current = now;
			const id = ++dolphinId.current;
			const skill = skillsData[id % skillsData.length];
			const angle = Math.random() * Math.PI * 2;
			const dist = 3 + Math.random() * 4;
			const position: [number, number, number] = [
				Math.cos(angle) * dist,
				0.02,
				Math.sin(angle) * dist,
			];
			const color =
				dolphinColors[id % dolphinColors.length];
			setDolphins((prev) => [
				...prev.slice(-10),
				{ id, skill, position, color, startTime: now },
			]);

			// Splash at dolphin spawn point
			const splashPid = ++splashId.current;
			setSplashes((prev) => [
				...prev.slice(-8),
				{ id: splashPid, position },
			]);
		}

		// Remove expired dolphins & splashes
		setDolphins((prev) =>
			prev.filter(
				(d) => now - d.startTime < DOLPHIN_JUMP_DURATION + 0.3,
			),
		);
		setSplashes((prev) =>
			prev.filter((_, i) => i < prev.length - 1 || Math.random() > 0.05),
		);
	});

	// Camera follows boat
	useFrame(() => {
		camera.position.x = boatPos.x;
		camera.position.z = boatPos.z + 6;
		camera.position.y = 4.5;
		camera.lookAt(boatPos.x, 0.2, boatPos.z);
	});

	return (
		<>
			<ambientLight intensity={0.85} />
			<directionalLight
				position={[10, 12, 4]}
				intensity={1.2}
				color="#fff8e7"
			/>
			<hemisphereLight
				args={["#87ceeb", "#0f3050", 0.4]}
			/>

			<Sea />
			<Sailboat position={[boatPos.x, boatPos.y, boatPos.z]} rotation={boatRot} />

			{dolphins.map((d) => (
				<Dolphin
					key={d.id}
					position={d.position}
					color={d.color}
					skill={d.skill}
					progress={
						(performance.now() / 1000 - d.startTime) /
						DOLPHIN_JUMP_DURATION
					}
				/>
			))}

			{splashes.map((s) => (
				<Splash key={s.id} position={s.position} />
			))}
		</>
	);
}

/* ── Export ── */

export const SailboatGame = () => {
	return (
		<div className="w-full h-[500px] md:h-[550px] overflow-hidden rounded-2xl border border-alvaro-border">
			<Canvas
				camera={{ position: [0, 4.5, 6], fov: 55, near: 0.5, far: 50 }}
				gl={{ antialias: true, alpha: false }}
				style={{ background: "linear-gradient(180deg, #87ceeb 0%, #b0d4f1 40%, #0f3050 100%)" }}
			>
				<Suspense fallback={null}>
					<Game />
				</Suspense>
			</Canvas>
			{/* Controls hint */}
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-alvaro-muted/50 pointer-events-none select-none">
				Arrow keys to sail  &middot;  Click water to navigate
			</div>
		</div>
	);
};
