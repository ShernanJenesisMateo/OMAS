import Canvas from "./Canvas";
import React, { ReactElement } from 'react';

interface Seat {
    positionX: number;
    positionY: number;
    color: string;
}

export default function Area(): ReactElement {
    const drawSeat = (context: CanvasRenderingContext2D | null, seat: Seat) => {
        if (context) {
            context.fillStyle = seat.color;
            context.fillRect(seat.positionX, seat.positionY, 100, 100); // positionX, positionY, width, height
        }
    }

    const seats: Seat[] = [
        { positionX: 250, positionY: 100, color: 'grey' },
        { positionX: 400, positionY: 200, color: 'blue' },
        { positionX: 100, positionY: 300, color: 'green' },
        // Add more seats with different colors and positions
    ];

    return (
        <Canvas
            draw={(context) => {
                seats.forEach((seat) => drawSeat(context, seat));
            }}
            width={800}
            height={600}
        />
    );
}
