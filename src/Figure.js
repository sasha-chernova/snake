
const figures = [
    [[0,0], [0,1], [1,0], [1,1]],
    [[0,2], [1,0], [1,1], [1,2]],
    [[0,1], [1,1], [1,0], [1,2]],
    [[0,0], [0,1], [1,1], [1,2]],
    [[0,0], [0,1], [0,2]]
];
figures[0].isCube = true;
const cloneArray = array => {
    const clone = array.map(item => [...item]);
    clone.isCube = array.isCube;
    return clone;
}
function getRandomFigure(){

    const index = Math.floor(Math.random() * figures.length);
    const figure =cloneArray(figures[index]);

   figure.step = ({x, y})=>{
       figure.forEach((item)=> {
               item[1] += x;
               item[0] += y;
           }
       )
       return figure;
   };
    function rotation(arr){
            const figure = arr;
            var center = figure[1];
            for (var i = 0; i < figure.length; i++) {
                    let relativeX = figure[i][0] - center[0];
                    let relativeY = figure[i][1] - center[1];
                    let rotatedX = relativeY;
                    let rotatedY = -relativeX;
                    figure[i][0] = center[0] + rotatedX;
                    figure[i][1] = center[1] + rotatedY;
                }
    }

    function rotationAnti(arr){
        const figure = arr;
        var center = figure[1];
        for (var i = 0; i < figure.length; i++) {
            let relativeX = figure[i][0] - center[0];
            let relativeY = figure[i][1] - center[1];
            let rotatedX = relativeY;
            let rotatedY = -relativeX;
            figure[i][0] = center[0] - rotatedX;
            figure[i][1] = center[1] - rotatedY;
        }
    }
   figure.stepLeft = ()=> {
      return figure.step({x:-1, y:0});
       console.log('left');
   };
   figure.stepRight=()=>{
       figure.step({x:1, y:0});
       console.log('right');
   };
   figure.rotate = ()=> {
       if(!figure.isCube) rotation(figure);

   }
    figure.rotateAnti = () =>{
        if(!figure.isCube) rotationAnti(figure);
    }
   figure.stepUp=()=>{
       figure.step({x:0, y:-1})
   };
   figure.stepDown = ()=>{
       figure.step({x:0, y:1});
       console.log('down');
   };


   return figure;
}

export default getRandomFigure;
