import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

function drawFigure(matrix, figure){
    figure.forEach(
        pixel => matrix[pixel[0]][pixel[1]] = 1
    )
}
export default class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            filled: false,
            points:0
        }
    }

    render(){
        const {numberCell, figures}  = this.props;
        const  matrix= Array(numberCell).fill(0).map(()=>Array(numberCell).fill(0).map( ()=> 0));
        figures.forEach(figure =>{
            drawFigure(matrix, figure)
        });
        return (
            <div className="board">
            {matrix.map((item, i) =>{
             return <div className="row" key={i}> {item.map((item, j) => {
                 const activeClass = item ? 'red-item': '';
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