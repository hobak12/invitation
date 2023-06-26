const Petals = ({ id, style }: any) => {
  return (
    <p className="petals" id={`item${id}`} style={style}>
      *
    </p>
  );
};

export default Petals;
