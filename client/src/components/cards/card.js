import React, { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                title={props.name}
                cost={props.cost}
                category={props.category}
                listCard={props.listCard}
                setListCard={props.setListCard}
                id={props.id}
            />
            <div className="card-container" onClick={() => setOpen(true)}>
                <h1 className="card-title">{props.name}</h1>
                <p className="card-cost">{props.cost}</p>
                <p className="card-category">{props.category}</p>
            </div>
        </>
    )
}