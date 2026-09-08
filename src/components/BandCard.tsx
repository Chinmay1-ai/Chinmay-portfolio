"use client";

import * as THREE from "three";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";

import {
  MeshLineGeometry,
  MeshLineMaterial,
} from "meshline";

extend({
  MeshLineGeometry,
  MeshLineMaterial,
});


/* =========================================================
   ASSETS
========================================================= */

const GLTF_PATH = "/assets/cards.glb";
const TEXTURE_PATH = "/assets/chinmay.png";

useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);


/* =========================================================
   MAIN BAND CARD COMPONENT
========================================================= */

export default function BandCard() {
  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile
      );
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
          }}
          dpr={[1, 2]}
          camera={{
            position: isMobile
              ? [0, 0, 15]
              : [0, 0, 13],
            fov: isMobile ? 32 : 25,
          }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
            touchAction: "none",
          }}
        >
          <ambientLight intensity={1.5} />

          <Physics
            interpolate
            gravity={[0, -25, 0]}
            timeStep={1 / 60}
          >
            <Band
              isMobile={isMobile}
            />
          </Physics>

          <Environment blur={0.75}>

            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[
                0,
                0,
                Math.PI / 3,
              ]}
              scale={[100, 0.1, 1]}
            />

            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[
                0,
                0,
                Math.PI / 3,
              ]}
              scale={[100, 0.1, 1]}
            />

            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[
                0,
                0,
                Math.PI / 3,
              ]}
              scale={[100, 0.1, 1]}
            />

            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[
                0,
                Math.PI / 2,
                Math.PI / 3,
              ]}
              scale={[100, 10, 1]}
            />

          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
}


/* =========================================================
   BAND
========================================================= */

