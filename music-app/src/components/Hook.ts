// useMusic.tsx
import { useContext, useEffect, useRef } from "react";
import { MusicContext } from "./MusicContext";
import {  MusicItem } from "./Types";

const useMusic = () => {
  const { state, dispatch } = useContext(MusicContext);
  const audioRef = useRef<any>();
  const { playing, currentSongIndex, currentTime } = state;

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (playing) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  }, [playing, currentSongIndex, currentTime]);

  const handlePlay = () => {
    dispatch({
      type: "play",
    });
  };

  const handlePause = () => {
    dispatch({
      type: "pause",
    });
  };

  const handleNext = () => {
    if (state.shuffle) {
      const shuffledSongs = [...state.items].sort(() => Math.random() - 0.5);
      const currentIndex = shuffledSongs.findIndex(
        (item) => item.id === state.items[state.currentSongIndex].id
      );
      const nextIndex = (currentIndex + 1) % shuffledSongs.length;

      dispatch({
        type: "Set song random",
        payload: { currentSongIndex: nextIndex },
      });
    } else {
      dispatch({ type: "next" });
    }
  };

  const handlePrev = () => {
    if (state.shuffle) {
      const shuffledSongs = [...state.items].sort(() => Math.random() - 0.5);
      const currentIndex = shuffledSongs.findIndex(
        (item) => item.id === state.items[state.currentSongIndex].id
      );
      const prevIndex =
        (currentIndex - 1 + shuffledSongs.length) % shuffledSongs.length;

      dispatch({
        type: "Set song random",
        payload: { currentSongIndex: prevIndex },
      });
    } else {
      dispatch({ type: "prev" });
    }
  };

  const handleTimeUpdate = (currentTime: number) => {
    dispatch({
      type: "Adjust time",
      payload: {
        currentTime,
      },
    });
  };

  const toggleLoop = () => {
    dispatch({
      type: "Loop",
    });
  };

  const toggleShuffle = () => {
    dispatch({
      type: "Shuffle",
    });
  };

  const handleEnded = () => {
    if (state.loop) {
      dispatch({
        type: "Adjust time",
        payload: {
          currentTime: 0,
        },
      });
    } else {
      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.items.length);
        dispatch({
          type: "Set song random",
          payload: {
            currentSongIndex: randomIndex,
          },
        });
      } else {
        dispatch({
          type: "next",
        });
      }
    }
  };

  const handeleMouseDown = () => {
    audioRef.current!.muted = true;
  };

  const handeleMouseUp = () => {
    audioRef.current!.muted = false;
  };

  const handeleCurrentTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioRef.current!.currentTime = parseFloat(e.target.value);
  };

  const handeleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "Adjust volume",
      payload: { volume: parseFloat(e.target.value) },
    });
    audioRef.current!.volume = parseFloat(e.target.value);
  };

  const handleChooseSong = (song: MusicItem) => {
    dispatch({ type: "set song", payload: { id: song.id } });
  };

  const currentSong = state.items[state.currentSongIndex];
  const isLoop = state.loop;
  const isShuffle = state.shuffle;

  return {
    ...state,
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
    handleTimeUpdate,
    toggleLoop,
    toggleShuffle,
    handleEnded,
    handeleMouseDown,
    handeleMouseUp,
    handeleCurrentTimeChange,
    handeleVolumeChange,
    handleChooseSong,
    currentSong,
    isLoop,
    isShuffle,
    audioRef,
  };
};

export default useMusic;
