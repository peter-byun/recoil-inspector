import { RectClipPath } from '@visx/clip-path';
import { Zoom } from '@visx/zoom';
import { Button } from '../../../base/button/Button';

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0,
};

interface ZoomContainerProps {
  children: React.ReactNode;
  childrenOutsideOfSvg?: React.ReactNode;
  width: number;
  height: number;
}

export const ZoomContainer = ({
  children,
  childrenOutsideOfSvg,
  width,
  height,
}: ZoomContainerProps) => {
  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1 / 2}
      scaleXMax={4}
      scaleYMin={1 / 2}
      scaleYMax={4}
      initialTransformMatrix={initialTransform}
    >
      {(zoom) => (
        <div
          style={{
            position: 'relative',
          }}
        >
          {childrenOutsideOfSvg}

          <svg
            width={width}
            height={height}
            style={{
              cursor: zoom.isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
              backgroundColor: '#272b4d',
              borderRadius: '14px',
            }}
            ref={zoom.containerRef}
          >
            <RectClipPath id="zoom-clip" width={width} height={height} />

            <rect
              width={width}
              height={height}
              rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
            />
            <g transform={zoom.toString()}>{children}</g>
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
            }}
          >
            <Button
              onClick={zoom.center}
              style={{
                width: '50',
                height: '20',
              }}
            >
              Center
            </Button>
            <Button
              onClick={zoom.reset}
              style={{
                width: '50',
                height: '20',
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </Zoom>
  );
};
