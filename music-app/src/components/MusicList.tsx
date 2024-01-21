import { fomatTime } from "./FormatTime/FomatTime";
import useMusic from "./Hook";
import "./MusicList.css";

const MusicList = () => {
  const { items, currentSong, handleChooseSong } = useMusic();

  const backgroundStyle = {
    backgroundImage: currentSong.id ? `url(${currentSong.background})` : "none",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className="play-list" style={backgroundStyle}>
      <div className="play-list-song">
        <div className="heading">
          <h1>PLAYLIST</h1>
        </div>

        {items.map((item) => (
          <div
            className="play-list-item"
            key={item.id}
            style={{ background: currentSong.id === item.id ? "grey" : "none" }}
            onClick={() => handleChooseSong(item)}
          >
            <div className="play-list-Ele">
              <div className="play-list-img">
                <img src={item.thumbnail} alt={item.title} />
              </div>
            </div>

            <div className="play-list-title">
              <h3>{item.title}</h3>
              <p>{item.artist}</p>
            </div>

            <span>{fomatTime(item.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicList;
