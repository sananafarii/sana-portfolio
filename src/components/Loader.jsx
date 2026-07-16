import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="canvas-loader">
        <span className="canvas-loader__value">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
};

export default CanvasLoader;
