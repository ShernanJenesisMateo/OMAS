import Canvas from './Canvas';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

interface Seat {
    seatID: number;
    positionX: number;
    positionY: number;
    color: string;
}
interface Divider {
    positionX: number;
    positionY: number;
    length: number;
    color: string;
}


export default function Area(): ReactElement {

    // for panning
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

    // for zoom
    const [scale, setScale] = useState(1);

    // for limiting the user panning
    const canvasWidth = 3800;
    const canvasHeight = 1900;
    const minX = -(canvasWidth * scale) + window.innerWidth;
    const minY = -(canvasHeight * scale) + window.innerHeight;
    const maxX = 0;
    const maxY = 0;


    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isPanning) {
            const offsetX = e.clientX - panStart.x;
            const offsetY = e.clientY - panStart.y;

            let newPanOffsetX = panOffset.x + offsetX;
            let newPanOffsetY = panOffset.y + offsetY;

            // Limit panning within boundaries
            newPanOffsetX = Math.min(Math.max(newPanOffsetX, minX), maxX);
            newPanOffsetY = Math.min(Math.max(newPanOffsetY, minY), maxY);

            setPanOffset({ x: newPanOffsetX, y: newPanOffsetY });
            setPanStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const zoomIn = () => {
        setScale(scale * 1.2); // Increase scale by 20%
    };

    const zoomOut = () => {
        setScale(scale / 1.2); // Decrease scale by 20%
    };

    const drawSeat = (context: CanvasRenderingContext2D | null, seat: Seat) => {
        if (context) {
            context.fillStyle = seat.color;
            context.fillRect(seat.positionX * scale + panOffset.x, seat.positionY * scale + panOffset.y, 100 * scale, 100 * scale);
        }
    };

    const drawDivider = (context: CanvasRenderingContext2D | null, divider: Divider) => {
        if (context) {
            context.fillStyle = divider.color;
            context.fillRect(divider.positionX * scale + panOffset.x, divider.positionY * scale + panOffset.y, 10 * scale, divider.length * scale);
        }
    };

    const seats: Seat[] = [
        { seatID: 1, positionX: 100, positionY: 100, color: '#4000ff' },
        { seatID: 2, positionX: 100, positionY: 200, color: '#ff005a' },
        { seatID: 3, positionX: 100, positionY: 300, color: '#3cff00' },
        { seatID: 4, positionX: 100, positionY: 800, color: '#d8000c' },
        { seatID: 5, positionX: 100, positionY: 1000, color: '#8c00e6' },
        { seatID: 6, positionX: 100, positionY: 1100, color: '#3500c3' },
        { seatID: 7, positionX: 100, positionY: 1200, color: '#00c399' },
        { seatID: 8, positionX: 230, positionY: 100, color: '#00c399' },
        { seatID: 9, positionX: 230, positionY: 200, color: '#00c399' },
        { seatID: 10, positionX: 230, positionY: 300, color: '#ff005a' },
        { seatID: 11, positionX: 460, positionY: 100, color: '#00c399' },
        { seatID: 12, positionX: 460, positionY: 200, color: '#3500c3' },
        { seatID: 13, positionX: 460, positionY: 300, color: '#d8000c' },
        { seatID: 14, positionX: 590, positionY: 100, color: '#3500c3' },
        { seatID: 15, positionX: 590, positionY: 200, color: '#3cff00' },
        { seatID: 16, positionX: 590, positionY: 300, color: '#4000ff' },
        { seatID: 17, positionX: 590, positionY: 400, color: '#ff005a' },
        { seatID: 18, positionX: 590, positionY: 500, color: '#8c00e6' },
        { seatID: 19, positionX: 590, positionY: 600, color: '#8c00e6' },
        { seatID: 20, positionX: 590, positionY: 700, color: '#d8000c' },
        { seatID: 21, positionX: 820, positionY: 100, color: '#ff005a' },
        { seatID: 22, positionX: 820, positionY: 200, color: '#4000ff' },
        { seatID: 23, positionX: 820, positionY: 300, color: '#ff005a' },
        { seatID: 24, positionX: 820, positionY: 400, color: '#ff005a' },
        { seatID: 25, positionX: 820, positionY: 500, color: '#ff005a' },
        { seatID: 26, positionX: 820, positionY: 600, color: '#3cff00' },
        { seatID: 27, positionX: 820, positionY: 700, color: '#8c00e6' },
        { seatID: 28, positionX: 820, positionY: 800, color: '#8c00e6' },
        { seatID: 29, positionX: 950, positionY: 100, color: '#3500c3' },
        { seatID: 30, positionX: 950, positionY: 200, color: '#00c399' },
        { seatID: 31, positionX: 950, positionY: 300, color: '#ff005a' },
        { seatID: 32, positionX: 950, positionY: 400, color: '#8c00e6' },
        { seatID: 33, positionX: 950, positionY: 500, color: '#8c00e6' },
        { seatID: 34, positionX: 950, positionY: 600, color: '#00c399' },
        { seatID: 35, positionX: 950, positionY: 700, color: '#00c399' },
        { seatID: 36, positionX: 950, positionY: 800, color: '#ff005a' },
        { seatID: 37, positionX: 950, positionY: 900, color: '#3500c3' },
        { seatID: 38, positionX: 1180, positionY: 100, color: '#3500c3' },
        { seatID: 39, positionX: 1180, positionY: 200, color: '#00c399' },
        { seatID: 40, positionX: 1180, positionY: 300, color: '#4000ff' },
        { seatID: 41, positionX: 1180, positionY: 400, color: '#3500c3' },
        { seatID: 42, positionX: 1180, positionY: 500, color: '#00c399' },
        { seatID: 43, positionX: 1180, positionY: 600, color: '#4000ff' },
        { seatID: 44, positionX: 1180, positionY: 700, color: '#d8000c' },
        { seatID: 45, positionX: 1180, positionY: 800, color: '#3500c3' },
        { seatID: 46, positionX: 1310, positionY: 100, color: '#00c399' },
        { seatID: 47, positionX: 1310, positionY: 200, color: '#8c00e6' },
        { seatID: 48, positionX: 1310, positionY: 300, color: '#3cff00' },
        { seatID: 49, positionX: 1310, positionY: 400, color: '#00c399' },
        { seatID: 50, positionX: 1310, positionY: 500, color: '#3500c3' },
        { seatID: 51, positionX: 1310, positionY: 600, color: '#4000ff' },
        { seatID: 52, positionX: 1310, positionY: 700, color: '#ff005a' },
        { seatID: 53, positionX: 1310, positionY: 800, color: '#3cff00' },
        { seatID: 54, positionX: 1540, positionY: 100, color: '#8c00e6' },
        { seatID: 55, positionX: 1540, positionY: 200, color: '#4000ff' },
        { seatID: 56, positionX: 1540, positionY: 300, color: '#ff005a' },
        { seatID: 57, positionX: 1540, positionY: 400, color: '#3cff00' },
        { seatID: 58, positionX: 1540, positionY: 500, color: '#3500c3' },
        { seatID: 59, positionX: 1540, positionY: 600, color: '#00c399' },
        { seatID: 60, positionX: 1670, positionY: 100, color: '#ff005a' },
        { seatID: 61, positionX: 1670, positionY: 200, color: '#00c399' },
        { seatID: 62, positionX: 1670, positionY: 300, color: '#3cff00' },
        { seatID: 63, positionX: 1670, positionY: 400, color: '#ff005a' },
        { seatID: 64, positionX: 1670, positionY: 500, color: '#00c399' },
        { seatID: 65, positionX: 1670, positionY: 600, color: '#00c399' },
        { seatID: 66, positionX: 1900, positionY: 100, color: '#00c399' },
        { seatID: 67, positionX: 1900, positionY: 200, color: '#3500c3' },
        { seatID: 68, positionX: 1900, positionY: 300, color: '#4000ff' },
        { seatID: 69, positionX: 1900, positionY: 400, color: '#3cff00' },
        { seatID: 70, positionX: 1900, positionY: 500, color: '#3500c3' },
        { seatID: 71, positionX: 2030, positionY: 100, color: '#8c00e6' },
        { seatID: 72, positionX: 2030, positionY: 200, color: '#3cff00' },
        { seatID: 73, positionX: 2030, positionY: 300, color: '#4000ff' },
        { seatID: 74, positionX: 2030, positionY: 400, color: '#ff005a' },
        { seatID: 75, positionX: 2030, positionY: 500, color: '#00c399' },
        { seatID: 76, positionX: 2260, positionY: 100, color: '#3cff00' },
        { seatID: 77, positionX: 2260, positionY: 200, color: '#ff005a' },
        { seatID: 78, positionX: 2260, positionY: 300, color: '#ff005a' },
        { seatID: 79, positionX: 2260, positionY: 400, color: '#3cff00' },
        { seatID: 80, positionX: 2390, positionY: 100, color: '#ff005a' },
        { seatID: 81, positionX: 2390, positionY: 200, color: '#ff005a' },
        { seatID: 82, positionX: 2390, positionY: 300, color: '#ff005a' },
        { seatID: 83, positionX: 2390, positionY: 400, color: '#4000ff' },
        { seatID: 84, positionX: 2620, positionY: 100, color: '#3500c3' },
        { seatID: 85, positionX: 2620, positionY: 200, color: '#ff005a' }

        // Add more seats with different colors and positions
    ];

    const divider: Divider[] = [
        // column 1 
        { positionX: 210, positionY: 80, length: 350, color: 'black' },

        // column 2 
        { positionX: 570, positionY: 80, length: 750, color: 'black' },
    ]

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
            <div>
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
            </div>
            <Canvas
                draw={(context) => {
                    seats.forEach((seat) => drawSeat(context, seat));
                    divider.forEach((divider) => drawDivider(context, divider));
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
