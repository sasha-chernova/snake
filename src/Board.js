import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

function drawFigure(matrix, figure){
    figure.forEach(
        pixel =>{
            if((pixel[0] <0) && (pixel[1])<0) return;
            matrix[pixel[0]][pixel[1]] = 1
        }
    )
}
export default class Board extends Component{
    constructor(props){
        super(props);

    }

    render(){
        const {numberCell, figures, color}  = this.props;
        const  matrix= Array(numberCell).fill(0).map(()=>Array(numberCell).fill(0).map( ()=> 0));
        figures.forEach(figure =>{
            drawFigure(matrix, figure)
        });
        return (
            <div className="board">
            {matrix.map((item, i) =>{
             return <div className="row" key={i}> {item.map((item, j) => {
                 const activeClass = item ? color : '';
                 return <div className={`cell ${activeClass}`} key={`${i}, ${j}`}>{item}</div>
            })}
            </div>
        })}
        </div>
        )

    }
}
Board.propTypes = {
    numberCell: PropTypes.number.isRequired,
    figures: PropTypes.array.isRequired
}