import React, {Component} from 'react';
import './App.css';
import Board from './Board.js';
import getRandomFigure from "./Figure";

const numberCell = 10;
// const numberCell = Math.floor(Math.random() * (20 - 6 + 1)) + 6;
const center = Math.floor(numberCell / 2 - 3 / 2);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red-item',
            gameOver: false,
            activeFigure: getRandomFigure().step({x: center, y: 0}),
            stableFiguresArray: [],
            score: 0
        }

    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        this.newFigure();
    }

    newFigure = ()=>{
        this.setState({
            activeFigure: getRandomFigure().step({x: center, y: 0})
        });
        this.startDropping = setInterval(this.gameTick, 400);

    };
    gameTick =async () => {
        const {activeFigure, stableFiguresArray} = this.state;
        let allowedDropping = function (step) {
            return step[0] < numberCell - 1;
        };
        activeFigure.stepDown();

        const compareFigure = (pixel1, pixel2) => (pixel1[0] === pixel2[0] && pixel1[1] === pixel2[1]);
        let collisions = stableFiguresArray.some(fixedPixel => {
            return activeFigure.some(activePixel => compareFigure(fixedPixel, activePixel))
        });

        if (!activeFigure.every(allowedDropping) || collisions) {
            if(collisions){
                activeFigure.stepUp();
            }
            await this.stopMoving();
        }
        this.setState((prevState, props)=> {
            const {stableFiguresArray} = prevState;
            let newStableFiguresArray = this.removeRows(stableFiguresArray);
            return({stableFiguresArray: newStableFiguresArray})
        });
        this.forceUpdate();
    };

    stopMoving = () => {
        const {activeFigure, stableFiguresArray} = this.state;
        clearInterval(this.startDropping);
        let gameOver = stableFiguresArray.some(figure=>figure[0] < 1);
        gameOver ? this.stopGame() : this.newFigure();
       return this.makeFixed(activeFigure);
    };

    removeRows=(arr)=>{
        let arrOfKeys = Object.keys(Array(numberCell).fill(0));
        let sortedArr = arrOfKeys.map(x=>{
            return  arr.filter(item=>+item[0]===+x).length;
        })
        let resultArray= sortedArr.map((item, index)=>item===numberCell? index : null).filter(item=> item !== null);
        this.setState((prevState, props) => {
            return {score: prevState.score+resultArray.length};
        });
        let arrayFiltered = arr;

        resultArray.forEach(rowIndex=>{
            arrayFiltered = arrayFiltered.filter((item)=> item[0] !== rowIndex );
            arrayFiltered = arrayFiltered.map(item=>{
                if(item[0]<rowIndex){
                    item[0]++
                }
                return item;
            });
        });
        return arrayFiltered;
    };

    stopGame = () =>{
        this.setState({gameOver: true});

    };

    makeFixed = (figure) => new Promise( (resolve,reject) => this.setState((prevState, props)=>{
        resolve();
       return ({
            stableFiguresArray: prevState.stableFiguresArray.concat(figure),
        })
    }));

    handleKeyDown = (event) => {
        const {activeFigure, stableFiguresArray} = this.state;
        const compareFigure = (pixel1, pixel2) => (pixel1[0] === pixel2[0] && pixel1[1] === pixel2[1]);
        let collisions = stableFiguresArray.some(fixedPixel => {
            return activeFigure.some(activePixel => compareFigure(fixedPixel, activePixel))
        });
        if (event.keyCode === 37) {
            let allowedMoveL = true;
            activeFigure.forEach(step => {
                if (step[1] < 1) {
                    allowedMoveL = false;
                }
            });
            if (allowedMoveL || collisions) {
                activeFigure.stepLeft();
            }
        } else if (event.keyCode === 38) {
            if(!collisions) activeFigure.rotate();

        } else if (event.keyCode === 39) {
            //console.log(collisions, activeFigure, stableFiguresArray )
            let allowedRight = function (step) {
                return step[1] < numberCell - 1;
            };

            if (activeFigure.every(allowedRight) || collisions) {
                activeFigure.stepRight();
            }
        } else if (event.keyCode === 32) {
            let allowedMoveD = function (step) {
                return step[0] < numberCell - 1;
            };
            if (activeFigure.every(allowedMoveD)) {
                activeFigure.stepDown();
            }
        }
        this.forceUpdate()

    }

    render() {
        const {activeFigure, stableFiguresArray, gameOver, score} = this.state;
        const showGameOver = gameOver ? <div className="game-over">Game Over!</div> : '';
        const userScore = score ? <div className="score">Your score: <span>{score *100}</span></div> : '';

        return (
            <div className="App" onKeyDown={this.handleKeyDown}>
                {showGameOver}
                { userScore }
                <Board figures={[activeFigure, stableFiguresArray]}
                       numberCell={numberCell} color={this.state.color}/>

            </div>
        );
    }

}

export default App;
