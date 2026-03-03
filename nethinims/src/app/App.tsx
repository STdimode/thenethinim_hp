import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import logoImage from "figma:asset/d3dfa660310325cee08606134c09e80958cc5ca3.png";
import grainBg from "figma:asset/7ee3a1c1b67d51d420eed6c7c16d6cba00571f24.png";
import heroBg from "figma:asset/8ba4a96b8b169398f6a1cd6c3d9908506f4cd61f.png";
import gallery5 from "figma:asset/cef81393ead8ebd0bd859ed2c9947bccd128c0ec.png";

// ─── FadeUp wrapper ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Image data ─────────────────────────────────────────────────────────────
const HERO_IMAGE = "https://images.unsplash.com/photo-1653426965781-9ef7ba19fb97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwYW1iZXIlMjBhYnN0cmFjdCUyMHRleHR1cmUlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzcyNDk3Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CROSS_IMAGE = "https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBoYW5kcyUyMGhlbHBpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NzI0NDk0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const FLOWERS_IMAGE = "https://images.unsplash.com/photo-1764728671460-34931d8261f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjByZXNlYXJjaCUyMHN0dWR5fGVufDF8fHx8MTc3MjQ0OTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const PEN_IMAGE = "https://images.unsplash.com/photo-1771463268625-a465493795d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY2xvc2V1cCUyMGRlc2slMjBvcGVuJTIwcGFnZXN8ZW58MXx8fHwxNzcyNDUxODM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const GALLERY_BASE = [
  "https://images.unsplash.com/photo-1702395848595-c02f8cf931c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5saWdodCUyMHdpbmRvdyUyMHNoYWRvdyUyMHdhbGx8ZW58MXx8fHwxNzcyNDUyMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1665901277318-be8dc685c29d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBzaGFkb3clMjBtb3JuaW5nJTIwbGlnaHR8ZW58MXx8fHwxNzcyNDUyNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1584530313715-bfe628686135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFkb3clMjBsaWdodCUyMHdhbGwlMjBtaW5pbWFsfGVufDF8fHx8MTc3MjQ1MjMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1741051761238-05156721fa90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnRlcm5vb24lMjBsaWdodCUyMHNoYWRvd3xlbnwxfHx8fDE3NzI0NTIzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  gallery5,
  "https://images.unsplash.com/photo-1736066097151-41cbc89f0857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5saWdodCUyMHBhdHRlcm4lMjB3YWxsfGVufDF8fHx8MTc3MjQ1MjMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

// ─── Custom Infinite Gallery Carousel (Swiper-free) ─────────────────────────
// Strategy: triple the array, start in the middle copy.
// After each transition, silently jump back to the middle copy if we've drifted.
const GALLERY_GAP = 20;
// tripled: [copy0(0-5), copy1(6-11), copy2(12-17)]
const GALLERY_SLIDES = [...GALLERY_BASE, ...GALLERY_BASE, ...GALLERY_BASE];
const N = GALLERY_BASE.length; // 6

// ─── useIsMobile hook ───────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

