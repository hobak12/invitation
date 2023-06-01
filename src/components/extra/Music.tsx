const Music = () => {
  return (
    <div>
      <audio autoPlay={true} controls={true}>
        <source type="audio/mp3" src="/assets/strangers.mp3" />
      </audio>
    </div>
  );
};

export default Music;
