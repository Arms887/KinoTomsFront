import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './carousel.module.scss';
import { PinkButton } from '../ui/pinkButton';

interface SlideButton {
  text?: string;
  onClick?: () => void;
}

interface ImageSliderProps {
  images: string[];
  buttons?: SlideButton[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, buttons }) => {
  const t = useTranslations('Carousel');
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Slide width-ը և gap-ը responsive-ի համար
  const getSlideWidth = () => {
    if (typeof window === 'undefined') return 0;
    return window.innerWidth * 0.8;
  };

  const getGap = () => {
    return 44; // Fixed gap 44px
  };

  const calculateTransform = () => {
    if (!wrapperRef.current || images.length === 0) return 'translateX(0)';
    
    const slideWidth = getSlideWidth();
    const gap = getGap();
    const wrapperWidth = wrapperRef.current.offsetWidth;
    
    // Հաշվարկում ենք, թե որքան պետք է shift անել
    // Active slide-ը պետք է լինի viewport-ի կենտրոնում
    const slideWithGap = slideWidth + gap;
    const offset = activeIndex * slideWithGap;
    const centerOffset = (wrapperWidth / 2) - (slideWidth / 2);
    
    return `translateX(calc(-${offset}px + ${centerOffset}px))`;
  };

  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // Եթե հասել ենք վերջինին, վերադառնում ենք առաջինին
        if (prevIndex >= images.length - 1) {
          return 0;
        }
        // Հակառակ դեպքում գնում ենք հաջորդին
        return prevIndex + 1;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Window resize-ի համար
  useEffect(() => {
    const handleResize = () => {
      // Force re-render to recalculate transform
      if (trackRef.current && wrapperRef.current && images.length > 0) {
        const slideWidth = getSlideWidth();
        const gap = getGap();
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const slideWithGap = slideWidth + gap;
        const offset = activeIndex * slideWithGap;
        const centerOffset = (wrapperWidth / 2) - (slideWidth / 2);
        trackRef.current.style.transform = `translateX(calc(-${offset}px + ${centerOffset}px))`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, images.length]);

  const handleSlideClick = (index: number) => {
    if (index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div ref={wrapperRef} className={styles.sliderWrapper}>
        <div 
          ref={trackRef}
          className={styles.sliderTrack}
          style={{
            transform: calculateTransform(),
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {images.map((image, index) => {
            const button = buttons && buttons[index] ? buttons[index] : null;
            
            return (
              <div
                key={index}
                className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
                onClick={() => handleSlideClick(index)}
              >
                <img src={image} alt={`Slide ${index + 1}`} />
                <div className={styles.slideButton}>
                  <PinkButton 
                    width="100%"
                    height={40}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (button?.onClick) {
                        button.onClick();
                      }
                    }}
                    className={styles.responsiveButton}
                  >
                    {button?.text || t('getTicket')}
                  </PinkButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;