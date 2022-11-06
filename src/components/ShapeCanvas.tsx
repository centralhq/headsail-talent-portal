import React, { FC, useRef, useEffect } from 'react';

type ShapeCanvasProps = {
    draw: (context: CanvasRenderingContext2D) => void
    width: number,
    height: number
}

const ShapeCanvas: FC<ShapeCanvasProps & 
    React.CanvasHTMLAttributes<HTMLCanvasElement>> = (
        { draw = () => {}, width, height }: ShapeCanvasProps
    ) => {
    
        const canvas = useRef<HTMLCanvasElement>(null);

        useEffect(() => {
            const context = canvas.current?.getContext('2d');
            context?.clearRect(0, 0, width, height);
            if (context) {
                draw(context);
            }
        }, [draw, width, height])

    return (
        <React.Fragment>
             <canvas 
            ref={canvas}
            width={width}
            height={height} />
        </React.Fragment>
    )
};

export default ShapeCanvas;