function GalleryCarousel() {
  const isMobile = useIsMobile();
  const galleryVisible = isMobile ? 2 : 5;
  const galleryGap = isMobile ? 10 : GALLERY_GAP;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);
  // Start at index N (= 6) so copy1 is the first visible set
  const [idx, setIdx] = useState(N);
  const [anim, setAnim] = useState(true);
  // Keep a ref so onTransitionEnd always sees the latest idx
  const idxRef = useRef(N);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Measure slide width from container (sync, before paint)
  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const cw = containerRef.current.clientWidth;
        setSlideW((cw - galleryGap * (galleryVisible - 1)) / galleryVisible);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [galleryVisible, galleryGap]);

  // Keep ref in sync with state
  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  // Re-enable animation on the frame AFTER a silent jump
  useEffect(() => {
    if (!anim) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnim(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [anim]);

  // After each animated transition, silently jump to equivalent copy1 position
  const onTransitionEnd = useCallback(() => {
    const cur = idxRef.current;
    if (cur >= N * 2) {
      // Drifted into copy2 → jump back to copy1
      setAnim(false);
      setIdx(cur - N);
    } else if (cur < N) {
      // Drifted into copy0 → jump forward to copy1
      setAnim(false);
      setIdx(cur + N);
    }
  }, []);

  const slideNext = useCallback(() => {
    setAnim(true);
    setIdx((i) => i + 1);
  }, []);

  const slidePrev = useCallback(() => {
    setAnim(true);
    setIdx((i) => i - 1);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    setAutoplayEnabled(false);
    setAnim(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStartX;
    setDragOffset(offset);
  }, [isDragging, dragStartX]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = slideW * 0.3;
    
    if (dragOffset > threshold) {
      slidePrev();
    } else if (dragOffset < -threshold) {
      slideNext();
    } else {
      setAnim(true);
    }
    
    setDragOffset(0);
    setAutoplayEnabled(true);
  }, [isDragging, dragOffset, slideW, slideNext, slidePrev]);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) return;
    handleMouseUp();
  }, [isDragging, handleMouseUp]);

  // Autoplay
  useEffect(() => {
    if (!autoplayEnabled) return;
    const id = setInterval(slideNext, 3500);
    return () => clearInterval(id);
  }, [slideNext, autoplayEnabled]);

  const translateX = idx * (slideW + galleryGap) - dragOffset;
  // Active dot: which of the 6 base images is first visible
  const activeDot = ((idx % N) + N) % N;

  return (
    <div>
      {/* Slide track */}
      <div 
        ref={containerRef} 
        style={{ overflow: "hidden", width: "100%", cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {slideW > 0 && (
          <div
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            style={{
              display: "flex",
              gap: `${galleryGap}px`,
              transform: `translateX(-${translateX}px)`,
              transition: anim ? "transform 0.5s ease" : "none",
              willChange: "transform",
              userSelect: "none",
              pointerEvents: isDragging ? "none" : "auto",
            }}
          >
            {GALLERY_SLIDES.map((src, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: `${slideW}px`,
                  height: isMobile ? "180px" : "260px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={src}
                  alt={`gallery-${i % N}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls: ← long arrow | dots | long arrow → */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: isMobile ? "16px" : "24px",
          padding: isMobile ? "0 16px" : "0 40px",
        }}
      >
        {/* Left long arrow */}
        <button
          onClick={slidePrev}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <svg width={isMobile ? "60" : "160"} height="20" viewBox={isMobile ? "0 0 60 20" : "0 0 160 20"} fill="none">
            <line x1={isMobile ? "55" : "155"} y1="10" x2="10" y2="10" stroke="#bbb" strokeWidth="1" />
            <polyline
              points="18,3 10,10 18,17"
              stroke="#bbb"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Pagination dots */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {GALLERY_BASE.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAnim(true);
                setIdx(N + i);
              }}
              style={{
                width: activeDot === i ? "20px" : "8px",
                height: "8px",
                borderRadius: activeDot === i ? "4px" : "50%",
                backgroundColor: activeDot === i ? "#666" : "#ccc",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Right long arrow */}
        <button
          onClick={slideNext}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <svg width={isMobile ? "60" : "160"} height="20" viewBox={isMobile ? "0 0 60 20" : "0 0 160 20"} fill="none">
            <line x1="5" y1="10" x2={isMobile ? "50" : "150"} y2="10" stroke="#bbb" strokeWidth="1" />
            <polyline
              points={isMobile ? "42,3 50,10 42,17" : "142,3 150,10 142,17"}
              stroke="#bbb"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── SVG Icons ──────────────────────────────────────��────────────────────────
function IconEnvelope() {
  return (
    <svg width="43" height="43" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="24" height="16" rx="1" stroke="#555" strokeWidth="1.2" fill="none"/>
      <path d="M6 10L18 18L30 10" stroke="#555" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

function IconVision() {
  return (
    <svg width="43" height="43" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical bar */}
      <line x1="18" y1="8" x2="18" y2="28" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Horizontal bar */}
      <line x1="10" y1="18" x2="26" y2="18" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function IconGroup() {
  return (
    <svg width="43" height="43" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="13" r="4" stroke="#fff" strokeWidth="1.2" fill="none"/>
      <circle cx="24" cy="13" r="4" stroke="#fff" strokeWidth="1.2" fill="none"/>
      <path d="M4 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#fff" strokeWidth="1.2" fill="none"/>
      <path d="M16 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#fff" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

function IconDonate() {
  return (
    <svg width="43" height="43" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 28s-9-5.5-9-11c0-3.5 2.5-6 5.5-6 1.8 0 3.1.9 3.5 1.5.4-.6 1.7-1.5 3.5-1.5 3 0 5.5 2.5 5.5 6 0 5.5-9 11-9 11z" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="43" height="43" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4C13.582 4 10 7.582 10 12c0 7 8 20 8 20s8-13 8-20c0-4.418-3.582-8-8-8z" stroke="#555" strokeWidth="1.2" fill="none"/>
      <circle cx="18" cy="12" r="3" stroke="#555" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

function IconSchool() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Church building with cross on top */}
      <rect x="18" y="20" width="12" height="18" stroke="#334" strokeWidth="1.5" fill="none"/>
      <path d="M12 20L24 12L36 20V38H12V20Z" stroke="#334" strokeWidth="1.5" fill="none"/>
      <rect x="21" y="28" width="6" height="10" stroke="#334" strokeWidth="1.2" fill="none"/>
      <line x1="24" y1="6" x2="24" y2="12" stroke="#334" strokeWidth="1.5"/>
      <line x1="20" y1="9" x2="28" y2="9" stroke="#334" strokeWidth="1.5"/>
    </svg>
  );
}

function IconEvent() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Building/Company icon */}
      <rect x="10" y="14" width="10" height="24" stroke="#334" strokeWidth="1.5" fill="none"/>
      <rect x="22" y="8" width="14" height="30" stroke="#334" strokeWidth="1.5" fill="none"/>
      <rect x="13" y="18" width="2" height="2" fill="#334"/>
      <rect x="16" y="18" width="2" height="2" fill="#334"/>
      <rect x="13" y="23" width="2" height="2" fill="#334"/>
      <rect x="16" y="23" width="2" height="2" fill="#334"/>
      <rect x="13" y="28" width="2" height="2" fill="#334"/>
      <rect x="16" y="28" width="2" height="2" fill="#334"/>
      <rect x="25" y="13" width="2" height="2" fill="#334"/>
      <rect x="29" y="13" width="2" height="2" fill="#334"/>
      <rect x="25" y="18" width="2" height="2" fill="#334"/>
      <rect x="29" y="18" width="2" height="2" fill="#334"/>
      <rect x="25" y="23" width="2" height="2" fill="#334"/>
      <rect x="29" y="23" width="2" height="2" fill="#334"/>
    </svg>
  );
}

function IconTeacher() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Professional/Graduation cap with person */}
      <circle cx="24" cy="20" r="5" stroke="#334" strokeWidth="1.5" fill="none"/>
      <path d="M14 38c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#334" strokeWidth="1.5" fill="none"/>
      {/* Graduation cap */}
      <path d="M16 12L24 9L32 12L24 15L16 12Z" stroke="#334" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <line x1="32" y1="12" x2="32" y2="16" stroke="#324" strokeWidth="1.5"/>
    </svg>
  );
}

function LeafLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18C4 18 8 6 18 4C18 4 16 14 4 18Z" fill="#888" stroke="#888" strokeWidth="0.5"/>
      <path d="M4 18L11 11" stroke="#888" strokeWidth="1.2"/>
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="1" x2="22" y2="1" stroke="white" strokeWidth="2"/>
      <line x1="0" y1="8" x2="22" y2="8" stroke="white" strokeWidth="2"/>
      <line x1="0" y1="15" x2="22" y2="15" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

function IconLight() {
  return (
    <svg width="43" height="43" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center star shape only */}
      <path d="M24 14 L26 22 L34 24 L26 26 L24 34 L22 26 L14 24 L22 22 Z" fill="#fff" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [heroSlide, setHeroSlide] = useState(0);
  const isMobile = useIsMobile();

  const heroSlides = [
    { title: "느디님사람들", bg: HERO_IMAGE },
    { title: "느디님사람들", bg: HERO_IMAGE },
    { title: "느디님사람들", bg: HERO_IMAGE },
  ];

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif" }} className="min-h-screen bg-white">
      {/* Header */}
      <header style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex items-center justify-between" style={{ height: isMobile ? "60px" : "76px" }}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logoImage} alt="비영리공익법인느디님사람들" style={{ width: isMobile ? "180px" : "300px", height: "auto" }} />
          </div>
          <nav className="hidden md:flex items-center gap-20">
            {([
              { label: "느디님사람들", sub: ["느디님사람들의 부르심의 정체성", "느디님사람들의 MVC", "느디님사람들의 운영과 구조"] },
              { label: "활동안내", sub: ["활동의 가치", "공익활동", "연구활동", "교육활동", "공동예배"] },
              { label: "연대와 참여", sub: ["활동가치와 임팩트", "교회의 연대와 참여", "기업의 연대와 참여", "전문인 연대와 참여", "1365 서포터즈"] },
              { label: "기금후원", sub: ["기금후원분야", "기금후원방법", "공익디자인 프로젝트", "행정신청"] },
            ] as const).map((item) => (
              <div
                key={item.label}
                className="relative group"
                style={{ cursor: "pointer" }}
              >
                <a
                  href="#"
                  style={{ color: "white", fontSize: "20px", fontWeight: "400", whiteSpace: "nowrap", display: "block", padding: "8px 0" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </a>
                {/* Dropdown */}
                <div
                  className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  style={{
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    paddingTop: "12px",
                    zIndex: 100,
                  }}
                >
                  {/* Arrow */}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderBottom: "8px solid white",
                      margin: "0 auto",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "6px",
                      padding: "12px 0",
                      minWidth: "160px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                      textAlign: "center",
                    }}
                  >
                    {item.sub.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        style={{
                          display: "block",
                          padding: "10px 24px",
                          color: "#333",
                          fontSize: "16px",
                          whiteSpace: "nowrap",
                          transition: "background 0.15s",
                        }}
                        className="hover:bg-gray-100"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
          <button className="ml-4 cursor-pointer">
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ height: isMobile ? "480px" : "728px" }}>
        <img
          src={heroBg}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              style={{
                width: i === heroSlide ? "28px" : "10px",
                height: "10px",
                borderRadius: i === heroSlide ? "5px" : "50%",
                backgroundColor: i === heroSlide ? "white" : "rgba(255,255,255,0.55)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <FadeUp>
        <section style={{ padding: isMobile ? "40px 0 36px" : "60px 0 56px", backgroundColor: "#000" }}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-8" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "center" : "flex-start", gap: isMobile ? "28px" : "64px" }}>
            <div style={{ minWidth: isMobile ? "auto" : "260px", textAlign: isMobile ? "center" : "left" }}>
              <h2 style={{ fontSize: isMobile ? "26px" : "32px", fontWeight: "700", color: "#fff", marginBottom: "12px", fontStyle: "italic" }}>
                welcome
              </h2>
              <p style={{ fontSize: isMobile ? "15px" : "17px", color: "#ddd", lineHeight: "1.7" }}>
                환영합니다. 복음의 공공성을 고민하며 선교적 실천을{!isMobile && <br />}
                {isMobile ? " " : ""}연구하고 실행하는 선교적 교회 공동체입니다.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, auto)", gap: isMobile ? "12px" : "24px", justifyContent: isMobile ? "center" : "flex-end", flex: isMobile ? undefined : 1 }}>
              {[
                { icon: <IconLight />, label: "부르심의 정체성" },
                { icon: <IconVision />, label: "느디님 사람들의 MVC" },
                { icon: <IconGroup />, label: "운영과 구조" },
                { icon: <IconDonate />, label: "기금후원방법" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    width: isMobile ? "130px" : "150px",
                    height: isMobile ? "100px" : "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {item.icon}
                  <span style={{ fontSize: isMobile ? "13px" : "16px", color: "#fff", textAlign: "center", lineHeight: "1.3", whiteSpace: "nowrap" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Three Cards Section */}
      <section style={{ paddingTop: isMobile ? "40px" : "60px", paddingBottom: isMobile ? "40px" : "70px", backgroundColor: "white" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "20px" : "30px" }}>
            <FadeUp delay={0}>
              <div className="relative overflow-hidden" style={{ height: isMobile ? "260px" : "380px" }}>
                <img src={CROSS_IMAGE} alt="주일예배" className="w-full h-full object-cover" style={{ filter: "saturate(0.7)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 100%)" }} />
                <div className="absolute" style={{ top: isMobile ? "24px" : "32px", left: isMobile ? "24px" : "32px", right: isMobile ? "24px" : "32px" }}>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: isMobile ? "14px" : "17px", marginBottom: "8px" }}>
                    <span style={{ fontStyle: "italic", fontWeight: "300" }}>Public Interest Activities</span>
                  </p>
                  <h3 style={{ color: "white", fontSize: isMobile ? "24px" : "32px", fontWeight: "700", marginBottom: "10px" }}>공익활동</h3>
                </div>
                <div 
                  className="absolute group/arrow" 
                  style={{ bottom: "28px", right: "28px" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    className="group-hover/arrow:bg-white/50 group-hover/arrow:-translate-y-1"
                  >
                    <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="white" strokeWidth="1.2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="relative overflow-hidden" style={{ height: isMobile ? "260px" : "380px" }}>
                <img src={FLOWERS_IMAGE} alt="교회소식" className="w-full h-full object-cover" style={{ filter: "saturate(0.6)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 100%)" }} />
                <div className="absolute" style={{ top: isMobile ? "24px" : "32px", left: isMobile ? "24px" : "32px", right: isMobile ? "24px" : "32px" }}>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: isMobile ? "14px" : "17px", marginBottom: "8px" }}>
                    <span style={{ fontStyle: "italic", fontWeight: "300" }}>Research Activities</span>
                  </p>
                  <h3 style={{ color: "white", fontSize: isMobile ? "24px" : "32px", fontWeight: "700", marginBottom: "10px" }}>연구활동</h3>
                </div>
                <div 
                  className="absolute group/arrow" 
                  style={{ bottom: "28px", right: "28px" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    className="group-hover/arrow:bg-white/50 group-hover/arrow:-translate-y-1"
                  >
                    <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="white" strokeWidth="1.2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={240}>
              <div className="relative overflow-hidden" style={{ height: isMobile ? "260px" : "380px" }}>
                <img src={PEN_IMAGE} alt="주보보기" className="w-full h-full object-cover" style={{ filter: "saturate(0.7)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)" }} />
                <div className="absolute" style={{ top: isMobile ? "24px" : "32px", left: isMobile ? "24px" : "32px", right: isMobile ? "24px" : "32px" }}>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: isMobile ? "14px" : "17px", marginBottom: "8px" }}>
                    <span style={{ fontStyle: "italic", fontWeight: "300" }}>Educational Activities</span>
                  </p>
                  <h3 style={{ color: "white", fontSize: isMobile ? "24px" : "32px", fontWeight: "700", marginBottom: "10px" }}>교육활동</h3>
                </div>
                <div 
                  className="absolute group/arrow" 
                  style={{ bottom: "28px", right: "28px" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    className="group-hover/arrow:bg-white/50 group-hover/arrow:-translate-y-1"
                  >
                    <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="white" strokeWidth="1.2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Church School Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 30%, #ffffff 60%, #f0f0f0 100%)",
          padding: isMobile ? "48px 0" : "70px 0",
          position: "relative",
        }}
      >
        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${grainBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            opacity: 0.15,
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }} 
        />
        {/* Light glow effect */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.9) 0%, transparent 50%)",
            pointerEvents: "none",
          }} 
        />
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8">
          <FadeUp>
            <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "44px" }}>
              <h2 style={{ color: "#222", fontSize: isMobile ? "24px" : "32px", fontWeight: "700", marginBottom: "12px" }}>
                느디님사람들 연대와 참여
              </h2>
              <p style={{ color: "#555", fontSize: isMobile ? "14px" : "17px", lineHeight: "1.7" }}>
                그리스도의 길을 따라 교회, 기업, 전문인들과 함께 연대하여{!isMobile && <br />}
                {isMobile ? " " : ""}소외된 이들이 존엄과 소망을 회복하도록 돕습니다.
              </p>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "24px", maxWidth: "910px", margin: "0 auto" }}>
            {[
              { icon: <IconSchool />, title: "교회의 연대와 참여", desc: "예수님의 사역을 따라,\n소외된 이들을 돕는 연대의 실천", delay: 0 },
              { icon: <IconEvent />, title: "기업의 연대와 참여", desc: "기업의 자원과 전문성을 연결해\n국내외 소외 이웃을 지원하는 협력", delay: 120 },
              { icon: <IconTeacher />, title: "전문인 연대와 참여", desc: "전문가의 지식과 기술을 사역과 연결하여 세우는 연대", delay: 240 },
            ].map((item) => (
              <FadeUp key={item.title} delay={item.delay}>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: isMobile ? "30px 20px 26px" : "40px 26px 34px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    height: isMobile ? "auto" : "280px",
                  }}
                >
                  <div style={{ marginBottom: "18px", transform: "scale(1.3)", transformOrigin: "center" }}>{item.icon}</div>
                  <h3 style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: "700", color: "#222", marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ fontSize: isMobile ? "14px" : "16px", color: "#777", lineHeight: "1.6", whiteSpace: "pre-line" }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <FadeUp>
        <section style={{ padding: isMobile ? "40px 0 36px" : "60px 0 50px", backgroundColor: "white" }}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <h2
              style={{
                textAlign: "center",
                fontSize: isMobile ? "26px" : "32px",
                fontWeight: "700",
                fontStyle: "italic",
                color: "#222",
                marginBottom: isMobile ? "24px" : "32px",
              }}
            >
              gallery
            </h2>
          </div>
          <GalleryCarousel />
        </section>
      </FadeUp>

      {/* Footer */}
      <footer style={{ backgroundColor: "#111", padding: isMobile ? "40px 0 36px" : "50px 0 45px" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "center" : "flex-start", gap: isMobile ? "24px" : "0" }}>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <p style={{ color: "#aaa", fontSize: isMobile ? "15px" : "17px", marginBottom: "4px" }}>느디님사람들</p>
            
            <div style={{ width: "28px", height: "1px", backgroundColor: "#666", marginBottom: "12px", margin: isMobile ? "0 auto 12px" : "0 0 12px" }} />
            <p style={{ color: "#888", fontSize: isMobile ? "13px" : "16px", lineHeight: "1.8" }}>06739 서울시 서초구 논현로 175 신한빌딩 지하2층</p>
          </div>
          <div style={{ textAlign: isMobile ? "center" : "right" }}>
            <p style={{ color: "#666", fontSize: isMobile ? "12px" : "16px", lineHeight: "1.8" }}>
              Copyright ⓒ 2026 느디님사람들<br />
              All rights reserved. Designed by ㈜ 스데반정보.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}