import { useState, useEffect, useRef } from 'react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// UI Components
import LetterModal from './components/ui/LetterModal';

// Section Components
import MemoriesCarousel from './components/sections/MemoriesCarousel';
import ApologyQuotes from './components/sections/ApologyQuotes';
import Promises from './components/sections/Promises';
import Timeline from './components/sections/Timeline';
import DraggableMediaCards from './components/sections/DraggableMediaCards';
import RatingAndReconciliationComponents from './components/sections/Retaliation';
export default function ApologyWebsite() {
  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState({});

  // Video refs
  const videoRefs = useRef({});

  // Calculate max scroll distance to prevent scrolling beyond page width
  const maxScrollDistance = typeof window !== 'undefined' ? window.innerWidth / 3 : 300;

  // Mixed media cards - videos and images
  const mediaCards = [
    {
      id: 1,
      type: 'image',
      src: "/images/precious.jpeg",
      caption: "My love"
    },
    // {
    //   id: 2,
    //   type: 'video',
    //   src: "/videos/Movie.mp4",
    //   webmSrc: "/videos/Movie.webm", // Additional format for better compatibility
    //   posterSrc: "/videos/Movie.jpg",
    //   caption: "You being You",
    //   autoplay: false,
    //   muted: false // Set to true if you want videos muted by default
    // },
    {
      id: 3,
      type: 'image',
      src: "/images/aesthetic.jpeg",
      caption: "Aesthetic at Manglore"
    },
    {
      id: 4,
      type: 'image',
      src: "/images/forum.jpeg",
      caption: "Our Food Date"
    },
    {
      id: 5,
      type: 'image',
      src: "/images/onam.jpeg",
      caption: "Onam Celebration"
    },
    // {
    //   id: 7,
    //   type: 'video',
    //   src: "/videos/demo.mp4",
    //   webmSrc: "/videos/demo.webm",
    //   posterSrc: "/images/demo.jpg",
    //   autoplay: true,
    //   muted: false
    // },
    {
      id: 6,
      type: 'image',
      src: "/images/crazy.jpeg",
      caption: "Craziness at Manglore"
    },
  ];

  // Sample images - replace with placeholder images
  const memories = [
    { id: 1, src: "/images/mcdonalds.jpeg", alt: "Our first date", caption: "Our first date at the coffee shop" },
    { id: 2, src: "/images/beach.jpeg", alt: "Beach day", caption: "That perfect day at the beach" },
    { id: 3, src: "/images/inoxmall.jpeg", alt: "Movie night", caption: "Movie night with your favorite snacks" },
    { id: 4, src: "/images/forum-outside.jpeg", alt: "Road trip", caption: "Our amazing road trip adventure" },
    { id: 5, src: "/images/zoo.jpeg", alt: "Road trip", caption: "Our amazing road trip adventure" },
    { id: 6, src: "/images/underwater.jpeg", alt: "Road trip", caption: "Our amazing road trip adventure" }
  ];

  // Apology quotes
  const quotes = [
    "I'm truly sorry for this misunderstanding between us. Please believe me when I say it won't happen again.",
    "This will be my last mistake, I promise from the bottom of my heart. I've learned my lesson.",
    "Please don't leave me. What we have is too special to throw away over one mistake.",
    "I've always been loyal and cared deeply for you. That has never changed, not for a moment.",
    "Please give me one more opportunity to make things right. I'll prove myself worthy of your trust.",
    "I'm begging you to reconsider. Our love is worth fighting for, and I'll do anything to save it.",
    "Every day without your forgiveness reminds me of how much I truly need you in my life.",
    "I was wrong, and I'm owning my mistake. Please let me show you how much you mean to me.",
    "The thought of losing you makes me realize I can't imagine a future without you by my side."
  ];

  // Timeline events
  const timeline = [
    { date: "First Date", description: "When you wore that blue dress and I knew I was falling for you" },
    { date: "First Kiss", description: "Under the stars at the lake, a moment I'll never forget" },
    { date: "Anniversary", description: "One amazing year together filled with beautiful memories" },
    { date: "The Mistake", description: "When I let you down - a moment I deeply regret" },
    { date: "Today", description: "The day I'm asking for your forgiveness and a fresh start" }
  ];

  // Promises
  const promises = [
    "To communicate better and eliminate any misunderstandings between us",
    "To prioritize your feelings and our relationship above everything else",
    "To be more attentive to your needs and the things that make you happy",
    "To prove my loyalty and dedication to you every single day",
    "To never repeat this mistake and be the partner you truly deserve"
  ];

  // Functions for draggable cards
  const handleMouseDown = (e, id) => {
    setActiveCard(id);
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setCurrentPos({ x: 0, y: 0 });
  };

  const handleTouchStart = (e, id) => {
    setActiveCard(id);
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setCurrentPos({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // Constrain the movement to max scroll distance
      const newX = e.clientX - startPos.x;
      const constrainedX = Math.max(-maxScrollDistance, Math.min(maxScrollDistance, newX));

      setCurrentPos({
        x: constrainedX,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      // Constrain the movement to max scroll distance
      const newX = e.touches[0].clientX - startPos.x;
      const constrainedX = Math.max(-maxScrollDistance, Math.min(maxScrollDistance, newX));

      setCurrentPos({
        x: constrainedX,
        y: e.touches[0].clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      // If dragged significantly, remove card
      if (Math.abs(currentPos.x) > 100) {
        // Remove card animation would happen here
        // For now, we'll just reset
        setTimeout(() => {
          setActiveCard(null);
          setIsDragging(false);
          setCurrentPos({ x: 0, y: 0 });
        }, 300);
      } else {
        // Reset if not dragged far enough
        setIsDragging(false);
        setCurrentPos({ x: 0, y: 0 });
      }
    }
  };

  const toggleVideoPlay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused || video.ended) {
        // First load the video data if needed
        if (video.readyState === 0) {
          video.load();
        }

        // Try to play the video
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log(`Video ${id} playing successfully`);
            setIsVideoPlaying(prev => ({ ...prev, [id]: true }));
          }).catch(err => {
            console.error("Could not play video:", err);
            setIsVideoPlaying(prev => ({ ...prev, [id]: false }));
          });
        }
      } else {
        video.pause();
        setIsVideoPlaying(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  // Quote card navigation
  const nextQuote = () => {
    setCurrentQuote((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  // Handle document events for dragging
  useEffect(() => {
    const handleMouseMoveDoc = (e) => {
      if (isDragging) handleMouseMove(e);
    };

    const handleTouchMoveDoc = (e) => {
      if (isDragging) handleTouchMove(e);
    };

    const handleMouseUpDoc = () => {
      if (isDragging) handleMouseUp();
    };

    const handleTouchEndDoc = () => {
      if (isDragging) handleMouseUp();
    };

    document.addEventListener('mousemove', handleMouseMoveDoc);
    document.addEventListener('mouseup', handleMouseUpDoc);
    document.addEventListener('touchmove', handleTouchMoveDoc);
    document.addEventListener('touchend', handleTouchEndDoc);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveDoc);
      document.removeEventListener('mouseup', handleMouseUpDoc);
      document.removeEventListener('touchmove', handleTouchMoveDoc);
      document.removeEventListener('touchend', handleTouchEndDoc);
    };
  }, [isDragging]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update the useEffect to handle video initialization
  useEffect(() => {
    // Initialize video playing states
    const initialVideoStates = {};
    mediaCards.forEach(card => {
      if (card.type === 'video') {
        initialVideoStates[card.id] = card.autoplay || false;

        // Set up autoplay videos
        if (card.autoplay && videoRefs.current[card.id]) {
          videoRefs.current[card.id].play().catch(e => {
            console.log("Autoplay prevented:", e);
            setIsVideoPlaying(prev => ({ ...prev, [card.id]: false }));
          });
        }
      }
    });

    setIsVideoPlaying(initialVideoStates);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 text-gray-800 font-sans overflow-x-hidden">
      <Header setShowLetter={setShowLetter} />

      <LetterModal showLetter={showLetter} setShowLetter={setShowLetter} />

      <MemoriesCarousel
        memories={memories}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />

      <DraggableMediaCards
        mediaCards={mediaCards}
        activeCard={activeCard}
        isDragging={isDragging}
        currentPos={currentPos}
        isVideoPlaying={isVideoPlaying}
        handleMouseDown={handleMouseDown}
        handleTouchStart={handleTouchStart}
        handleMouseMove={handleMouseMove}
        handleTouchMove={handleTouchMove}
        toggleVideoPlay={toggleVideoPlay}
        videoRefs={videoRefs}
      >
        {mediaCards.map(card => (
          card.type === 'video' && (
            <video
              ref={el => videoRefs.current[card.id] = el}
              poster={card.posterSrc}
              className="w-full h-full object-cover"
              playsInline // Better mobile experience
              preload="metadata" // Faster loading
            >
              <source src={card.src} type="video/mp4" />
              {card.webmSrc && <source src={card.webmSrc} type="video/webm" />}
              {card.oggSrc && <source src={card.oggSrc} type="video/ogg" />}
              Your browser does not support the video tag.
            </video>
          )
        ))}
      </DraggableMediaCards>

      <ApologyQuotes
        quotes={quotes}
        currentQuote={currentQuote}
        setCurrentQuote={setCurrentQuote}
        nextQuote={nextQuote}
        prevQuote={prevQuote}
      />

      <Promises promises={promises} />

      <Timeline timeline={timeline} />
      <RatingAndReconciliationComponents />

      <Footer />
    </div>
  );
}