import Canvas from './Canvas';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

interface Seat {
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
        { positionX: 100, positionY: 100, color: '#4000ff' },
        { positionX: 100, positionY: 200, color: '#ff005a' },
        { positionX: 100, positionY: 300, color: '#3cff00' },
        { positionX: 100, positionY: 800, color: '#d8000c' },
        { positionX: 100, positionY: 1000, color: '#8c00e6' },
        { positionX: 100, positionY: 1100, color: '#3500c3' },
        { positionX: 100, positionY: 1200, color: '#00c399' },
        { positionX: 230, positionY: 100, color: '#00c399' },
        { positionX: 230, positionY: 200, color: '#00c399' },
        { positionX: 230, positionY: 300, color: '#ff005a' },
        { positionX: 460, positionY: 100, color: '#00c399' },
        { positionX: 460, positionY: 200, color: '#3500c3' },
        { positionX: 460, positionY: 300, color: '#d8000c' },
        { positionX: 590, positionY: 100, color: '#3500c3' },
        { positionX: 590, positionY: 200, color: '#3cff00' },
        { positionX: 590, positionY: 300, color: '#4000ff' },
        { positionX: 590, positionY: 400, color: '#ff005a' },
        { positionX: 590, positionY: 500, color: '#8c00e6' },
        { positionX: 590, positionY: 600, color: '#8c00e6' },
        { positionX: 590, positionY: 700, color: '#d8000c' },
        { positionX: 820, positionY: 100, color: '#ff005a' },
        { positionX: 820, positionY: 200, color: '#4000ff' },
        { positionX: 820, positionY: 300, color: '#ff005a' },
        { positionX: 820, positionY: 400, color: '#ff005a' },
        { positionX: 820, positionY: 500, color: '#ff005a' },
        { positionX: 820, positionY: 600, color: '#3cff00' },
        { positionX: 820, positionY: 700, color: '#8c00e6' },
        { positionX: 820, positionY: 800, color: '#8c00e6' },
        { positionX: 950, positionY: 100, color: '#3500c3' },
        { positionX: 950, positionY: 200, color: '#00c399' },
        { positionX: 950, positionY: 300, color: '#ff005a' },
        { positionX: 950, positionY: 400, color: '#8c00e6' },
        { positionX: 950, positionY: 500, color: '#8c00e6' },
        { positionX: 950, positionY: 600, color: '#00c399' },
        { positionX: 950, positionY: 700, color: '#00c399' },
        { positionX: 950, positionY: 800, color: '#ff005a' },
        { positionX: 950, positionY: 900, color: '#3500c3' },
        { positionX: 1180, positionY: 100, color: '#3500c3' },
        { positionX: 1180, positionY: 200, color: '#00c399' },
        { positionX: 1180, positionY: 300, color: '#4000ff' },
        { positionX: 1180, positionY: 400, color: '#3500c3' },
        { positionX: 1180, positionY: 500, color: '#00c399' },
        { positionX: 1180, positionY: 600, color: '#4000ff' },
        { positionX: 1180, positionY: 700, color: '#d8000c' },
        { positionX: 1180, positionY: 800, color: '#3500c3' },
        { positionX: 1310, positionY: 100, color: '#00c399' },
        { positionX: 1310, positionY: 200, color: '#8c00e6' },
        { positionX: 1310, positionY: 300, color: '#3cff00' },
        { positionX: 1310, positionY: 400, color: '#00c399' },
        { positionX: 1310, positionY: 500, color: '#3500c3' },
        { positionX: 1310, positionY: 600, color: '#4000ff' },
        { positionX: 1310, positionY: 700, color: '#ff005a' },
        { positionX: 1310, positionY: 800, color: '#3cff00' },
        { positionX: 1540, positionY: 100, color: '#8c00e6' },
        { positionX: 1540, positionY: 200, color: '#4000ff' },
        { positionX: 1540, positionY: 300, color: '#ff005a' },
        { positionX: 1540, positionY: 400, color: '#3cff00' },
        { positionX: 1540, positionY: 500, color: '#3500c3' },
        { positionX: 1540, positionY: 600, color: '#00c399' },
        { positionX: 1670, positionY: 100, color: '#ff005a' },
        { positionX: 1670, positionY: 200, color: '#00c399' },
        { positionX: 1670, positionY: 300, color: '#3cff00' },
        { positionX: 1670, positionY: 400, color: '#ff005a' },
        { positionX: 1670, positionY: 500, color: '#00c399' },
        { positionX: 1670, positionY: 600, color: '#00c399' },
        { positionX: 1900, positionY: 100, color: '#00c399' },
        { positionX: 1900, positionY: 200, color: '#3500c3' },
        { positionX: 1900, positionY: 300, color: '#4000ff' },
        { positionX: 1900, positionY: 400, color: '#3cff00' },
        { positionX: 1900, positionY: 500, color: '#3500c3' },
        { positionX: 2030, positionY: 100, color: '#8c00e6' },
        { positionX: 2030, positionY: 200, color: '#3cff00' },
        { positionX: 2030, positionY: 300, color: '#4000ff' },
        { positionX: 2030, positionY: 400, color: '#ff005a' },
        { positionX: 2030, positionY: 500, color: '#00c399' },
        { positionX: 2260, positionY: 100, color: '#3cff00' },
        { positionX: 2260, positionY: 200, color: '#ff005a' },
        { positionX: 2260, positionY: 300, color: '#ff005a' },
        { positionX: 2260, positionY: 400, color: '#3cff00' },
        { positionX: 2390, positionY: 100, color: '#ff005a' },
        { positionX: 2390, positionY: 200, color: '#ff005a' },
        { positionX: 2390, positionY: 300, color: '#ff005a' },
        { positionX: 2390, positionY: 400, color: '#4000ff' },
        { positionX: 2620, positionY: 100, color: '#3500c3' },
        { positionX: 2620, positionY: 200, color: '#ff005a' }



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
