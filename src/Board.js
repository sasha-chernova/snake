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
            matrix: Array(10).fill(0).map(()=>Array(10).fill(0).map( ()=> 0))
        }
    }


    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        this.setRandomRange();
        //this.setCenter();
        setTimeout(
            () => {
                const {matrix} = this.state;
                const newMatrix = [...matrix];

                let f1 = [[0,0], [0,1], [1,0], [1,1]];
                let f2 = [[0,2], [1,0], [1,1], [1,2]];
                let f3 = [[0,1], [1,0], [1,1], [1,2]];
                let f4 = [[0,0], [0,1], [1,1], [1,2]];
                let f5 = [[0,0], [0,1], [0,2]];

                f3.map(i =>{
                    let x= i[0];
                    let y =i[1];
                    matrix[x][y]=1;
                });
                this.setState({matrix: newMatrix});

// console.log(this.props.activeFigure)
            }, 1000

        )
    }

    handleKeyDown = (event) => {
        const matrix = this.state.matrix;
        const newMatrix = [...matrix];
        if(event.keyCode === 37){
            matrix.map(i =>{
                if(i[i.length-1] !=1) {
                    let arr1 = i.shift();
                    i.push(arr1);
                }
            });
            this.setState({matrix: newMatrix});

        } else if(event.keyCode === 38){
            //alert('up');

        }else if(event.keyCode === 39){
            matrix.map(i =>{
                if(i[i.length-1] !=1) {
                    let arr1 = i.pop();
                    i.unshift(arr1);
                }
            });
            this.setState({matrix: newMatrix});
        }else if(event.keyCode === 32){
            //alert('down');

        }

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