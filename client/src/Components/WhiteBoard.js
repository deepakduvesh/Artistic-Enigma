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


	const [eraser ,setEraser] = useState("white");
	const[lineColor, setLineColor] = useState("blue");
	const[lineOpacity, setLineOpacity] = useState(1);
	const [width, setWidth] = useState(1)


	const [mode, setMode]= useState('draw');
	const [startX , setStartX] = useState(null);
	const [startY , setStartY] = useState(null);

	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [currentCursor, setCurrentCursor] = useState('default');

	useEffect(()=>{

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		wordRef.current = chooseWord;
		ctx.lineCap =  'round'

		ctx.strokeStyle = lineColor
		if(mode !== 'pen'){
		ctx.lineWidth = width
		ctx.globalAlpha = lineOpacity; 
		}

		ctx.fillStyle = lineColor


		if(mode ==='rect'){
			
            const startDrawing = (event)=>{
                ctx.beginPath()
				setStartX( event.offsetX);
				setStartY( event.offsetY);

		
                
                setIsDrawing(true);
				setIsMouseDown(true)	
            }
            const draw = (event)=>{
				setCursorPosition({ x: event.clientX, y: event.clientY });
			setCurrentCursor('rects');
				
                if(!isDrawing) return;

                   	
            }
    
            const endDrawing = (event)=>{
				const x = event.offsetX;
				const y = event.offsetY;
				//ctx.clearRect(startX,startY, x - startX, y - startY);	
				ctx.strokeRect(startX,startY, x - startX, y - startY);
                
                   // ctx.closePath()
                    setIsDrawing(false)	
            }
        
          
    
            canvas.addEventListener('mousedown',startDrawing);
            canvas.addEventListener('mousemove',draw);
            canvas.addEventListener('mouseup',endDrawing)
            return () =>{
                canvas.removeEventListener('mousedown',startDrawing);
                canvas.removeEventListener('mousemove',draw);
                canvas.removeEventListener('mouseup',endDrawing);
               
            }
        }
		else if(mode === 'draw'){   
		
	
			const startDrawing = (event)=>{
					ctx.beginPath()
					const x = event.offsetX;
					const y = event.offsetY;
					ctx.moveTo(x,y);		
					setIsDrawing(true);
					setIsMouseDown(true)	
					
			}
		
			const draw = (event)=>{
				setCursorPosition({ x: event.clientX, y: event.clientY });
				setCurrentCursor('draws');
				
				if(!isDrawing) return;
				
					const x = event.offsetX;
					const y = event.offsetY
					ctx.lineTo(x,y)
					ctx.stroke()	
			}
	
			const endDrawing = ()=>{
				
					ctx.closePath()
					setIsDrawing(false)	
			}
		
		  
	
			canvas.addEventListener('mousedown',startDrawing);
			canvas.addEventListener('mousemove',draw);
			canvas.addEventListener('mouseup',endDrawing)
			return () =>{
				canvas.removeEventListener('mousedown',startDrawing);
				canvas.removeEventListener('mousemove',draw);
				canvas.removeEventListener('mouseup',endDrawing);
			   
			}
		}
		else if(mode === 'clear'){   
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		else if(mode ==='line'){
			
			const startDrawing = (event)=>{
				ctx.beginPath()
				setStartX( event.offsetX);
				setStartY( event.offsetY);
				
				setIsDrawing(true);
				setIsMouseDown(true)	
			}
			const draw = (event)=>{
				
				setCursorPosition({ x: event.clientX, y: event.clientY });
				setCurrentCursor('lines');
				if(!isDrawing) return;
				
					
					 ctx.moveTo(startX ,startY);	
					
			   
			}
	
			const endDrawing = (event)=>{
				
				   // ctx.closePath()
				   const x = event.offsetX;
				   const y = event.offsetY;	
				   ctx.lineTo(x,y)
				   ctx.stroke();
					setIsDrawing(false)	
			}
		
		  
	
			canvas.addEventListener('mousedown',startDrawing);
			canvas.addEventListener('mousemove',draw);
			canvas.addEventListener('mouseup',endDrawing)
			return () =>{
				canvas.removeEventListener('mousedown',startDrawing);
				canvas.removeEventListener('mousemove',draw);
				canvas.removeEventListener('mouseup',endDrawing);
			   
			}
		}
		else if(mode === 'pen'){   
		
			const startDrawing = (event)=>{
					ctx.beginPath()
					const x = event.offsetX;
					const y = event.offsetY;
					ctx.lineWidth = "1"
					ctx.globalAlpha = "1"
					ctx.moveTo(x,y);		
					setIsDrawing(true);
					setIsMouseDown(true)	
	
					
			}
		
			const draw = (event)=>{
				setCursorPosition({ x: event.clientX, y: event.clientY });
				setCurrentCursor('pens');
				
				if(!isDrawing) return;
				
					const x = event.offsetX;
					const y = event.offsetY
					ctx.lineTo(x,y)
					ctx.stroke()	
			}
	
			const endDrawing = ()=>{
				
					ctx.closePath()
					setIsDrawing(false)	
			}
		
		  
	
			canvas.addEventListener('mousedown',startDrawing);
			canvas.addEventListener('mousemove',draw);
			canvas.addEventListener('mouseup',endDrawing)
			return () =>{
				canvas.removeEventListener('mousedown',startDrawing);
				canvas.removeEventListener('mousemove',draw);
				canvas.removeEventListener('mouseup',endDrawing);
			   
			}
		}

		

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
			setCursorPosition({ x: event.clientX, y: event.clientY });
			setCurrentCursor('draws');
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
		// ,[isDrawing,turn,chooseWord]
	})

	const handle = (word)=>{
		setChooseWord(word)
		const data = {
			word: word,
			id: id,
		}
		socket.emit("choosedWord",data)
	}	


	const containerStyle = {
		position: 'relative',
	  };
	
	  const cursorStyle = {
		position: 'fixed',
		top: cursorPosition.y,
		left: cursorPosition.x,
		pointerEvents: 'none', 
		zIndex: 9999, 
		cursor: 'none', 
	  };


	const handleButtonClick = (cursorType) => {
		setCurrentCursor(cursorType);
	  };


	const getCursorSVG = () => {
		switch (currentCursor) {
		  case 'pens':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
				<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 
				0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
				489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
				</svg>
			);
		  case 'draws':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z"/></svg>
			);
		  case 'rects':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 48V464H48V48H464zM48 0H0V48 464v48H48 464h48V464 48 0H464 48z"/></svg>
			);
			case 'buckets':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6H386.7l42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>
				);

				case 'circles':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
				);

				case 'lines':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M5.1 9.2C13.3-1.2 28.4-3.1 38.8 5.1l592 464c10.4 8.2 12.3 23.3 4.1 33.7s-23.3 12.3-33.7 4.1L9.2 42.9C-1.2 34.7-3.1 19.6 5.1 9.2z"/></svg>
				);

				case 'clears':
				return (
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
				);
		  default:
			return null;
		}
	  };


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
			<button onClick={() => setMode('pen')}>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
						<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 
						0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
						489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
						</svg>
					</button>
						
					<button onClick={() => setMode('draw')}>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z"/></svg>
					</button>
            		<button onClick={() => setMode('bucket')}>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6H386.7l42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>
					</button>
					<button onClick={() => setMode('clear')}>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
					</button>
				   

				<p>Tools</p>
					
			</div>
					
			<div className="flex-shapes">
			<button onClick={() => setMode('line')}>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M5.1 9.2C13.3-1.2 28.4-3.1 38.8 5.1l592 464c10.4 8.2 12.3 23.3 4.1 33.7s-23.3 12.3-33.7 4.1L9.2 42.9C-1.2 34.7-3.1 19.6 5.1 9.2z"/></svg>
					</button>
			    	<button onClick={() => setMode('rect')}>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 48V464H48V48H464zM48 0H0V48 464v48H48 464h48V464 48 0H464 48z"/></svg>
					</button>
					<button onClick={() => setMode('circle')}>
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
					</button>
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