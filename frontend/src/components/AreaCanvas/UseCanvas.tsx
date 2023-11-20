import { useEffect, useRef } from 'react';

const useCanvas = (drawSeat: (context: CanvasRenderingContext2D | null) => void) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawSeat(context);
    }, [drawSeat]);

    return ref;
}

export default useCanvas;
