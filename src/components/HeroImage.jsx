import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    title: "Mountain Serenity",
    credit: "Photo by Greg Rakozy"
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop",
    title: "Misty Forest",
    credit: "Photo by Vincent van Zalinge"
  },
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop",
    title: "Golden Valley",
    credit: "Photo by Michael Shannon"
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop",
    title: "Peaceful Landscape",
    credit: "Photo by Robert Lukeman"
  }
];

export default function HeroImage({ currentMonth }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % IMAGES.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="relative group rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden bg-stone-800 shadow-lg h-full">
      <div className="relative h-48 md:h-full min-h-[200px]">
        <img
          src={IMAGES[currentImage].url}
          alt={IMAGES[currentImage].title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-serif text-lg md:text-xl font-semibold drop-shadow-lg">
            {IMAGES[currentImage].title}
          </h3>
          <p className="text-white/70 text-xs hidden md:block">
            {IMAGES[currentImage].credit}
          </p>
        </div>
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
          <span className="text-stone-700 font-medium text-sm">
            {currentMonth}
          </span>
        </div>
      </div>
      
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
      >
        <ChevronLeft size={18} className="text-stone-700" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
      >
        <ChevronRight size={18} className="text-stone-700" />
      </button>
      
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              idx === currentImage ? 'bg-white w-3' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}