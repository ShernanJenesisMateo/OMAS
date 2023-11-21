import React, { FC } from 'react';
import useCanvas from './UseCanvas';

interface CanvasProps {
    draw: (context: CanvasRenderingContext2D | null) => void;
    width: number;
    height: number;
    canvasStyle?: React.CSSProperties;
    onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseUp: () => void;
    // Add other props here if needed
}

const Canvas: FC<CanvasProps> = ({ draw, canvasStyle, onMouseDown, onMouseMove, onMouseUp, ...rest }) => {
    const ref = useCanvas(draw);

    return <canvas
        ref={ref}
        style={canvasStyle}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        {...rest} />;
};

export default Canvas;
