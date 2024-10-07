'use client';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { Line } from '@react-three/drei';

export default function App() {
  return (
    <div className="w-full h-full absolute top-0 right-0">
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      <Physics debug interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
    </Canvas>
    </div>
  )
}

function Band() {
  const fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
        ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      // Aktualizacja punktów na krzywej Catmull-Rom
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.translation())
      curve.points[2].copy(j1.current.translation())
      curve.points[3].copy(fixed.current.translation())
      
      // Aktualizacja obrotu karty
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  const texture = useLoader(THREE.TextureLoader, '/page/top.webp');


  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} angularDamping={2} linearDamping={2} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody >
        <RigidBody position={[1.5, 0, 0]} ref={j3} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody >
        <RigidBody position={[2, 0, 0]} ref={card} angularDamping={2} linearDamping={2} type={dragged ? 'kinematicPosition' : 'dynamic'} >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <mesh
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <planeGeometry args={[1.5, 2]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
        </RigidBody >
      </group >
      <Line
        points={curve.getPoints(32)}  // Automatyczne rysowanie linii na podstawie punktów krzywej
        color="white"
        lineWidth={1}
        dashed={false}
      />
    </>
  )
}
