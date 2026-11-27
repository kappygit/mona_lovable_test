import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";

export type VideoCarouselItem = {
  id: string;
  src: string;
  poster?: string;
  title?: string;
};

type VideoCarousel3DProps = {
  videos: VideoCarouselItem[];
  aspectRatio?: string;
};

export function VideoCarousel3D({ videos, aspectRatio = "9 / 16" }: VideoCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [blockedVideos, setBlockedVideos] = useState<Record<string, boolean>>({});
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isNarrow, setIsNarrow] = useState(false);
  const carouselRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const suppressClickUntil = useRef(0);
  const hasEntered = useRef(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const navigate = useCallback(
    (direction: number) => {
      if (videos.length < 2) return;
      setActiveIndex((index) => (index + direction + videos.length) % videos.length);
      setSoundEnabled(false);
      setTilt({ x: 0, y: 0 });
    },
    [videos.length],
  );

  const playVideo = useCallback(
    (video: VideoCarouselItem, index: number, fromInteraction = false) => {
      const element = videoRefs.current.get(video.id);
      if (!element || prefersReducedMotion || (!isInView && !fromInteraction)) return;
      element.muted = index !== activeIndex || !soundEnabled;
      void element
        .play()
        .then(() => setBlockedVideos((blocked) => ({ ...blocked, [video.id]: false })))
        .catch(() => setBlockedVideos((blocked) => ({ ...blocked, [video.id]: true })));
    },
    [activeIndex, isInView, prefersReducedMotion, soundEnabled],
  );

  useEffect(() => {
    const root = carouselRef.current;
    if (!root) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? false),
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsNarrow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    for (const [index, video] of videos.entries()) {
      const element = videoRefs.current.get(video.id);
      if (!element) continue;
      element.muted = index !== activeIndex || !soundEnabled;
      if (!isInView || prefersReducedMotion) {
        element.pause();
      } else if (element.paused) {
        playVideo(video, index);
      }
    }
  }, [activeIndex, isInView, playVideo, prefersReducedMotion, soundEnabled, videos]);

  useEffect(() => {
    if (!isInView || isHovered || isDragging || prefersReducedMotion || videos.length < 2) return;
    const interval = window.setInterval(() => navigate(1), 5000);
    return () => window.clearInterval(interval);
  }, [isDragging, isHovered, isInView, navigate, prefersReducedMotion, videos.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isInView || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isInView, navigate]);

  useEffect(() => {
    hasEntered.current = true;
  }, []);

  if (videos.length === 0) return null;

  const handleDragEnd = (info: PanInfo) => {
    setIsDragging(false);
    if (Math.abs(info.offset.x) > 5) suppressClickUntil.current = Date.now() + 300;
    if (info.offset.x < -80 || info.velocity.x < -500) navigate(1);
    else if (info.offset.x > 80 || info.velocity.x > 500) navigate(-1);
  };

  const handleCardClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
    if (Date.now() < suppressClickUntil.current) {
      event.preventDefault();
      return;
    }
    if (index !== activeIndex) {
      setActiveIndex(index);
      setSoundEnabled(false);
      setTilt({ x: 0, y: 0 });
    }
  };

  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isDragging) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: y * -16, y: x * 16 });
  };

  return (
    <section
      ref={carouselRef}
      className="mx-auto w-full max-w-6xl px-4"
      aria-label="Video highlights"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
    >
      <div
        className="relative mx-auto h-[min(145vw,590px)] min-h-[390px] max-w-5xl touch-pan-y select-none [perspective:1200px]"
        style={{ touchAction: "pan-y" }}
      >
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_event, info) => handleDragEnd(info)}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {videos.map((video, index) => {
            let position = (index - activeIndex + videos.length) % videos.length;
            if (position > videos.length / 2) position -= videos.length;
            const isCenter = position === 0;
            const isVisible = Math.abs(position) <= 1;
            const isBlocked = blockedVideos[video.id] ?? false;
            const entranceDelay = hasEntered.current ? 0 : Math.abs(position) * 0.15;

            return (
              <motion.div
                key={video.id}
                className="absolute left-1/2 top-1/2 w-[min(72vw,320px)] [transform-style:preserve-3d] will-change-transform"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.72, x: position * 34, y: 0 }
                }
                animate={{
                  opacity: isVisible ? (isCenter ? 1 : 0.6) : 0,
                  scale: isCenter ? 1 : 0.85,
                  x: position * (isNarrow ? 170 : 250),
                  y: 0,
                  rotateX: isCenter ? tilt.x : 0,
                  rotateY: isCenter ? tilt.y : position < 0 ? 35 : -35,
                  z: isCenter ? 0 : -150,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        delay: entranceDelay,
                      }
                }
                style={{
                  zIndex: isCenter ? 3 : 2,
                  aspectRatio,
                  pointerEvents: isVisible ? "auto" : "none",
                  filter: isCenter ? "blur(0px)" : "blur(1.25px)",
                  translate: "-50% -50%",
                }}
                onClick={(event) => handleCardClick(event, index)}
                onMouseMove={isCenter ? handleTilt : undefined}
                role={isCenter ? undefined : "button"}
                tabIndex={isCenter ? undefined : 0}
                aria-label={isCenter ? undefined : `Show ${video.title ?? "video"} in the center`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                    setSoundEnabled(false);
                  }
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-foreground shadow-card">
                  <video
                    ref={(element) => {
                      if (element) videoRefs.current.set(video.id, element);
                      else videoRefs.current.delete(video.id);
                    }}
                    src={video.src}
                    poster={video.poster}
                    autoPlay={isInView && !prefersReducedMotion}
                    muted={!isCenter || !soundEnabled}
                    loop
                    playsInline
                    preload={prefersReducedMotion ? "auto" : "metadata"}
                    className="h-full w-full object-cover"
                    aria-label={video.title ?? "Carousel video"}
                    onLoadedData={(event) => {
                      if (prefersReducedMotion) event.currentTarget.pause();
                    }}
                    onPlaying={() => {
                      setBlockedVideos((blocked) => ({ ...blocked, [video.id]: false }));
                    }}
                    onError={() => {
                      setBlockedVideos((blocked) => ({ ...blocked, [video.id]: true }));
                    }}
                  />
                  {video.title && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-6 pt-16 text-white">
                      <p className="font-display text-xl">{video.title}</p>
                    </div>
                  )}
                  {isBlocked && !prefersReducedMotion && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        playVideo(video, index, true);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/35 text-white"
                      aria-label={`Play ${video.title ?? "video"}`}
                    >
                      {video.poster && (
                        <img
                          src={video.poster}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-black/55 backdrop-blur-sm">
                        <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
                      </span>
                    </button>
                  )}
                  {prefersReducedMotion && video.poster && (
                    <img
                      src={video.poster}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  {isCenter && !prefersReducedMotion && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSoundEnabled((enabled) => !enabled);
                      }}
                      className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
                      aria-label={soundEnabled ? "Mute video" : "Unmute video"}
                      aria-pressed={soundEnabled}
                    >
                      {soundEnabled ? (
                        <Volume2 className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <VolumeX className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {videos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Previous video"
              className="absolute top-1/2 left-2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-card transition-colors hover:bg-secondary sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Next video"
              className="absolute top-1/2 right-2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-card transition-colors hover:bg-secondary sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {videos.length > 1 && (
        <div className="mt-4 flex justify-center gap-2" aria-label="Choose a video">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setSoundEnabled(false);
              }}
              aria-label={`Go to video ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
