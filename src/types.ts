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

  export type AckPayload = {
    id: string,
    uuid: string,
    opType: string,
    color?:     ColorStrings,
    newColor?:  ColorStrings,
    shape?:     ShapeStrings,
    newShape?:  ShapeStrings,
    size?:      number,
    newSize?:   number,
    newCounter: number
  }
}