function Band({
  isMobile,
  maxSpeed = 50,
  minSpeed = 10,
}: {
  isMobile: boolean;
  maxSpeed?: number;
  minSpeed?: number;
}) {

  const band = useRef<any>(null);

  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);

  const card = useRef<any>(null);


  /* =======================================================
     THREE.JS HELPERS
  ======================================================= */

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();


  /* =======================================================
     PHYSICS SETTINGS
  ======================================================= */

  const segmentProps: any = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };


  /* =======================================================
     GLTF
  ======================================================= */

  const gltf = useGLTF(GLTF_PATH) as any;

  const nodes = gltf?.nodes || {};
  const materials = gltf?.materials || {};


  /* =======================================================
     CARD GEOMETRY
  ======================================================= */

  const cardGeometry = useMemo(() => {

    if (!nodes?.card?.geometry) {
      return null;
    }

    const geometry =
      nodes.card.geometry.clone();

    geometry.computeBoundingBox();

    const box =
      geometry.boundingBox;

    if (!box) {
      return geometry;
    }

    const position =
      geometry.attributes.position;

    const uv =
      new Float32Array(
        position.count * 2
      );

    const sizeX =
      box.max.x - box.min.x;

    const sizeY =
      box.max.y - box.min.y;


    for (
      let i = 0;
      i < position.count;
      i++
    ) {

      const x =
        position.getX(i);

      const y =
        position.getY(i);


      uv[i * 2] =
        sizeX !== 0
          ? (x - box.min.x) /
            sizeX
          : 0;


      uv[i * 2 + 1] =
        sizeY !== 0
          ? (box.max.y - y) /
            sizeY
          : 0;
    }


    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(
        uv,
        2
      )
    );


    return geometry;

  }, [nodes?.card?.geometry]);


  /* =======================================================
     CHINMAY TEXTURE
  ======================================================= */

  const texture =
    useTexture(TEXTURE_PATH);


  useEffect(() => {

    if (!texture) {
      return;
    }

    texture.flipY = false;

    texture.colorSpace =
      THREE.SRGBColorSpace;

    texture.wrapS =
      THREE.ClampToEdgeWrapping;

    texture.wrapT =
      THREE.ClampToEdgeWrapping;

    texture.needsUpdate = true;

  }, [texture]);


  /* =======================================================
     CANVAS SIZE
  ======================================================= */

  const {
    width,
    height,
  } = useThree(
    (state) => state.size
  );


  /* =======================================================
     ROPE CURVE
  ======================================================= */

  const [curve] =
    useState(
      () =>
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ])
    );


  /* =======================================================
     DRAG STATE
  ======================================================= */

  const [dragged, drag] =
    useState<any>(null);

  const [hovered, hover] =
    useState(false);

  const canDrag = true;


  /* =======================================================
     ROPE JOINTS
  ======================================================= */

  useRopeJoint(
    fixed,
    j1,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ] as any
  );


  useRopeJoint(
    j1,
    j2,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ] as any
  );


  useRopeJoint(
    j2,
    j3,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ] as any
  );


  useSphericalJoint(
    j3,
    card,
    [
      [0, 0, 0],
      [0, 1.45, 0],
    ] as any
  );


  /* =======================================================
     CURSOR
  ======================================================= */

  useEffect(() => {

    if (
      hovered &&
      canDrag
    ) {

      document.body.style.cursor =
        dragged
          ? "grabbing"
          : "grab";


      return () => {
        document.body.style.cursor =
          "auto";
      };
    }

  }, [
    hovered,
    dragged,
  ]);


  /* =======================================================
     ANIMATION / DRAGGING
  ======================================================= */

  useFrame(
    (state, delta) => {

      /* -----------------------------------------------------
         DRAGGING
      ----------------------------------------------------- */

      if (
        dragged !== null &&
        card.current &&
        canDrag
      ) {

        vec
          .set(
            state.pointer.x,
            state.pointer.y,
            0.5
          )
          .unproject(
            state.camera
          );


        dir
          .copy(vec)
          .sub(
            state.camera.position
          )
          .normalize();


        vec.add(
          dir.multiplyScalar(
            state.camera.position.length()
          )
        );


        [
          card,
          j1,
          j2,
          j3,
          fixed,
        ].forEach((r) =>
          r.current?.wakeUp()
        );


        const newX =
          vec.x - dragged.x;


        let newY =
          vec.y - dragged.y;


        const newZ = 0;


        if (isMobile) {
          vec.multiplyScalar(0.92);
        }


        const limit =
          isMobile
            ? -0.05
            : -0.2;


        if (
          state.pointer.y <
          limit
        ) {

          newY =
            card.current
              .translation()
              .y;
        }


        card.current
          .setNextKinematicTranslation({
            x: newX,
            y: newY,
            z: newZ,
          });
      }


      /* -----------------------------------------------------
         ROPE / CARD PHYSICS
      ----------------------------------------------------- */

      if (
        fixed.current &&
        j1.current &&
        j2.current &&
        j3.current &&
        card.current
      ) {

        [j1, j2].forEach(
          (ref) => {

            if (
              !ref.current.lerped
            ) {

              ref.current.lerped =
                new THREE.Vector3().copy(
                  ref.current.translation()
                );
            }


            const d =
              Math.max(
                0.1,
                Math.min(
                  1,
                  ref.current
                    .lerped
                    .distanceTo(
                      ref.current
                        .translation()
                    )
                )
              );


            ref.current.lerped.lerp(
              ref.current.translation(),
              delta *
                (
                  minSpeed +
                  d *
                    (
                      maxSpeed -
                      minSpeed
                    )
                )
            );
          }
        );


        /* ---------------------------------------------------
           UPDATE LANYARD CURVE
        --------------------------------------------------- */

        curve.points[0].copy(
          j3.current.translation()
        );

        curve.points[1].copy(
          j2.current.lerped
        );

        curve.points[2].copy(
          j1.current.lerped
        );

        curve.points[3].copy(
          fixed.current.translation()
        );


        /* ---------------------------------------------------
           UPDATE LANYARD GEOMETRY
        --------------------------------------------------- */

        if (
          band.current?.geometry
        ) {

          band.current.geometry.setPoints(
            curve.getPoints(32)
          );
        }


        /* ---------------------------------------------------
           CARD ROTATION
        --------------------------------------------------- */

        ang.copy(
          card.current.angvel()
        );

        rot.copy(
          card.current.rotation()
        );


        card.current.setAngvel({
          x: ang.x,
          y:
            ang.y -
            rot.y * 0.25,
          z: ang.z,
        });
      }
    }
  );


  curve.curveType =
    "chordal";


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>

      {/* =====================================================
          PHYSICS / CARD GROUP
      ===================================================== */}

      <group
        position={
          isMobile
            ? [1.2, 3, 0]
            : [3, 4, 0]
        }
      >

        {/* ===================================================
            FIXED LANYARD POINT
        =================================================== */}

        <RigidBody
          ref={fixed}
          {...segmentProps}
          type="fixed"
        />


        {/* ===================================================
            LANYARD JOINT 1
        =================================================== */}

        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
        >
          <BallCollider
            args={[0.1]}
          />
        </RigidBody>


        {/* ===================================================
            LANYARD JOINT 2
        =================================================== */}

        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
        >
          <BallCollider
            args={[0.1]}
          />
        </RigidBody>


        {/* ===================================================
            LANYARD JOINT 3
        =================================================== */}

        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
        >
          <BallCollider
            args={[0.1]}
          />
        </RigidBody>


        {/* ===================================================
            CARD
        =================================================== */}

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? "kinematicPosition"
              : "dynamic"
          }
        >

          <CuboidCollider
            args={[
              0.8,
              1.125,
              0.01,
            ]}
          />


          <group
            scale={
              isMobile
                ? 1.7
                : 2.25
            }
            position={[
              0,
              -1.2,
              -0.05,
            ]}

            onPointerOver={() =>
              canDrag &&
              hover(true)
            }

            onPointerOut={() =>
              canDrag &&
              hover(false)
            }


            onPointerUp={(
              e: any
            ) => {

              if (!canDrag) {
                return;
              }

              e.stopPropagation();

              e.target.releasePointerCapture(
                e.pointerId
              );

              drag(false);
            }}


            onPointerDown={(
              e: any
            ) => {

              if (!canDrag) {
                return;
              }

              e.target.setPointerCapture(
                e.pointerId
              );


              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(
                    vec.copy(
                      card.current.translation()
                    )
                  )
              );
            }}
          >

            {/* =============================================
                CHINMAY CARD
            ============================================= */}

            {cardGeometry && (
              <mesh
                geometry={cardGeometry}
              >

                <meshPhysicalMaterial
                  map={texture}
                  roughness={0.35}
                  metalness={0.1}
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                  color="white"
                  transparent={false}
                  toneMapped={true}
                  side={
                    THREE.FrontSide
                  }
                />

              </mesh>
            )}


            {/* =============================================
                METAL CLIP
            ============================================= */}

            {nodes?.clip?.geometry && (
              <mesh
                geometry={
                  nodes.clip.geometry
                }
                material={
                  materials.metal
                }
              />
            )}


            {/* =============================================
                METAL CLAMP
            ============================================= */}

            {nodes?.clamp?.geometry && (
              <mesh
                geometry={
                  nodes.clamp.geometry
                }
                material={
                  materials.metal
                }
              />
            )}

          </group>

        </RigidBody>

      </group>


      {/* =====================================================
          LANYARD
      ===================================================== */}

      <mesh
  ref={band}
  renderOrder={999}
>
  {/* @ts-expect-error meshline */}
  <meshLineGeometry />

  {/* @ts-expect-error meshline */}
  <meshLineMaterial
    color="#222222"
    transparent
    opacity={1}
    depthTest={false}
    depthWrite={false}
    resolution={[width, height]}
    lineWidth={
      isMobile
        ? 0.045
        : 0.06
    }
  />
</mesh>

    </>
  );
}