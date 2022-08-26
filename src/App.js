import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Circle, Line, Image } from "react-konva";
import useImage from "use-image";
import Konvavideo from "./components/Konvavideo";

// the first very simple and recommended way:
const LionImage = () => {
  const [image] = useImage("https://konvajs.org/assets/lion.png");
  return <Image image={image} />;
};

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
class URLImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "Some text on canvas",
    };
  }
  render() {
    return (
      <>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} />
            <LionImage />
          </Layer>
        </Stage>

        <button
          onClick={() => {
            this.state.text === ""
              ? this.setState({ text: "Some text on canvas" })
              : this.setState({ text: "" });
          }}
        >
          Toggle Text
        </button>

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Text text={this.state.text} fontSize={15} />
            <Rect
              x={20}
              y={50}
              width={100}
              height={100}
              fill="red"
              shadowBlur={10}
            />
            <Circle x={200} y={100} radius={50} fill="green" />
            <Line
              x={20}
              y={200}
              points={[0, 0, 100, 0, 100, 100]}
              tension={0.5}
              closed
              stroke="black"
              fillLinearGradientStartPoint={{ x: -50, y: -50 }}
              fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
            />
          </Layer>
        </Stage>

        <Konvavideo />
      </>
    );
  }
}

export default App;
