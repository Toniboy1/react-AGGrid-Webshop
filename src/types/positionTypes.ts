import { ColDef, Column, GridApi, IRowNode } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";

/**
 * @typedef {Object} TPosition
 * @property {string} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} job_title
 */
export interface TPositionRow extends TPosition {
    id: string;
};

export type TPosition = {
    first_name: string;
    last_name: string;
    job_title: string;
    order: number;
};

/**
 * @typedef {Object} ValueSetterParams
 * @property {any} oldValue
 * @property {any} newValue
 * @property {IRowNode} node
 * @property {TPosition} data
 * @property {Column} column
 * @property {ColDef} colDef
 * @property {GridApi} api
 * @property {any} context
 */
interface ValueSetterParams<TData = TPosition, TValue = any> {
    oldValue: TValue | null | undefined;
    newValue: TValue | null | undefined;
    node: IRowNode<TData> | null;
    data: TData;
    column: Column<TValue>;
    colDef: ColDef<TData, TValue>;
    api: GridApi<TData>;
    context: any;
}
export interface IPositionButtonRow extends CustomCellRendererProps{
    onClick: (id: string) => React.MouseEventHandler<HTMLButtonElement>;
}
/**
  * @typedef {function} ValueSetterFunc
  * @param {ValueSetterParams} params
  * @returns {boolean}
**/
export interface ValueSetterFunc<TData = TPosition, TValue = any> {
    (params: ValueSetterParams<TData, TValue>): boolean;
}
