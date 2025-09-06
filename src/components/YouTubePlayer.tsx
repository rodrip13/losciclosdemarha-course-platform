import React, { useEffect, useRef, useState } from 'react';
import { logEvent } from '../lib/tracking';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  courseId: string;
  lessonId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, courseId, lessonId }) => {
  const playerRef = useRef<any>(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const progressTrackerRef = useRef<NodeJS.Timeout | null>(null);
  const loggedMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        setApiLoaded(true);
        return;
      }
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        window.onYouTubeIframeAPIReady = () => setApiLoaded(true);
        document.body.appendChild(tag);
      }
    };

    loadYouTubeAPI();

    return () => {
      // Cleanup interval on component unmount
      if (progressTrackerRef.current) {
        clearInterval(progressTrackerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (apiLoaded) {
      playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'rel': 0,
          'modestbranding': 1,
        },
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    }
  }, [apiLoaded, videoId]);

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      startProgressTracker();
    } else if (
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.ENDED
    ) {
      stopProgressTracker();
      // If the video ended, check for 100% milestone
      if (event.data === window.YT.PlayerState.ENDED) {
        handleProgress(100);
      }
    }
  };

  const startProgressTracker = () => {
    if (progressTrackerRef.current) clearInterval(progressTrackerRef.current);
    progressTrackerRef.current = setInterval(() => {
      const player = playerRef.current;
      if (player && typeof player.getCurrentTime === 'function') {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        if (duration > 0) {
          const progressPercent = (currentTime / duration) * 100;

          if (progressPercent >= 25) handleProgress(25);
          if (progressPercent >= 50) handleProgress(50);
          if (progressPercent >= 75) handleProgress(75);
        }
      }
    }, 2000); // Check every 2 seconds
  };

  const stopProgressTracker = () => {
    if (progressTrackerRef.current) {
      clearInterval(progressTrackerRef.current);
    }
  };

  const handleProgress = (milestone: number) => {
    if (!loggedMilestonesRef.current.has(milestone)) {
      loggedMilestonesRef.current.add(milestone);
      logEvent('VIDEO_PROGRESS', {
        course_id: courseId,
        lesson_id: lessonId,
        video_id: videoId,
        progress_percent: milestone
      });
      // If 100% is logged, stop the tracker
      if (milestone === 100) {
        stopProgressTracker();
      }
    }
  };

  return <div id={`youtube-player-${videoId}`} className="w-full h-full" />;
};

export default YouTubePlayer;
