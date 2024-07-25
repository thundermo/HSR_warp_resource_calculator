interface ImageProps {
  src: string;
}

const Imgage: React.FC<ImageProps> = ({ src }) => {
  return (
    <img
      src={src}
      style={{ width: "1em", height: "1em", margin: "0 5px" }}
      className="img-fluid"
    />
  );
};

export default Imgage;
