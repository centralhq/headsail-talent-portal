import{ FC } from 'react';

export namespace Navigation {
  
  export type NavMember = {
    name: string,
    link: string,
    children?: FC
  };
}

export namespace CentralShapes {
  
  export type ShapeObject = {
    shape: Shape,
    size: number,
    color: Color
  };

  export enum Shape {
    CIRCLE = "CIRCLE",
    SQUARE = "SQUARE",
    HEXAGON = "HEXAGON"
  }

  export type ShapeStrings = keyof typeof Shape;

  export enum Color {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN"
  }

  export type ColorStrings = keyof typeof Color;

  export type ShapeOperations = {
    opType: string,
    conflictId: string,
    payload: {
      id: string,
      newColor?:  ColorStrings,
      newShape?:  ShapeStrings,
      newSize?:   number 
    }
  }

  export type AckPayload = {
    id: string,
    color?:     ColorStrings,
    newColor?:  ColorStrings,
    shape?:     ShapeStrings,
    newShape?:  ShapeStrings,
    size?:      number,
    newSize?:   number,
    newCounter: number
  }

  export type AckOperations = {
    status: string,
    opType: string,
    uuId: string,
    conflictId:	string,
    counter: number, 
    payload: AckPayload
  }
}