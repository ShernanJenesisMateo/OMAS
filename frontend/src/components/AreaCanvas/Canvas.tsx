import React, { FC, useRef } from 'react';
import useCanvas from './UseCanvas';

interface CanvasProps {
    draw: (context: CanvasRenderingContext2D | null) => void;
    width: number;
    height: number;
    canvasStyle?: React.CSSProperties;
    // Add other props here if needed
}

const Canvas: FC<CanvasProps> = ({ draw,canvasStyle, ...rest }) => {
    const ref = useCanvas(draw);

    return <canvas ref={ref} style={canvasStyle} {...rest} />
}

export default Canvas;
