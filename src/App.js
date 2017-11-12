import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
const figuresArray = [];
class App extends Component {
    constructor(props) {
        super(props);
        //this.handleKeyDown = this.handleKeyDown.bind(this);
          this.state = {
            activeFigure: 0
        }
        this.createFigure = this.createFigure.bind(this);

    }
    componentWillMount() {
        //window.addEventListener('keydown', this.handleKeyDown);
        this.createFigure();
        this.chooseFigure();
    };


    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.handleKeyDown);
    // };
    // handleKeyDown(event){
    //     if(event.keyCode === 37){
    //         alert('left');
    //     } else if(event.keyCode === 38){
    //         alert('up');
    //     }else if(event.keyCode === 39){
    //         alert('right');
    //     }else if(event.keyCode === 32){
    //         alert('down');
    //     }
    // }

    createFigure = () =>{

        let f1 = [[0,0], [0,1], [1,0], [1,1]];
        let f2 = [[0,2], [1,0], [1,1], [1,2]];
        let f3 = [[0,1], [1,1], [1,0], [1,2]];
        let f4 = [[0,0], [0,1], [1,1], [1,2]];
        let f5 = [[0,0], [0,1], [0,2]];

        figuresArray.push(f1);
        figuresArray.push(f2);
        figuresArray.push(f3);
        figuresArray.push(f4);
        figuresArray.push(f5);
        //console.log(figuresArray);
    }
    chooseFigure(){
        let randomFigure = Math.floor(Math.random() * figuresArray.length);
        this.setState({activeFigure: randomFigure});
       // console.log(figuresArray[randomFigure]);
        this.setState({activeFigure: figuresArray[randomFigure]})
    }
    render(){

        return(
            <div className="App" onKeyDown={this.handleKeyDown}>
                <Board figure={this.state.activeFigure} />

            </div>
        );
    }

}

export default App;
