import React,{useCallback, useEffect,useRef,useState} from 'react'
import '../Styles/WhiteBoard.css';
import {socket} from "../App.js"

 const WhiteBoard = ({id}) => {

  	const canvasRef = useRef(null)
	const wordRef = useRef("")
	const startTime = Date.now()
	const [isDrawing, setIsDrawing] = useState(false);
	const [words, setWords] = useState([]);
	const [isMouseDown, setIsMouseDown] = useState(false)
	const [chooseWord, setChooseWord] = useState("")
	const [turn,setturn] = useState(false)


	useEffect(()=>{

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		wordRef.current = chooseWord;
		ctx.lineCap =  'round'
		ctx.strokeStyle = "red"
		ctx.lineWidth = '2'

		socket.on("turn",(data)=>{
			if(data.currPlayer===id){
				console.log("my turn")
				clearCanvas()
				setturn(true);		
				setWords(data.words)
			}
		})
		
	
		const clearCanvas = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}


		const startDrawing = (event)=>{
			if(turn && chooseWord){
				ctx.beginPath()
				const x = event.offsetX;
				const y = event.offsetY;
				ctx.moveTo(x,y);
				const data = {x:x,y:y}
				socket.emit('sendstart',data)
				setIsDrawing(true);
				setIsMouseDown(true)
			}
		}

		const draw = (event)=>{
			if(!isDrawing || !turn) return;
				const x = event.offsetX;
				const y = event.offsetY
				ctx.lineTo(x,y)
				const data = {x:x,y:y}
				ctx.stroke()
				socket.emit('senddraw',data);
		}

		const endDrawing = ()=>{
			if(turn && chooseWord){
				ctx.closePath()
				setIsDrawing(false)
			}	
		}

		canvas.addEventListener('mousedown',startDrawing);
		canvas.addEventListener('mousemove',draw);
		canvas.addEventListener('mouseup',endDrawing)

		socket.on('receivestart',(data)=>{
			ctx.beginPath();
			ctx.moveTo(data.x,data.y)
		})

		socket.on('receivedraw',(data)=>{
			ctx.lineTo(data.x,data.y)
			ctx.stroke();
		})

		socket.on("endTurn",(data)=>{
			if(data===id){
				setIsDrawing(false);
				setturn(false)
				setChooseWord("")
			}
			clearCanvas()
		})
		

		return () =>{
			canvas.removeEventListener('mousedown',startDrawing);
			canvas.removeEventListener('mousemove',draw);
			canvas.removeEventListener('mouseup',endDrawing);
			
		}
			
	},[isDrawing,turn,chooseWord])

	const handle = (word)=>{
		
		setChooseWord(word)
	}	


  return (
    <>

    <div className="white-board">
		
	{
		words && turn && !chooseWord?
		(
		<ul>
        	{words.map((word, index) => (
          	<li key={index} onClick={() => handle(word)}>
            	{word}
          	</li>
        	))}
      	</ul>
		):""

	}
	
    <h1> whiteboard.</h1>
    <canvas ref={canvasRef}
          width={600}
          height={550}
          style={{ border: '1px solid black' }}
		  >
		</canvas>
		{turn ? "Your Turn" : "Opponent's Turn"}
    </div>
    </>
  )
}

export default WhiteBoard;