import { CentralShapes } from "../../types";


export function drawSquare(canvasContext: CanvasRenderingContext2D, side: number, color: CentralShapes.Color) {
    canvasContext.fillStyle = color;
    const rectangle = new Path2D();
    rectangle.rect(10, 10, side * 2, side * 2);
    canvasContext.fill(rectangle);
}

export function drawCircle(canvasContext: CanvasRenderingContext2D, radius: number, color: CentralShapes.Color) {
    canvasContext.fillStyle = color;
    const circle = new Path2D();
    circle.arc(100, 35, radius, 0, 2 * Math.PI);
    canvasContext.fill(circle);
}

export function drawHexagon(canvasContext: CanvasRenderingContext2D, radius: number, color: CentralShapes.Color) {
    const a = 2 * Math.PI / 6;
    const r = radius;
    canvasContext.fillStyle = color;
    canvasContext.beginPath()

    for (let i = 0; i < 6; i++) {
        canvasContext.lineTo(100 + r * Math.cos(a * i), 35 + r * Math.sin(a * i));
    }
    canvasContext.closePath();
    canvasContext.fill();
}

export function drawShape(canvasContext: CanvasRenderingContext2D, shape: CentralShapes.ShapeStrings, size: number, color: CentralShapes.ColorStrings) {
    canvasContext.fillStyle = color;
    if (shape === CentralShapes.Shape.CIRCLE) {
        const circle = new Path2D();
        circle.arc(100, 35, size, 0, 2 * Math.PI);
        canvasContext.fill(circle);

    } else if (shape === CentralShapes.Shape.SQUARE) {
        const rectangle = new Path2D();
        rectangle.rect(100 - size, 35 - size, size * 2, size * 2);
        canvasContext.fill(rectangle);
        
    } else if (shape === CentralShapes.Shape.HEXAGON) {
        const a = 2 * Math.PI / 6;
        canvasContext.beginPath()

        for (let i = 0; i < 6; i++) {
            canvasContext.lineTo(100 + size * Math.cos(a * i), 35 + size * Math.sin(a * i));
        }
        canvasContext.closePath();
        canvasContext.fill();
    }
}

