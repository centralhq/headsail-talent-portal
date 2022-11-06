import React, { FC, ReactElement, useRef } from 'react';
import { CentralShapes } from '../types';

type ShapePropertiesProps = {
    shape: CentralShapes.ShapeStrings,
    color: CentralShapes.ColorStrings,
    size: number,
    onShape: any,
    onColor: any,
    onSize: any,
}

const ShapeProperties: FC<ShapePropertiesProps & 
    React.HTMLAttributes<HTMLDivElement>> = (
        {shape, size, color, onColor, onShape, onSize}
    ) => {

        const shapeRef = useRef<HTMLSelectElement>(null);
        const colorRef = useRef<HTMLSelectElement>(null);
        const sizeRef = useRef<HTMLInputElement>(null);

        const handleShape = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onShape(e.target.value);
        }

        const handleColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onColor(e.target.value);
        }

        const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
            onSize(e.target.value);
        }

        return (
            <React.Fragment>
                <select name="shape" ref={shapeRef} onChange={handleShape} value={shape}>
                    <option value="">
                        Select a shape
                    </option>
                    <option 
                        value={CentralShapes.Shape.CIRCLE}
                    >
                        CIRCLE
                    </option>
                    <option 
                        value={CentralShapes.Shape.SQUARE}
                    >
                        SQUARE
                    </option>
                    <option 
                        value={CentralShapes.Shape.HEXAGON}
                    >
                        HEXAGON
                    </option>
                </select>
                <select name="color" ref={colorRef} onChange={handleColor} value={color}>
                    <option value="">
                        Select a color
                    </option>
                    <option 
                        value={CentralShapes.Color.RED}
                    >
                        RED
                    </option>
                    <option 
                        value={CentralShapes.Color.BLUE}
                    >
                        BLUE
                    </option>
                    <option 
                        value={CentralShapes.Color.GREEN}
                    >
                        GREEN
                    </option>
                </select>
                <input 
                    type="number" 
                    ref={sizeRef}
                    value={size}
                    min={1}
                    max={100}
                    onChange={handleSize}
                />
            </React.Fragment>
        )

    };

export default ShapeProperties;