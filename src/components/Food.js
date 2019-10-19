import  React from 'react';

export default (props) => {

    const position = {
        top : `${props.food[1]}%`,
        left : `${props.food[0]}%`
    }

    return (
        <div className = 'snake-food' style = {position}></div>
    )
}