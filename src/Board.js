import React, { Component } from 'react';
import './App.css';
let boardCenter = 4;
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
        //this.setCenter();
        setTimeout(
            () => {
                const {matrix} = this.state;

                const newMatrix = [...matrix];
                //this.setState({matrix: Array(10).fill(Array(10).fill(0))});

                matrix[1][2] = 1;
                this.setState({matrix: newMatrix});
                //this.forceUpdate();

            }, 3000

        )
    }
    setRandomRange = () =>  {
        this.setState({
           numberCell: (Math.floor(Math.random() * (20 - 6 + 1)) + 6),
           boardCenter: Math.floor(this.state.numberCell/2)
        });
        // console.log(this.state.numberCell)
        //     //his.setState({})
        // console.log(this.state.boardCenter)
    }

    render(){
    // let rows = [];
    //
    //     for (let i = 0; i < this.state.numberCell; i++){
    //         let cell = [];
    //         for (let idx = 0; idx < this.state.numberCell; idx++){
    //             let keyID = `${i},${idx}`;
    //             cell.push(<div className="cell red-item" key={keyID}>{keyID}</div>)
    //         }
    //         rows.push(<div className="row" key={i}>{cell}</div>)
    //     }

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