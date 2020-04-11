import React from 'react';
import { Message } from 'element-react';

function Alerts() {

    const open = () => {
        Message({
            message: 'Congrats, this is a success message.',
            type: 'success'
        });

    }

    const open4 = () => {
        Message.error('Oops, this is a error message.');
    }

    return (
        <div>
            <Button plain={true} onClick={open}>success</Button>
            <Button plain={true} onClick={open4}>error</Button>
        </div>
    )
}


export default Alert