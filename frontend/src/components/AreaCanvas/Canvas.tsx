import React, { FC, useRef } from 'react';
import useCanvas from './UseCanvas';

interface CanvasProps {
    draw: (context: CanvasRenderingContext2D | null) => void;
    width: number;
    height: number;
    // Add other props here if needed
}

const Canvas: FC<CanvasProps> = ({ draw, ...rest }) => {
    const ref = useCanvas(draw);

    return <canvas ref={ref} {...rest} />
}

export default Canvas;
