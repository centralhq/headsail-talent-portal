import React, { FC, useState, useEffect } from 'react';
import ShapeCanvas from '../components/ShapeCanvas';
import ShapeProperties from '../components/ShapeProperties';
import { drawShape } from './workers/shapeContext';
import { CentralShapes } from '../types';


const socket = new WebSocket("ws://localhost:8080/ws")

const ShapeView: FC<React.HTMLAttributes<HTMLDivElement>> = () => {
    
    const [shape, setShape] = useState<CentralShapes.ShapeStrings>("CIRCLE");
    const [color, setColor] = useState<CentralShapes.ColorStrings>("RED");
    const [size, setSize] = useState(0);
    const [shapeUid, setShapeUid] = useState("");

    useEffect(() => {

        let isSubscribed = true;
        // need to rework this.
        const parseResponse = (object: CentralShapes.AckPayload) => {
            console.log(object);
            if (!object.opType) {
                setShape(object.shape!);
                setColor(object.color!);
                setSize(object.size!);
                setShapeUid(object.id);
            } else if (parseOpType(object.opType) === "SHAPE") {
                setShape(object.newShape!); // TODO: insert detailed object field here
            } else if (parseOpType(object.opType) === "COLOR") {
                setColor(object.newColor!);
            } else if (parseOpType(object.opType) === "SIZE") {
                setSize(object.newSize!);
            }
        }

        const init = async () => {
            if (isSubscribed) {
                socket.addEventListener('open',
                    event => {
                        console.log('Connected to server!')
                    }
                );
    
                socket.addEventListener('message',
                    event => {
                        const object = JSON.parse(event.data);
                        parseResponse(object);
                    }
                );
            }
        }  
        
        init();
        return () => {isSubscribed = false};
        
    }, [])

    const width = 640;
    const height = 480;
        
    const draw = (context: CanvasRenderingContext2D) => {
        // TODO include client-side resolvers here
        console.log("states: ", shape, size, color);
        drawShape(context, shape, size, color);
    };

    const handleShape = (newShape: CentralShapes.ShapeStrings) => {
        sendOperation(buildShapeRequest(newShape));
    }

    const handleColor = (newColor: CentralShapes.Color) => {
        sendOperation(buildColorRequest(newColor));
    }

    const handleSize = (newSize: number) => {   
        sendOperation(buildSizeRequest(newSize));
    }

    const isOpen = (ws: WebSocket) => { return ws.readyState === ws.OPEN }

    const sendOperation = (op: Object) => {
        const reqObject = JSON.stringify(op);
        const bytes = new TextEncoder().encode(reqObject);

        if (!isOpen(socket)) {
            console.log("WebSocket is CLOSED");
            return;
        }
        console.log("sending packet: ", op);
        socket.send(bytes);
    }

    const buildShapeRequest = (newShape: CentralShapes.ShapeStrings): Object => {
        
        return {
            opType: "SET_SHAPE",
            id: shapeUid,
            newShape: newShape
        }
    }

    const buildColorRequest = (newColor: CentralShapes.Color): Object => {
        
        return {
            opType: "SET_COLOR",
            id: shapeUid,
            newColor: newColor
        }
    }

    const buildSizeRequest = (newSize: number): Object => {
        
        return {
            opType: "SET_SIZE",
            id: shapeUid,
            newSize: newSize
        }
    }
    
    const parseOpType = (opType: string) => {
        return opType.split("_")[1]
    }

    return (
        <div className="w-full h-full items-start content-start">
            <ShapeProperties
                shape={shape}
                color={color}
                size={size}
                onColor={handleColor} 
                onShape={handleShape} 
                onSize={handleSize} />
            <ShapeCanvas 
            draw={draw} 
            width={width} 
            height={height} />
        </div>
    );
}

export default ShapeView;