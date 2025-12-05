import React, { useState, useRef, useEffect } from 'react';
import { Armchair, X } from 'lucide-react';
import styles from "./cinemaSchema.module.scss"
export interface RowConfig {
  row: number;
  seats: number;
  price: number;
  vip?: boolean;
  aisles?: number[];
}

export interface BalconyConfig {
  id: string; // 'balcony', 'amphitheater' և այլն
  name: string; // 'Ամֆիթատրոն', 'Պատշգամբ' և այլն
  rows: RowConfig[];
  disabledSeats: string[];
  occupiedSeats: string[];
}

export interface CinemaConfig {
  name: string;
  balconies?: BalconyConfig[];
  rows: RowConfig[];
  disabledSeats: string[];
  occupiedSeats: string[];
}

interface CinemaSeatPickerProps {
  config: CinemaConfig;
  onSeatsSelect?: (seats: string[], totalPrice: number) => void;
  onBookingComplete?: (seats: string[], totalPrice: number) => void;
  isModal?: boolean; // New prop to indicate if it's inside a modal
}

export const CinemaSeatPicker: React.FC<CinemaSeatPickerProps> = ({ 
  config, 
  onSeatsSelect,
  onBookingComplete,
  isModal = false
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Zoom and Pan state
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const seatingAreaRef = useRef<HTMLDivElement>(null);
  const seatingGridRef = useRef<HTMLDivElement>(null);

  const getSeatStatus = (rowNum: number, seatNum: number, balconyId?: string): string => {
    const seatId = `${rowNum}-${seatNum}`;
    
    const disabledSeats = balconyId 
      ? config.balconies?.find(b => b.id === balconyId)?.disabledSeats || []
      : config.disabledSeats;
    const occupiedSeats = balconyId
      ? config.balconies?.find(b => b.id === balconyId)?.occupiedSeats || []
      : config.occupiedSeats;
    
    if (disabledSeats.includes(seatId)) return 'disabled';
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(balconyId ? `${balconyId}:${seatId}` : seatId)) return 'selected';
    return 'available';
  };

  const handleSeatClick = (rowNum: number, seatNum: number, status: string, balconyId?: string, balconyName?: string) => {
    if (status === 'disabled' || status === 'occupied') return;
    
    const seatId = `${rowNum}-${seatNum}`;
    const fullSeatId = balconyId ? `${balconyId}:${seatId}` : seatId;
    let newSelectedSeats: string[];
    
    if (selectedSeats.includes(fullSeatId)) {
      newSelectedSeats = selectedSeats.filter(s => s !== fullSeatId);
    } else {
      newSelectedSeats = [...selectedSeats, fullSeatId];
    }
    
    setSelectedSeats(newSelectedSeats);
    
    if (onSeatsSelect) {
      const totalPrice = calculateTotalPrice(newSelectedSeats);
      onSeatsSelect(newSelectedSeats, totalPrice);
    }
  };

  const getSeatPrice = (rowNum: number, balconyId?: string): number => {
    const rows = balconyId
      ? config.balconies?.find(b => b.id === balconyId)?.rows || []
      : config.rows;
    const row = rows.find(r => r.row === rowNum);
    return row?.price || 0;
  };

  const calculateTotalPrice = (seats: string[]): number => {
    return seats.reduce((total, fullSeatId) => {
      if (fullSeatId.includes(':')) {
        const [balconyId, seatId] = fullSeatId.split(':');
        const rowNum = parseInt(seatId.split('-')[0]);
        return total + getSeatPrice(rowNum, balconyId);
      } else {
        const rowNum = parseInt(fullSeatId.split('-')[0]);
        return total + getSeatPrice(rowNum);
      }
    }, 0);
  };

  const getTotalPrice = (): number => {
    return calculateTotalPrice(selectedSeats);
  };

  const getSeatClassName = (status: string, isVip?: boolean): string => {
    const baseClass = styles.seat;
    const statusClass = 
      status === 'disabled' ? styles.seatDisabled :
      status === 'occupied' ? styles.seatOccupied :
      status === 'selected' ? styles.seatSelected :
      isVip ? styles.seatVip :
      styles.seatAvailable;
    
    return `${baseClass} ${statusClass}`;
  };

  const handleBooking = () => {
    if (onBookingComplete) {
      onBookingComplete(selectedSeats, getTotalPrice());
    }
  };

  const getDisplaySeatId = (fullSeatId: string): string => {
    if (fullSeatId.includes(':')) {
      const [balconyId, seatId] = fullSeatId.split(':');
      const balcony = config.balconies?.find(b => b.id === balconyId);
      return balcony ? `${balcony.name} ${seatId}` : seatId;
    }
    return fullSeatId;
  };

  // Zoom handlers - using native event listener to avoid passive mode
  useEffect(() => {
    const seatingArea = seatingAreaRef.current;
    if (!seatingArea) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      setZoom(prevZoom => {
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        return Math.min(Math.max(0.5, prevZoom + delta), 3);
      });
    };

    // Add non-passive event listener
    seatingArea.addEventListener('wheel', handleWheelNative, { passive: false });
    
    return () => {
      seatingArea.removeEventListener('wheel', handleWheelNative);
    };
  }, []);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Reset zoom and pan
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };
  const containerClass = isModal ? styles.modalContainer : styles.fullScreenContainer;
  const titleClass = isModal ? styles.modalTitle : styles.title;
  const cinemaNameClass = isModal ? styles.modalCinemaName : styles.cinemaName;

  return (
    <div className={containerClass}>
      {!isModal && (
        <h1 className={titleClass}>Ընտրեք նստատեղը</h1>
      )}
      
      <div className={cinemaNameClass}>{config.name}</div>

      {/* Միացված նստատեղերի քարտեզ - Բալկոններ և Հիմնական դահլիճ */}
      <div className={styles.seatingAreaWrapper}>
        <div className={styles.zoomControls}>
          <button onClick={handleReset} className={styles.resetButton} title="Վերականգնել">
            ↻
          </button>
          <div className={styles.zoomInfo}>
            {Math.round(zoom * 100)}%
          </div>
        </div>
        <div 
          ref={seatingAreaRef}
          className={styles.seatingArea}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div 
            ref={seatingGridRef}
            className={styles.seatingGrid}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            {/* Ամֆիթատրոն / Պատշգամբ */}
            {config.balconies && config.balconies.length > 0 && (
              <>
                {config.balconies.map((balcony, idx) => (
                  <React.Fragment key={idx}>
                    <div className={styles.balconyTitleInline}>
                      {balcony.name}
                    </div>
                    {balcony.rows.map((rowConfig) => (
                      <div key={`${balcony.id}-${rowConfig.row}`} className={styles.row}>
                        <span className={styles.rowLabel}>{rowConfig.row}</span>
                        
                        <div className={styles.seatsContainer}>
                          {Array.from({ length: rowConfig.seats }, (_, i) => {
                            const seatNum = i + 1;
                            const isAisle = rowConfig.aisles?.includes(seatNum) || false;
                            const status = getSeatStatus(rowConfig.row, seatNum, balcony.id);
                            
                            return (
                              <React.Fragment key={seatNum}>
                                <div
                                  onClick={() => handleSeatClick(rowConfig.row, seatNum, status, balcony.id, balcony.name)}
                                  className={getSeatClassName(status, rowConfig.vip)}
                                  title={`${balcony.name} ${rowConfig.row}-${seatNum} - ${rowConfig.price} ֏`}
                                >
                                  {status === 'disabled' ? (
                                    <X className={styles.seatIcon} />
                                  ) : (
                                    <Armchair className={styles.seatIcon} />
                                  )}
                                </div>
                                {isAisle && <div className={styles.aisle}></div>}
                              </React.Fragment>
                            );
                          })}
                        </div>

                        <span className={styles.rowLabel}>{rowConfig.row}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
                {/* Spacing between balconies and main hall */}
                <div className={styles.spacingDivider}></div>
              </>
            )}

            {/* Հիմնական դահլիճի նստատեղեր */}
            {config.rows.length > 0 && (
              <>
                <div className={styles.mainHallTitle}>
                  Հիմնական դահլիճ
                </div>
                {config.rows.map((rowConfig) => (
                  <div key={rowConfig.row} className={styles.row}>
                    <span className={styles.rowLabel}>{rowConfig.row}</span>
                    
                    <div className={styles.seatsContainer}>
                      {Array.from({ length: rowConfig.seats }, (_, i) => {
                        const seatNum = i + 1;
                        const isAisle = rowConfig.aisles?.includes(seatNum) || false;
                        const status = getSeatStatus(rowConfig.row, seatNum);
                        
                        return (
                          <React.Fragment key={seatNum}>
                            <div
                              onClick={() => handleSeatClick(rowConfig.row, seatNum, status)}
                              className={getSeatClassName(status, rowConfig.vip)}
                              title={`${rowConfig.row}-${seatNum} - ${rowConfig.price} ֏`}
                            >
                              {status === 'disabled' ? (
                                <X className={styles.seatIcon} />
                              ) : (
                                <Armchair className={styles.seatIcon} />
                              )}
                            </div>
                            {isAisle && <div className={styles.aisle}></div>}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <span className={styles.rowLabel}>{rowConfig.row}</span>
                  </div>
                ))}
              </>
            )}

            {/* Էկրան */}
            <div className={styles.screenSectionInline}>
              <div className={styles.screenInline}></div>
              <p className={styles.screenLabelInline}>ԷԿՐԱՆ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Լեգենդա */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendIcon} ${styles.legendAvailable}`}></div>
          <span>Հասանելի</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendIcon} ${styles.legendVip}`}></div>
          <span>VIP</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendIcon} ${styles.legendSelected}`}></div>
          <span>Ընտրված</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendIcon} ${styles.legendOccupied}`}></div>
          <span>Զբաղված</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendIcon} ${styles.legendDisabled}`}></div>
          <span>Անհասանելի</span>
        </div>
      </div>

      {/* Ընտրված տեղերի ինֆո */}
      {selectedSeats.length > 0 && (
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Ձեր ընտրությունը</h3>
          <div className={styles.selectedSeats}>
            {selectedSeats.map(seat => (
              <span key={seat} className={styles.selectedSeatBadge}>
                {getDisplaySeatId(seat)}
              </span>
            ))}
          </div>
          <div className={styles.summaryFooter}>
            <span className={styles.summaryCount}>
              Ընդհանուր: <span className={styles.bold}>{selectedSeats.length}</span> տեղ
            </span>
            <span className={styles.summaryPrice}>
              {getTotalPrice().toLocaleString()} ֏
            </span>
          </div>
          {!isModal && (
            <button 
              onClick={handleBooking} 
              className={styles.bookButton}
            >
              Գնել տոմսերը
            </button>
          )}
        </div>
      )}
    </div>
  );
};