import { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Slider from "react-rangeslider";

interface CanvasProps {
  getEditedImage: (data: any) => any;
  width: number;
  height: number;
}

const resizeImage = (image: any, width: number, height: number) => {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.width = image.width > width ? width : image.width;
  canvas.height = image.height > height ? height : image.height;

  context?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg");
};

/**
 * Image previewer and editor
 * @param props getEditedImage (Callback function)
 * @param props width (Canvas width)
 * @param props height (Canvas height)
 * @returns base64 edited image
 * @example
 * const handleImage = (data: any) => {
 *   setImageData(data); // This is the base64 image
 * }
 *
 * const SomeForm: React.FC = () => {
 *  return (
 *   <ImageCanvas getEditedImage={handleImage} />
 *  )
 * }
 */
const ImageCanvas = (props: CanvasProps) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotate, setRotation] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [editor, setEditor] = useState<any>();

  const configureEditor = (editor: any) => {
    setEditor(editor);
  };

  const changeZoomLevel = (level: number) => {
    setZoomLevel(level);
  };

  const changeRotation = () => {
    let rotation = rotate + 90;

    if (rotation >= 360) {
      rotation = 0;
    }

    setRotation(rotation);
  };

  const handleImage = (event: any) => {
    setImgSrc(event.target.files[0]);
  };

  const saveChanges = async (event: any) => {
    let image: any = editor.getImage();
    image = resizeImage(image, props.width, props.height);
    props.getEditedImage(image);
  };

  return (
    <div>
      <div className="justiy-content-md-center text-center mb-3 mx-5">
        <input
          type="file"
          className="text-center image-selector"
          accept="image/*"
          name="imageSrc"
          onChange={(e) => handleImage(e)}
        />
      </div>

      {imgSrc ? (
        <div className="row">
          <div className="form-group g-0 d-flex justify-content-md-center image-editor">
            <AvatarEditor
              ref={configureEditor}
              image={imgSrc}
              border={0}
              width={props.width}
              height={props.height}
              borderRadius={0}
              color={[0, 0, 0, 0.6]}
              scale={zoomLevel}
              rotate={rotate}
              onPositionChange={saveChanges}
              onLoadSuccess={saveChanges}
            />

            <div className="slider orientation-reversed mx-4">
              <div className="slider-group">
                <div className="slider-vertical">
                  <Slider
                    min={1}
                    max={8}
                    step={0.1}
                    tooltip={false}
                    orientation="vertical"
                    value={zoomLevel}
                    onChange={changeZoomLevel}
                    onChangeComplete={saveChanges}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary btn-pill shadow-none btn-sm mt-3"
              onClick={changeRotation}
            >
              <i className="fas fa-undo rotate-icon"></i>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageCanvas;
