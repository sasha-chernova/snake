const figures = [
    [[0,0], [0,1], [1,0], [1,1]],
    [[0,2], [1,0], [1,1], [1,2]],
    [[0,1], [1,1], [1,0], [1,2]],
    [[0,0], [0,1], [1,1], [1,2]],
    [[0,0], [0,1], [0,2]]
]

function getRandomFigure(){

    const index = Math.floor(Math.random() * figures.length);
    const figure =figures[index];

   figure.step = ({x, y})=>{
       figure.forEach((item)=> {
               item[1] += x;
               item[0] += y;

           }
       )
       return figure;
   };
   figure.stepLeft = ()=> {
       console.log('left')
      return figure.step({x:-1, y:0});
   }
   figure.stepRight=()=>{
       console.log('right')
       figure.step({x:1, y:0})};
   figure.rotate = ()=>console.log('rotate');
   figure.stepDown = ()=>{
       // console.log('down');
       figure.step({x:0, y:1})};

   return figure;
}

export default getRandomFigure;
