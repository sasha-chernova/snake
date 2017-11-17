import React, {Component} from 'react';
import './App.css';
import Board from './Board.js';
import getRandomFigure from "./Figure";

const numberCell = 15;
const center = Math.floor(numberCell / 2 - 3 / 2);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // color: 'red-item',
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
            let {newStableFiguresArray, score} = this.removeRows(stableFiguresArray);
            return({
                stableFiguresArray: newStableFiguresArray,
                score: score + prevState.score
            })
        });
        // this.forceUpdate();
    };
    newGame = () =>{
        clearInterval(this.startDropping);
        this.newFigure();
        this.setState({stableFiguresArray: [],
        score: 0});
    }
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
        return {newStableFiguresArray: arrayFiltered,score:resultArray.length};
    };

    stopGame = () =>{
        this.setState({gameOver: true});

    };
    pauseGame = () =>{
        clearInterval(this.startDropping);
    }

    makeFixed = (figure) => new Promise( (resolve,reject) => this.setState((prevState, props)=>{
        resolve();
       return ({
            stableFiguresArray: prevState.stableFiguresArray.concat(figure)
        })
    }));

    handleKeyDown = (event) => {
        const {activeFigure, stableFiguresArray} = this.state;
        if (event.keyCode === 37) {
            let allowedMoveL = true;
            activeFigure.forEach(step => {
                if (step[1] < 1) {
                    allowedMoveL = false;
                }
            });
            if (allowedMoveL ) {
                activeFigure.stepLeft();
                const compareFigure = (pixel1, pixel2) => (pixel1[0] === pixel2[0] && pixel1[1] === pixel2[1]);
                let collision = stableFiguresArray.some(fixedPixel => {
                    return activeFigure.some(activePixel => compareFigure(fixedPixel, activePixel))
                });
                if(collision) activeFigure.stepRight();
            }
        } else if (event.keyCode === 38) {
            activeFigure.rotate();
            let rotationAllowed = activeFigure.every(i=>(i[0] && i[1] > 0) && (i[0] && i[1] < numberCell-1));
            if(!rotationAllowed) activeFigure.rotateAnti();

        } else if (event.keyCode === 39) {
            let allowedRight = function (step) {
                return step[1] < numberCell - 1;
            };

            if (activeFigure.every(allowedRight)) {
                activeFigure.stepRight();
                const compareFigure = (pixel1, pixel2) => (pixel1[0] === pixel2[0] && pixel1[1] === pixel2[1]);
                let collision = stableFiguresArray.some(fixedPixel => {
                    return activeFigure.some(activePixel => compareFigure(fixedPixel, activePixel))
                });
                if(collision) activeFigure.stepLeft();
            }
        } else if (event.keyCode === 32) {
            let allowedMoveD = function (step) {
                return step[0] < numberCell - 1;
            };
            activeFigure.stepDown();
            const compareFigure = (pixel1, pixel2) => (pixel1[0] === pixel2[0] && pixel1[1] === pixel2[1]);
            let collision = stableFiguresArray.some(fixedPixel => {
                return activeFigure.some(activePixel => compareFigure(fixedPixel, activePixel))
            });
            if (!activeFigure.every(allowedMoveD) || collision) {
                activeFigure.stepUp();
            }
        } else if(event.keyCode === 40){
            activeFigure.rotateAnti();
            let rotationAllowed = activeFigure.every(i=>(i[0] && i[1] > 0) && (i[0] && i[1] < numberCell-1));

            if(!rotationAllowed) activeFigure.rotate();
        }
        this.forceUpdate()

    }

    render() {
        const {activeFigure, stableFiguresArray, gameOver, score} = this.state;
        const showGameOver = gameOver ? <div className="game-over">Game Over!</div> : '';
        const userScore = <div className="score">Your score: <span>{score *10}</span></div>;
        const stopGame = <div className="buttonBlock"><button className="pause-btn btn" onClick={this.pauseGame}>Pause Game</button></div>;
        const restartGame = <div className="buttonBlock"><button className="start-btn btn" onClick={()=>this.startDropping = setInterval(this.gameTick, 400)}>Restart Figure</button></div>;
        const startGame = <div className="buttonBlock"><button className="replay-btn btn" onClick={this.newGame}>Start New Game</button></div>;
        return (
            <div className="App" onKeyDown={this.handleKeyDown}>
                {showGameOver}
                { userScore }
                <Board figures={[activeFigure, stableFiguresArray]}
                       numberCell={numberCell} />
                <div className="manageButtons">
                    { stopGame }
                    {restartGame}
                    {startGame}
                </div>
            </div>
        );
    }

}

export default App;
