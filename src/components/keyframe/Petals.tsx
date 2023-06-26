const Petals = ({ id, style }: any) => {
  return (
    <>
      <p
        className="petals inline-block sm:hidden"
        id={`item${id}`}
        style={style}
      >
        *
      </p>
      <p
        className="petals1 hidden sm:inline-block "
        id={`item${id}`}
        style={style}
      >
        *
      </p>
    </>
  );
};

export default Petals;
