import React, { useState, useEffect } from 'react';
import { HiPlay, HiPause } from 'react-icons/hi2';
import useAudioStore from '../../store/audioStore';

interface ListenButtonProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const ListenButton: React.FC<ListenButtonProps> = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef: globalAudioRef, playAudio, setAudioRef } = useAudioStore();

  const handlePlayToggle = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        playAudio(audioRef.current);
        setAudioRef(audioRef.current);
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handleEnded = () => {
        setIsPlaying(false);
      };

      audioElement.addEventListener('ended', handleEnded);

      return () => {
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef]);

  useEffect(() => {
    if (globalAudioRef && globalAudioRef !== audioRef.current) {
      setIsPlaying(false);
    }
  }, [globalAudioRef, audioRef]);

  return (
    <div
      className="flex flex-1 items-center justify-center rounded-full border-2 border-primary-20 bg-primary-10 p-2 text-gray-50"
      onClick={handlePlayToggle}
    >
      {isPlaying ? (
        <HiPause size={36} className="text-red" />
      ) : (
        <HiPlay size={36} className="pl-1" />
      )}
    </div>
  );
};

export default ListenButton;
