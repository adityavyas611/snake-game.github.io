import React from 'react';

export default (props) => {
    return (
        <div>
        {
            props.snakeChars.map((char, i) => {
                const style = {
                    top : `${char[1]}%`,
                    left : `${char[0]}%`
                }
            
            return (
                <div className = 'snake-character' key = {i} style = {style}></div>
            )
        }
    )
}
        </div>
    )
}