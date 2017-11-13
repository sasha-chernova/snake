import React, { Component } from 'react';
import './App.css';

export default class Board extends Component{
    constructor(props){
        super(props);
        const  row = (new Array(10)).fill(0);
        this.state = {
            filled: false,
            numberCell: 10,
            boardCenter: 0,
            points:0,
            grid: [],
            matrix: Array(10).fill(0).map(()=>Array(10).fill(0).map( ()=> 0))
        }
    }

    componentDidMount() {
        this.setRandomRange();
        setTimeout(
            () => {
                const {matrix} = this.state;
                const newMatrix = [...matrix];
                // matrix[1][2] = 1;
                //let f2 = [[0][2], [1,0], [1,1], [1,2]];
                //let f3 = [[[0],[2]], [[1],[0]], [[1],[1]], [[1],[2]]];
                // f3.map(i=>{
                //     i.map(j=>console.log(i,j))
                // })
                matrix[0][2]= matrix[1][0] = matrix[1][1] = matrix[1][2] = 1;
                this.setState({matrix: newMatrix});

            }, 3000

        )
    }
    setRandomRange = () =>  {
        this.setState({
           numberCell: (Math.floor(Math.random() * (20 - 6 + 1)) + 6),
           boardCenter: Math.floor(this.state.numberCell/2)
        });

    }

    render(){
        const {matrix} = this.state;
        if (!matrix) {
            return null
        }
        return (
            <div>
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