import React,{useEffect,useRef,useState} from 'react'
import '../Styles/WhiteBoard.css';
import {socket} from "../App.js"

 const WhiteBoard = ({id}) => {

  const canvasRef = useRef(null)
	const startTime = Date.now()
	const [isDrawing, setIsDrawing] = useState(false);

	const [isMouseDown, setIsMouseDown] = useState(false)
	
	const [turn,setturn] = useState(false)
	const [start,setstart] = useState(false)

	useEffect(()=>{
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.lineCap =  'round'
		ctx.strokeStyle = "red"
		ctx.lineWidth = '2'

		socket.on("turn",(data)=>{
			if(data===id){
				console.log("my turn")
				clearCanvas()
				setturn(true);		
			}
		})
		
		socket.on("endTurn",(data)=>{
			if(data===id){
				setIsDrawing(false);
				setturn(false)
			}
			clearCanvas()
		})

		const clearCanvas = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		  }
		const startDrawing = (event)=>{
			if(turn){
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
			if(turn){
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

		
		return () =>{
			canvas.removeEventListener('mousedown',startDrawing);
			canvas.removeEventListener('mousemove',draw);
			canvas.removeEventListener('mouseup',endDrawing);
		}
			
	},[isDrawing,turn])


  return (
    <>

    <div className="white-board">
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