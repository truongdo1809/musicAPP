import { MusicAction, MusicState } from "./Types";

const MusicReducer = (state: MusicState, action: MusicAction): MusicState => {
  switch (action.type) {
    case "play": {
      return {
        ...state,
        playing: true,
      };
    }

    case "pause": {
      return {
        ...state,
        playing: false,
      };
    }

    case "next": {
      let nextSongIndex = state.currentSongIndex + 1;
      if (nextSongIndex >= state.items.length) {
        nextSongIndex = 0;
      }
      return {
        ...state,
        currentSongIndex: nextSongIndex,
      };
    }

    case "prev": {
      let previousSongIndex = state.currentSongIndex - 1;
      if (previousSongIndex < 0) {
        previousSongIndex = state.items.length - 1;
      }
      return {
        ...state,
        currentSongIndex: previousSongIndex,
      };
    }

    case "Adjust time": {
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };
    }

    case "Loop": {
      return {
        ...state,
        loop: !state.loop,
      };
    }

    case "Shuffle": {
      return {
        ...state,
        shuffle: !state.shuffle,
      };
    }

    case "Set song random": {
      return {
        ...state,
        currentSongIndex: action.payload.currentSongIndex,
      };
    }

    case "Adjust volume": {
      return {
        ...state,
        volume: action.payload.volume,
      };
    }

    case "set song": {
      const songIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        currentSongIndex: songIndex,
      };
    }

    default:
     {
      throw  new Error(`Invalid action${action}`)
     }
  }
};

export default MusicReducer;
