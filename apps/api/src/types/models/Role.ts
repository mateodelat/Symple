import { type ObjectId } from "mongoose";

export enum IndicatorType {
  FINANCIAL = "Objetivo financiero",
  SCORE = "Calificación 1 al 10",
  MEETS = "Cumple (sí o no)",
}

export enum MeasurementType {
  PERCENTAGE = "Porcentaje",
  AMOUNT = "Monto",
}

export interface Indicator {
  name: string;
  indicatorType: IndicatorType;
  measurementType?: MeasurementType;
  measurementValue?: number;
  associatedUsers: ObjectId[];
}

export interface Deliverable {
  name: string;
}

export interface IFunction extends Deliverable {}

export interface GetOneParams {
  department: string;
  role: string;
}
