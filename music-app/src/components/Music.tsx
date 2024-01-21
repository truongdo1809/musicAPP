// Player.tsx
import React from 'react';

import './Music.css';

import { FaPlay, FaPause } from "react-icons/fa";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled  } from "react-icons/tb";
import { RxLoop } from "react-icons/rx";
import { RxShuffle } from "react-icons/rx";
import useMusic from './Hook';
import { fomatTime } from './FormatTime/FomatTime';

const Music: React.FC = () => {
  const {
    playing,
    currentSong,
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
    volume,
    currentTime,
    handleTimeUpdate,
    toggleLoop,
    toggleShuffle,
    isLoop,
    isShuffle,
    handleEnded,
    audioRef,
    handeleMouseDown,
    handeleMouseUp,
    handeleCurrentTimeChange,
    handeleVolumeChange,
 
  } = useMusic();

  return (
    <div className="player">
      <audio
        src={currentSong.src}
        ref={audioRef}
        onTimeUpdate={(e:any) => handleTimeUpdate(e.target.currentTime)}
        onEnded={handleEnded}
      ></audio>
      <img className="player-img" src={currentSong.thumbnail} alt="" />
      
      <h1>{currentSong.title}</h1>
      <span>{currentSong.artist}</span>

      <div className="player-time">
        <span>{fomatTime(currentTime)}</span>
        <input
          className="input-time"
          type="range"
          min={0}
          max={currentSong.duration}
          step={1}
          value={currentTime}
          onChange={handeleCurrentTimeChange}
          onMouseDown={handeleMouseDown}
          onMouseUp={handeleMouseUp}
        />
        <span>{fomatTime(currentSong.duration)}</span>
      </div>

      <div className="player-btn">
      <button className={isShuffle ? "active" : ""} onClick={toggleShuffle}>
          <RxShuffle></RxShuffle>
        </button>
        <button onClick={handlePrev}><TbPlayerTrackPrevFilled></TbPlayerTrackPrevFilled></button>
        <button onClick={playing ? handlePause : handlePlay}>
          {playing ? <FaPause></FaPause> : <FaPlay></FaPlay>}
        </button>
        <button onClick={handleNext}><TbPlayerTrackNextFilled></TbPlayerTrackNextFilled></button>
        <button className={isLoop ? "active" : ""} onClick={toggleLoop}>
          <RxLoop></RxLoop>
        </button>


        <div className="player-volume">
          <span>
            {volume === 0 ? "Volume X" : volume < 0.25 ? "Volume 1" : volume < 0.5 ? "Volume 2" : "Volume"}
          </span>
          <input
            className="volume-input"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handeleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Music;
