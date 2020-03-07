import React from "react";
import './loading_button.css';

function LoadingButton(props) {
    const buttonText = props.buttonText;
    return (
        <button
            className={"bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" + (props.isLoading ? ' lds-hourglass' : '')}
            type="button" onClick={props.onClick}>
            {!props.isLoading && buttonText}
        </button>
    );


}

export default LoadingButton;