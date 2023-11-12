import React,{useCallback, useEffect,useRef,useState} from 'react'
import '../Styles/WhiteBoard.css';
import Tools from "./WhiteBoardTools.js"
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



	const[lineColor, setLineColor] = useState("blue");
	const[lineOpacity, setLineOpacity] = useState(1);
	const [width, setWidth] = useState(1)

	useEffect(()=>{

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		wordRef.current = chooseWord;
		ctx.lineCap =  'round'

		ctx.strokeStyle = lineColor
		ctx.lineWidth = width
		ctx.globalAlpha = lineOpacity; 

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
		const data = {
			word: word,
			id: id,
		}
		socket.emit("choosedWord",data)
	}	


  return (
    <>

		<div>

		<div className='tool-1'>

		<div className="flex-container">
			<div className="title">
				<h1>Skribbl</h1>
			</div>
			<Tools
				setLineColor={setLineColor}
				setWidth = {setWidth}
				setLineOpacity={setLineOpacity} 
			/>

			<div className="flex-tools">

				<p>Tools</p>
					
			</div>
					
			<div className="flex-shapes">
					<p>Shapes</p>
			</div>


		</div>

		
		{
		words && turn && !chooseWord?
		(
		<ul className='word'>
        	{words.map((word, index) => (
          <div className='word-box'>
			<li  key={index} onClick={() => handle(word)}>
            	{word}
          	</li></div>
        	))}
      	</ul>
		):""

		}
	

	</div>
    <canvas ref={canvasRef}
          width={900}
          height={560}
          style={{ border: '1px solid black' }}
		  >
		</canvas>
		<div className='turn'>
		{turn ? "Your Turn" : "Opponent's Turn"}
		</div>
    </div>
	
    </>
  )
}

export default WhiteBoard;