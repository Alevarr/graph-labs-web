import React, { useState } from "react";
import "./matrixCell.css";

type CellProps = {
    id: number;
    rowId: number;
    matrixId: string;
    value: string;
    clickHandler: (cellId: number, rowId: number) => void;
    onDoubleClick: (cellId: number, rowId: number) => void; // Новый обработчик двойного клика
    className?: string;
}

export function Cell(props: CellProps) {
    const [isHighlighted, setIsHighlighted] = useState(false);

    const handleDoubleClick = () => {
        setIsHighlighted(!isHighlighted);
        props.onDoubleClick(props.id, props.rowId); // Вызов нового обработчика двойного клика
    };

    let cell_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString();
    let button_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString() + "-button";

    let sim_cell_id = "matrix-" + props.matrixId + "-row-" + (props.id - 1).toString() + "-cell-" + props.id.toString();

    return (
        <div id={cell_id} className={`cell ${props.className ?? ""}`}>
            <button
                id={button_id}
                className={`cell-button ${isHighlighted ? "highlighted-number" : ""}`}
                onClick={() => props.clickHandler(props.id, props.rowId)}
                onDoubleClick={handleDoubleClick}
            >
                {props.value}
            </button>

        </div>
    );
}

type LabelCellProps = {
    id: number;
    rowId: number;
    matrixId: string;
    value: string;
    clickHandler: (cellId: number, rowId: number) => void;
    className?: string;
}

export function LabelCell(props: LabelCellProps) {
    let cell_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString();
    let button_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString() + "-button";
    return (
        <div id={cell_id} className={`cell ${props.className ?? ""}`}>
            <button
                id={button_id}
                className="cell-button"
                disabled={true}
                onClick={() => props.clickHandler(props.id, props.rowId)}>
                {props.value}
            </button>
        </div>
    );
}
