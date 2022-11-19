import { FC, Suspense } from "react";
import { Color, Euler, LinearToneMapping, sRGBEncoding } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { Center, Text, Spinner } from "@chakra-ui/react";

export interface RendererProps {
  width: number;
  height: number;
}

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

const Loading: FC = () => {
  return (
    <Center flexDir="column" gap="1em" h="full">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#753FE5"
        size="xl"
      />
      <Text>Constructing 3D Model</Text>
    </Center>
  );
};

const Room: FC = () => {
  const model = useGLTF("/assets/models/room.glb", true, true);
  return <primitive object={model.scene} />;
};

const Renderer: FC<RendererProps> = ({ width, height }) => {
  const whiteLight = new Color(0xffffff);

  const areaLight = new Color(0xc94aff);
  const areaLightEuler = new Euler(deg2rad(0), deg2rad(0), deg2rad(0), "XYZ");

  const backLight1 = new Color(0x6d4bff);
  const backLight1Euler = new Euler(
    deg2rad(-45),
    deg2rad(0),
    deg2rad(40),
    "XZY",
  );

  const backLight2 = new Color(0x594dff);
  const backLight2Euler = new Euler(
    deg2rad(-45),
    deg2rad(0),
    deg2rad(-55),
    "XZY",
  );

  const backLight3 = new Color(0xff67ce);
  const backLight3Euler = new Euler(
    deg2rad(-27.5),
    deg2rad(-43.6),
    deg2rad(12.3),
    "XZY",
  );

  return (
    <Suspense fallback={<Loading />}>
      <Canvas
        shadows
        orthographic
        gl={{
          toneMapping: LinearToneMapping,
          outputEncoding: sRGBEncoding,
          antialias: true,
        }}
        camera={{
          scale: 0.1,
          position: [30.6086, 30, 30.6086],
          zoom: 4,
          view: {
            enabled: true,
            fullWidth: width,
            fullHeight: height,
            offsetX: 0,
            offsetY: -80,
            width: width,
            height: height,
          },
          rotation: [deg2rad(60), deg2rad(45), deg2rad(0)],
        }}
        style={{ width: width, height: height }}
      >
        <OrbitControls />

        {/* <axesHelper args={[10]} />
        <gridHelper args={[10, 10, 0xff0000, "white"]} /> */}

        {/* <rectAreaLight
          position={[-6.73806, 8.65399, -7.83026]}
          intensity={1500}
          color={backLight1}
          rotation={backLight1Euler}
          castShadow
        />

        <rectAreaLight
          position={[8.45041, 9.09212, 4.10362]}
          intensity={1000}
          color={backLight2}
          rotation={backLight2Euler}
          castShadow
          width={5.27}
        />

        <rectAreaLight
          position={[-6.73806, 9.52906, 6.73806]}
          intensity={1000}
          color={backLight3}
          rotation={backLight3Euler}
          castShadow
          width={5.27}
        /> */}

        <directionalLight
          position={[-6.73806, 9.52906, 6.73806]}
          intensity={1}
          color={backLight3}
          rotation={backLight1Euler}
          castShadow
        />

        <directionalLight
          position={[8.45041, 9.09212, 4.10362]}
          intensity={0.8}
          color={backLight2}
          rotation={backLight2Euler}
          castShadow
        />

        <Room />
      </Canvas>
    </Suspense>
  );
};

export default Renderer;
