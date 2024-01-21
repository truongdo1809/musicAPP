export type MusicItem = {
    id: number;
    title: string;
    artist: string;
    duration: number;
    cover: string;
    thumbnail: string;
    background: string;
    src: string;
  };
  
  export type MusicAction =
    | { type: "play" }
    | { type: "pause" }
    | { type: "next" }
    | { type: "prev" }
    | { type: "Adjust time"; payload: { currentTime: number } }
    | { type: "Loop" }
    | { type: "Shuffle" }
    | { type: "Set song random"; payload: { currentSongIndex: number } }
    | { type: "Adjust volume"; payload: { volume: number } }
    | {
        type: "set song";
        payload: {
          id: number;
        };
      };
  
  export type MusicState = {
    currentSongIndex: number;
    playing: boolean;
    items: MusicItem[];
    loop: boolean;
    shuffle: boolean;
    currentTime: number;
    volume: number;
  };
  
  export type MusicContextObj = {
    state: MusicState;
    dispatch: React.Dispatch<MusicAction>;
  };
  