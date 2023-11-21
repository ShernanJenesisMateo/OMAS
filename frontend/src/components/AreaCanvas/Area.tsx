import Canvas from './Canvas';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

interface Seat {
    positionX: number;
    positionY: number;
    color: string;
}

export default function Area(): ReactElement {
    // const drawSeat = (context: CanvasRenderingContext2D | null, seat: Seat) => {
    //     if (context) {
    //         context.fillStyle = seat.color;
    //         context.fillRect(seat.positionX, seat.positionY, 100, 100);
    //     }
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isPanning) {
            const offsetX = e.clientX - panStart.x;
            const offsetY = e.clientY - panStart.y;
            setPanOffset({ x: panOffset.x + offsetX, y: panOffset.y + offsetY });
            setPanStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const drawSeat = (context: CanvasRenderingContext2D | null, seat: Seat) => {
        if (context) {
            context.fillStyle = seat.color;
            context.fillRect(seat.positionX + panOffset.x, seat.positionY + panOffset.y, 100, 100);
        }
    };


    const seats: Seat[] = [
        // COLUMN 1
        { positionX: 10, positionY: 10, color: 'yellow' },
        { positionX: 10, positionY: 110, color: 'blue' },
        { positionX: 10, positionY: 210, color: 'green' },
        { positionX: 10, positionY: 310, color: 'yellow' },
        { positionX: 10, positionY: 410, color: 'blue' },
        { positionX: 10, positionY: 510, color: 'green' },

        // COLUMN 2
        { positionX: 410, positionY: 10, color: 'yellow' },
        { positionX: 410, positionY: 110, color: 'blue' },
        { positionX: 410, positionY: 210, color: 'green' },
        { positionX: 410, positionY: 310, color: 'yellow' },
        { positionX: 410, positionY: 410, color: 'blue' },
        { positionX: 410, positionY: 510, color: 'green' },

        // COLUMN 3
        { positionX: 810, positionY: 10, color: 'yellow' },
        { positionX: 810, positionY: 110, color: 'blue' },
        { positionX: 810, positionY: 210, color: 'green' },
        { positionX: 810, positionY: 310, color: 'yellow' },
        { positionX: 810, positionY: 410, color: 'blue' },
        { positionX: 810, positionY: 510, color: 'green' },

        // COLUMN 4
        { positionX: 1210, positionY: 10, color: 'yellow' },
        { positionX: 1210, positionY: 110, color: 'blue' },
        { positionX: 1210, positionY: 210, color: 'green' },
        { positionX: 1210, positionY: 310, color: 'yellow' },
        { positionX: 1210, positionY: 410, color: 'blue' },
        { positionX: 1210, positionY: 510, color: 'green' },

        // COLUMN 5
        { positionX: 1610, positionY: 10, color: 'yellow' },
        { positionX: 1610, positionY: 110, color: 'blue' },
        { positionX: 1610, positionY: 210, color: 'green' },
        { positionX: 1610, positionY: 310, color: 'yellow' },
        { positionX: 1610, positionY: 410, color: 'blue' },
        { positionX: 1610, positionY: 510, color: 'green' },

        // Add more seats with different colors and positions
    ];

    const canvasStyle: React.CSSProperties = {
        backgroundColor: '#CBCEC7',
        overflow: 'auto',
        margin: '100px',
        padding: 0,
    };



    return (
        <div style={{ height: '98vh', width: '100vw', border: '2px solid blue', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: '20px', marginTop: '5px' }}>
            <Link to='/calendar' style={{ textDecoration: 'none' }}>
                <button style={{ height: '50px', width: '100px' }}>
                    Go to calendar
                </button>
            </Link>


            <Canvas
                draw={(context) => {
                    seats.forEach((seat) => drawSeat(context, seat));
                }}
                width={1600}
                height={900}
                canvasStyle={canvasStyle}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />


        </div>

    );

}
