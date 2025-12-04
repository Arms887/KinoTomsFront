import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Slide width-ը և gap-ը responsive-ի համար
  const getSlideWidth = () => {
    if (typeof window === 'undefined') return 0;
    const viewportWidth = window.innerWidth;
    const calculatedWidth = viewportWidth * 0.7;
    // clamp(280px, 70vw, 1200px) - min 280px, max 1200px
    return Math.max(280, Math.min(1200, calculatedWidth));
  };

  const getGap = () => {
    if (typeof window === 'undefined') return 44;
    // Responsive gap: clamp(20px, 2.5vw, 44px)
    const viewportWidth = window.innerWidth;
    const calculatedGap = viewportWidth * 0.025;
    return Math.max(20, Math.min(44, calculatedGap));
  };

  const calculateTransform = () => {
    if (!wrapperRef.current || images.length === 0 || !isMounted) return 'translateX(0)';

    const slideWidth = getSlideWidth();
    const gap = getGap();
    const wrapperWidth = wrapperRef.current.offsetWidth;

    // Ստուգում ենք, թե արդյոք wrapper-ը պատրաստ է
    if (wrapperWidth === 0) return 'translateX(0)';

    // Հաշվարկում ենք, թե որքան պետք է shift անել
    // Active slide-ը պետք է լինի viewport-ի կենտրոնում
    const slideWithGap = slideWidth + gap;
    const offset = activeIndex * slideWithGap;
    const centerOffset = (wrapperWidth / 2) - (slideWidth / 2);

    return `translateX(calc(-${offset}px + ${centerOffset}px))`;
  };

  // Initial mount-ի համար - ստուգում ենք, թե արդյոք DOM-ը պատրաստ է
  useEffect(() => {
    if (images.length === 0) return;

    // Ստուգում ենք, թե արդյոք wrapper-ը պատրաստ է
    const checkMount = () => {
      if (wrapperRef.current && wrapperRef.current.offsetWidth > 0) {
        setIsMounted(true);
      } else {
        // Եթե դեռ պատրաստ չէ, փորձում ենք մի քանի անգամ
        requestAnimationFrame(() => {
          if (wrapperRef.current && wrapperRef.current.offsetWidth > 0) {
            setIsMounted(true);
          } else {
            setTimeout(checkMount, 50);
          }
        });
      }
    };

    checkMount();
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // Եթե հասել ենք վերջինին, վերադառնում ենք առաջինին
        if (prevIndex >= images.length - 2) {
          return 1;
        }
        // Հակառակ դեպքում գնում ենք հաջորդին
        return prevIndex + 1;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Window resize-ի համար և initial positioning-ի համար
  useEffect(() => {
    if (!isMounted || images.length === 0) return;

    const updateTransform = () => {
      if (trackRef.current && wrapperRef.current) {
        const slideWidth = getSlideWidth();
        const gap = getGap();
        const wrapperWidth = wrapperRef.current.offsetWidth;

        if (wrapperWidth === 0) return;

        const slideWithGap = slideWidth + gap;
        const offset = activeIndex * slideWithGap;
        const centerOffset = (wrapperWidth / 2) - (slideWidth / 2);
        trackRef.current.style.transform = `translateX(calc(-${offset}px + ${centerOffset}px))`;
      }
    };

    // Initial positioning
    updateTransform();

    // Window resize-ի համար
    const handleResize = () => {
      updateTransform();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, images.length, isMounted]);

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
                <Image src={image} alt={`Slide ${index + 1}`} width={1920} height={1080} />
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
                <div className={styles.imageSliderShadow}></div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default ImageSlider;