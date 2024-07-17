declare module 'react-audio-visualize' {
  import React from 'react';

  interface LiveAudioVisualizerProps {
    mediaRecorder: MediaRecorder;
    width?: number;
    height?: number;
    barWidth?: number;
    gap?: number;
    barColor?: string;
  }

  interface AudioVisualizerProps {
    blob: Blob;
    width?: number;
    height?: number;
    barWidth?: number;
    gap?: number;
    barColor?: string;
  }

  export const LiveAudioVisualizer: React.FC<LiveAudioVisualizerProps>;
  export const AudioVisualizer: React.FC<AudioVisualizerProps>;
}
