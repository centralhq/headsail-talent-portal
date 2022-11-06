import React, { FC, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ShapeCanvas from '../components/ShapeCanvas';
import ShapeProperties from '../components/ShapeProperties';
import { drawShape } from './workers/shapeContext';
import { ClientHandler } from '../resolver/ClientHandler';
import { CentralShapes } from '../types';


const socket = new WebSocket("ws://localhost:8080/ws")
const clientHandler = new ClientHandler();

const ShapeView: FC<React.HTMLAttributes<HTMLDivElement>> = () => {
    
    const [shape, setShape] = useState<CentralShapes.ShapeStrings>("CIRCLE");
    const [color, setColor] = useState<CentralShapes.ColorStrings>("RED");
    const [size, setSize] = useState(0);

    useEffect(() => {

        let isSubscribed = true;

        const parseResponse = (object: CentralShapes.AckOperations) => {
            const opType = object.opType;
            const payload = object.payload;
            console.log(object);
            if (opType === "load") { // move this outta here
                setShape(payload.shape!);
                setColor(payload.color!);
                setSize(payload.size!);
            } else if (parseOpType(opType) === "SHAPE") {
                setShape(object.payload.newShape!); // TODO: insert detailed object field here
            } else if (parseOpType(opType) === "COLOR") {
                setColor(object.payload.newColor!);
            } else if (parseOpType(opType) === "SIZE") {
                setSize(object.payload.newSize!);
            } else {
                // TODO: error here
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
                        // How do you differentiate between local inflight op and broadcasted remote op: uuid
                        clientHandler.handleIncomingOp(object)
                            .then((op) => {
                                if (op) {
                                    parseResponse(op);
                                }
                            });
                    }
                )
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
        const encoder = new TextEncoder();
        const reqObject = JSON.stringify(buildShapeRequest(newShape));
        const bytes = encoder.encode(reqObject);
        sendBytes(bytes);
    }

    const handleColor = (newColor: CentralShapes.Color) => {
        const encoder = new TextEncoder();
        const reqObject = JSON.stringify(buildColorRequest(newColor));
        const bytes = encoder.encode(reqObject);
        sendBytes(bytes);
    }

    const handleSize = (newSize: number) => {
        const encoder = new TextEncoder();
        const reqObject = JSON.stringify(buildSizeRequest(newSize));
        const bytes = encoder.encode(reqObject);
        sendBytes(bytes);
    }

    const isOpen = (ws: WebSocket) => { return ws.readyState === ws.OPEN }

    const sendBytes = (bytes: Uint8Array) => {
        if (!isOpen(socket)) {
            console.log("WebSocket is CLOSED");
            return;
        }
        socket.send(bytes);
    }

    const buildShapeRequest = (newShape: CentralShapes.ShapeStrings): CentralShapes.ShapeOperations => {
        const uid = uuidv4();
        
        return {
            opType: "SET_SHAPE",
            conflictId: `SET_SHAPE_${uid}`,
            payload: {
                id: uid,
                newShape: newShape
            }
        }
    }

    const buildColorRequest = (newColor: CentralShapes.Color): CentralShapes.ShapeOperations => {
        const uid = uuidv4();// TODO: Change the uid to the objectId of the object in edit
        
        return {
            opType: "SET_COLOR",
            conflictId: `SET_COLOR_${uid}`,
            payload: {
                id: uid,
                newColor: newColor
            }
        }
    }

    const buildSizeRequest = (newSize: number): CentralShapes.ShapeOperations => {
        const uid = uuidv4();
        
        return {
            opType: "SET_SIZE",
            conflictId: `SET_SIZE_${uid}`,
            payload: {
                id: uid,
                newSize: newSize
            }
        }

    }

    /**
     * opType string is in format "SET_COLOR_payloadId"
     * @param opType 
     */
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