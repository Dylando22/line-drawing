
MySample.main = (function(graphics) {
    'use strict';
    let segCount;
    let curveType;
    let showPoints;
    let showControl;
    let showLine;
    let move;
    let controlAdd = 1;
    let heartBeat = false;
    let heartCount = 0;
    let heartChange = 43;
    let beatAdd = -1.5;


    // Order: [x1,y1,x'1,y'1,x2,y2,x'2,y'2,tension]
    let controls = [250,250,50,450,750,250,850,50,0];
    let topPeak = [400,750,425,750,650,750, 575,750, 0];
    let heartRight = [500,750,360,560,500,820,500,850, 0];
    let heartLeft = [500,750,640,560,500,820,500,850, 0];

    let previousTime = performance.now();

    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        if(move){
            controls[3] -= controlAdd;
            controls[7] += controlAdd;
        }
        if(controls[3] <= 0 || controls[7] <= 0){
            controlAdd *= -1;
        }
        if(!heartBeat){
            heartCount += elapsedTime;
            if(heartCount > 400){
                heartBeat = true;
                heartCount = 0;
            }
        }
        else{
            topPeak[7] += heartChange;
            topPeak[3] -= heartChange;
            heartRight[1] += beatAdd ;
            heartLeft[1] += beatAdd;
            heartRight[2] += beatAdd *2;
            heartLeft[2] -= beatAdd *2;
            heartRight[3] += beatAdd *2;
            heartLeft[3] += beatAdd *2;
            heartRight[5] -= beatAdd ;
            heartLeft[5] -= beatAdd;
            heartRight[7] -= beatAdd ;
            heartLeft[7] -= beatAdd;
            if(topPeak[7] >= 1610){
                heartChange *= -1;
                beatAdd *= -1;
            }
            else if(topPeak[7] <= 750){
                topPeak[7] = 750;
                topPeak[3] = 750;
                heartBeat = false;
                heartChange *= -1;
                beatAdd *= -1;

            }
        }


    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear();

        // draw middle line
        graphics.drawLine(0,500,1000,500,'white')
        if(curveType === 4){
            graphics.drawCurve(0, controls, segCount, showPoints, showLine, showControl , "blue" )
            graphics.drawCurve(1, controls, segCount, showPoints, showLine, showControl , "blue" )
            graphics.drawCurve(2, controls, segCount, showPoints, showLine, showControl , "blue" )
            graphics.drawCurve(3, controls, segCount, showPoints, showLine, showControl , "blue" )
        }
        else{
            graphics.drawCurve(curveType, controls, segCount, showPoints, showLine, showControl , "blue" )
        }
        graphics.drawLine(0,750,400,750,'lime');
        graphics.drawCurve(3,topPeak,50,false,true,false,'lime');
        graphics.drawCurve(3,heartRight,50,false,true,false,'red');
        graphics.drawCurve(3,heartLeft,50,false,true,false,'red');
        graphics.drawLine(650,750,1000,750,'lime');

    }


    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {

        let elapsedTime = time - previousTime;
        previousTime = time;
        update(elapsedTime);
        render();

        requestAnimationFrame(animationLoop);
    }

    function initialize(){
        graphics.initialize();
        let curveInput = document.getElementById("curveType");
        curveInput.value = 0;
        curveType = 0;
        curveInput.addEventListener("change", (event) => {
            curveType = parseInt(event.target.value);

        });
        let segInput = document.getElementById("segCount");
        segInput.value = 50;
        segInput.addEventListener('change', (event) => {
            if(event.target.value <= 50 && event.target.value > 0){
                segCount = event.target.value;
                console.log(segCount);
            }
        })
        segCount = 50;
        let pointsInput = document.getElementById("showPoints");
        pointsInput.checked = true;
        showPoints = true;
        pointsInput.addEventListener('change', () => {
            showPoints = !showPoints;
            console.log(showPoints);
        }) 
        let lineInput = document.getElementById("showLine");
        lineInput.checked = true;
        showLine = true;
        lineInput.addEventListener('change' , () => {
            showLine = !showLine;
            console.log(showLine)
        })
        let movement = document.getElementById("move");
        movement.checked = true;
        move = true;
        movement.addEventListener('change' , () => {
            move = !move;
            console.log(move)
        })
        let controlInput = document.getElementById("showControl");
        controlInput.checked = true;
        showControl = true;
        controlInput.addEventListener('change', () => {
            showControl = !showControl;
            console.log(showControl);
        })
        let tensionControl = document.getElementById("tension");
        tensionControl.value = 5;
        controls[8] = 5;
        tensionControl.addEventListener('change', (event) => {
            controls[8] = event.target.value;
        })

    }
    console.log('initializing...');
    initialize();
    requestAnimationFrame(animationLoop);

}(MySample.graphics));
