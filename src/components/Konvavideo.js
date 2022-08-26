import React, { Component } from "react";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";

const Video = ({ src }) => {
  const imageRef = React.useRef(null);
  const [size, setSize] = React.useState({ width: 50, height: 50 });

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    return element;
  }, [src]);

  // when video is loaded, we should read it size
  React.useEffect(() => {
    const onload = function() {
      setSize({
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      });
    };
    videoElement.addEventListener("loadedmetadata", onload);
    return () => {
      videoElement.removeEventListener("loadedmetadata", onload);
    };
  }, [videoElement]);

  // use Konva.Animation to redraw a layer
  React.useEffect(() => {
    // videoElement.play();
    const layer = imageRef.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => anim.stop();
  }, [videoElement]);

  return (
    <>
            <button>play/pause</button>
      <button>stop</button>
    
    <Image
      ref={imageRef}
      image={videoElement}
      x={20}
      y={20}
      stroke="red"
      width={size.width}
      height={size.height}
      draggable
    />
    </>
  );
};

class Konvavideo extends Component {
  render() {
    return (

      <>
      <button>play/pause</button>
      <button>stop</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
        </Layer>
      </Stage>
      </>
    );
  }
}

export default Konvavideo;


