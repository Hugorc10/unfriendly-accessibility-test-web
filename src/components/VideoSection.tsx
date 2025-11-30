// Video component with accessibility improvements
import { useRef, useEffect } from 'react';
import SubtitleControls from './SubtitleControls';
import firstVideo from '../assets/videos/videoplayback1.mp4';
import secondVideo from '../assets/videos/videoplayback2.mp4';
// import firstVideoVtt from '../assets/subtitles/videoplayback1.vtt';
// import secondVideoVtt from '../assets/subtitles/videoplayback2.vtt';
import firstVideoPoster from '../assets/posters/3minutos.png';

const VideoSection = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Limit maximum volume to 20% for all videos
  useEffect(() => {
    const limitVolume = (video: HTMLVideoElement) => {
      const maxVolume = 0.2; // 20% of maximum volume
      if (video.volume > maxVolume) {
        video.volume = maxVolume;
      }
      
      // Monitor volume changes and cap at maximum
      const handleVolumeChange = () => {
        if (video.volume > maxVolume) {
          video.volume = maxVolume;
        }
      };
      
      video.addEventListener('volumechange', handleVolumeChange);
      return () => video.removeEventListener('volumechange', handleVolumeChange);
    };

    if (video1Ref.current) {
      video1Ref.current.volume = 0.2;
      limitVolume(video1Ref.current);
    }
    if (video2Ref.current) {
      video2Ref.current.volume = 0.2;
      limitVolume(video2Ref.current);
    }
  }, []);

  const subtitleTracks = [
    { label: 'Português', src: "/subtitles/3-minutos.vtt", language: 'pt-BR' }
  ];

  const bunnySubtitleTracks = [
    { label: 'Português', src: "/subtitles/meu-amigo-nietzsche.vtt", language: 'pt-BR' }
  ];

  return (
    <div className="stat-card p-4 sm:p-6 rounded-lg mb-6">
       <div className="mt-4 flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          placeholder="Pesquisar vídeos..."
          className="flex-1 p-2 sm:p-3 border border-border rounded nav-text bg-input text-sm"
        />
        <button
          type="button"
          className="px-4 py-2 sm:py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Pesquisar
        </button>
      </div>

      <div className="text-base sm:text-xl font-bold stat-title mb-4">Vídeos de Treinamento</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="relative">
          <div className="text-sm sm:text-base font-medium nav-text mb-2">3 Minutos</div>
          <video
            ref={video1Ref}
            className="w-full bg-black rounded object-contain"
            style={{ maxHeight: '300px' }}
            controls
            poster={firstVideoPoster}
          >
            <source src={firstVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative">
          <div className="text-sm sm:text-base font-medium nav-text mb-2">Meu Amigo Nietzsche</div>
          <video
            ref={video2Ref}
            className="w-full bg-black rounded object-contain"
            style={{ maxHeight: '300px' }}
            controls
            poster="/placeholder.svg"
          >
            <source src={secondVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full"></div>
          <span className="nav-text text-sm sm:text-base font-medium">Processamento Completo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-600 rounded-full"></div>
          <span className="nav-text text-sm sm:text-base font-medium">Em Andamento</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full"></div>
          <span className="nav-text text-sm sm:text-base font-medium">Erro</span>
        </div>
      </div>

    </div>
  );
};

export default VideoSection;