import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
import getRandomFigure  from "./Figure";


const numberCell =10;
const center = Math.floor(numberCell/2 - 3/2);
class App extends Component {
    constructor(props) {
        super(props);
          this.state = {
            activeFigure: getRandomFigure().step({x:center, y:0 })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        const {activeFigure} = this.state;
        let allowedDropping = function(step){
            return step[0] < numberCell - 1;
        };
        if(activeFigure.every(allowedDropping)){
            // console.log(activeFigure.every(allowedDropping))
            //  var startDropping = setInterval(()=>{
            //     activeFigure.stepDown(); this.forceUpdate()
            //  }, 1000)
        }
        //else{
        //     clearInterval(startDropping);
        //}

    }

    handleKeyDown = (event) => {
        const {activeFigure} = this.state;
        if(event.keyCode === 37){
            let allowedMoveL = true;
            activeFigure.forEach(step=>{
                if(step[1] < 1){
                    allowedMoveL = false;
                }
            })
            if(allowedMoveL){
                activeFigure.stepLeft();
            }
        } else if(event.keyCode === 38){


        }else if(event.keyCode === 39){
            let allowedRight = function(step){
                return step[1] < numberCell - 1;
            };

            if(activeFigure.every(allowedRight)){
                activeFigure.stepRight();
            }
        }else if(event.keyCode === 32){
            let allowedMoveD = function(step){
                return step[0] < numberCell - 1;
            };
            if(activeFigure.every(allowedMoveD)){
                activeFigure.stepDown();
            }
        }
        this.forceUpdate()

    }

    render(){
        const {activeFigure} = this.state;
        return(
            <div className="App" onKeyDown={this.handleKeyDown}>
                <Board figures={[activeFigure]}
                       numberCell={numberCell} center={center}/>

            </div>
        );
    }

}

export default App;
