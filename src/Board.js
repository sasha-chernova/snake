import React, { Component } from 'react';
let boardCenter = 4;
export default class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            filled: true,
            numberCell: 10,
            boardCenter: 4
        },
        this.setRandomRange= this.setRandomRange.bind(this);
    }

    componentDidMount() {
        this.setRandomRange();
        //this.setCenter();
    }
    setRandomRange()
    {
        this.setState({
           numberCell: Math.floor(Math.random() * (20 - 6 + 1)) + 6
        })
            this.setState({boardCenter: Math.floor(this.numberCell/2)})
    }

    render(){
        console.log(this.boardCenter);
        let rows = [];
        for (let i = 0; i < this.state.numberCell; i++){
            let rowID = `row${i}`;
            let cell = [];
            for (let idx = 0; idx < this.state.numberCell; idx++){
                let cellID = `cell${i}-${idx}`;
                let keyID = `${i},${idx}`;
                cell.push(<td key={keyID} id={cellID}></td>)
            }
            rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        return(
            <table id="board">
                <tbody>
                {rows}
                </tbody>
                {/*{this.state.boardCenter}*/}
            </table>
        )
    }
}