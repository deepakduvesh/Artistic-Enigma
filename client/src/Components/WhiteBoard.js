import React,{useCallback, useEffect,useRef,useState} from 'react'
import '../Styles/WhiteBoard.css';
import WhiteBoardTools from "./WhiteBoardTools.js"
import {socket} from "../App.js"
import Time from './Time.js';
import UnderscoreDisplay from './UnderscoreDisplay.js';
import html2canvas from "html2canvas";
import {UndoIcon, RedoIcon, DownloadIcon, ViewIcon, HideIcon, CircleIcon, RectIcon, LineIcon, DeleteIcon, BucketIcon, DrawIcon, PenIcon} from "../Components/MySvgIcon.js";

 const WhiteBoard = ({id,username,email,guessed,setGuessed}) => {
  	const canvasRef = useRef(null)
	const wordRef = useRef("")
	const startTime = Date.now()
	const [isDrawing, setIsDrawing] = useState(false);
	const [words, setWords] = useState([]);
	const [isMouseDown, setIsMouseDown] = useState(false)
	const [chooseWord, setChooseWord] = useState("")
	const [turn,setturn] = useState(false)
	const [roomNo,setRoomNo] = useState(0);
	const [choosenWord, setChoosenWord] = useState("")

	const [winWidth, setWinWidth] = useState(window.innerWidth);

	
	const [eraser ,setEraser] = useState("white");
	const[lineColor, setLineColor] = useState("blue");
	const[lineOpacity, setLineOpacity] = useState(1);
	const [width, setWidth] = useState(1)

	const [seconds, setSeconds] = useState(0)
	const [mode, setMode]= useState('draw');
	const [startX , setStartX] = useState(null);
	const [startY , setStartY] = useState(null);
	const [noturn , setNoturn] = useState(false);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [currentCursor, setCurrentCursor] = useState('default');

	const [history, setHistory] = useState([]);
	const [currentState, setCurrentState] = useState(null);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [value , setValue] = useState(0);
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

		const fill = ()=>{
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		ctx.fillStyle = lineColor

		socket.on("turn",(data)=>{
			if(data.currPlayer===email){
				console.log("my turn",data)
				clearCanvas()
				setturn(true);		
				setWords(data.words)
				setRoomNo(data.roomNo);
			}
			else{
				setNoturn(true);
				console.log("not my turn");
			}
			
		})
		
		
		const clearCanvas = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		const interval = setInterval(() => {
			setSeconds((prevSeconds)=>prevSeconds+1)
		},1000);

		const startDrawing = (event)=>{
			if(turn && chooseWord){
				ctx.beginPath()
				if(mode === 'draw'){
					const x = event.offsetX;
					const y = event.offsetY;
					ctx.moveTo(x,y);
					const data = {x:x,y:y,color:lineColor,width:width,mode:'draw',roomNo:roomNo}
					socket.emit('sendstart',data)
					startDrawHistory();
				}else{
					setStartX( event.offsetX);
					setStartY( event.offsetY);
					startDrawHistory();
				}
				
				setIsDrawing(true);
				setIsMouseDown(true)
			}
		}


		const startDrawHistory = () =>{
			const newHistory = history.slice(0, historyIndex + 1);
			const newCurrentState = canvas.toDataURL();
			setHistory([...newHistory, newCurrentState]);
			setCurrentState(newCurrentState);
			setHistoryIndex(newHistory.length);
		}


		const draw = (event)=>{
			setCursorPosition({ x: event.clientX, y: event.clientY });
			if(!isDrawing || !turn) return;	
				if(mode === 'draw'){
					const x = event.offsetX;
					const y = event.offsetY
					ctx.lineTo(x,y)
					const data = {x:x,y:y,mode:'draw',color:lineColor,width:width,roomNo:roomNo}
					ctx.stroke()
					socket.emit('senddraw',data);
				}
				else if(mode === 'rect'){
					setCurrentCursor('rects');
				}
				else if(mode === 'circle'){
					setCurrentCursor('circles')
				}
				else if(mode === 'bucket'){
					setCurrentCursor('buckets')
				}
				else if(mode === 'name'){
					setCurrentCursor('names')
				}
				
				drawHistory();	
		}
		

		const drawHistory = () =>{
			const newCurrentState = canvas.toDataURL();
    		setCurrentState(newCurrentState);
		}


		const endDrawing = (event)=>{
			if(turn && chooseWord){
				const x = event.offsetX;
				const y = event.offsetY;
				if(mode === 'rect'){
					const data = {x1:startX, y1:startY, x2:x-startX, y2:y-startY, mode:'rect',color:lineColor,width:width,roomNo:roomNo}
					ctx.strokeRect(startX,startY, x - startX, y - startY);
					socket.emit('senddraw',data);
				}
				else if(mode === 'circle'){
					drawCircle(x,y,startX,startY);
					const data = {x1:x, y1:y, x2:startX, y2:startY,mode:'circle',color:lineColor,width:width,roomNo:roomNo}
					socket.emit('senddraw',data);
				}
				else if(mode === 'bucket'){
					fill();
					const data = {mode:'bucket',roomNo:roomNo}
					socket.emit("senddraw",data)
				}
				drawHistory();
				setIsDrawing(false);
			}	
		}


		
		
		  
		  socket.on('performUndoRedo',(data)=>{
			redrawCanvas(data.state)
		  })

		if(mode === 'clear'){
			clearCanvas()
		}

		const drawCircle = (x,y,startX,startY)=>{
			const startAngle =0;
			const endAngle = 2*Math.PI;
			ctx.arc(startX, startY,Math.sqrt((x-startX)*( x-startX) + (y - startY)*(y - startY)) , startAngle, endAngle)
			ctx.stroke()
		}

		canvas.addEventListener('mousedown',startDrawing);
		canvas.addEventListener('mousemove',draw);
		canvas.addEventListener('mouseup',endDrawing)

		socket.on('receivestart',(data)=>{
			if(data.mode==='draw'){
				ctx.beginPath();
				ctx.moveTo(data.x,data.y)
			}
			
		})

		socket.on('receivedraw',(data)=>{
			ctx.strokeStyle = data.color
			ctx.lineWidth = data.width
			if(data.mode==='draw') {
				ctx.lineTo(data.x,data.y)
				ctx.stroke();
			}
			else if(data.mode === 'rect'){
				ctx.strokeRect(data.x1,data.y1,data.x2,data.y2);
			}
			else if(data.mode === 'circle'){
				ctx.beginPath()
				drawCircle(data.x1,data.y1,data.x2,data.y2);
			}
			else if(data.mode === 'bucket'){
				fill()
			}
		})

		socket.on("endTurn",(data)=>{
				setIsDrawing(false);
				setturn(false);
				setNoturn(false);
				setChooseWord("");
				setChoosenWord("");
				setWords([]);
				clearCanvas();
				setHistoryIndex(-1);
				setHistory([]);
				setCurrentState(null);
				setStartX(null);
				setStartY(null);
				setSeconds(0);
				setGuessed(false);
		})
		
		socket.on("choosenWord",(data)=>{
			setChoosenWord(data.word);
			console.log("choose word",choosenWord);
		})

		return () =>{
			canvas.removeEventListener('mousedown',startDrawing);
			canvas.removeEventListener('mousemove',draw);
			canvas.removeEventListener('mouseup',endDrawing);
			
		}
	},[isDrawing,turn,chooseWord,mode,id,history,historyIndex,words])

	const handle = (word)=>{
		setChooseWord(word)
		const data = {
			word: word,
			email: email,
			roomNo:roomNo,
		}
		socket.emit("choosedWord",data)
	}	

	const undo = () => {
		if (historyIndex > 0) {
		  setHistoryIndex(historyIndex - 1);
		  const previousState = history[historyIndex - 1];
		  setCurrentState(previousState);
		  redrawCanvas(previousState);
		  const data = {
			action:"undo",
			state:previousState,
			roomNo:roomNo
		  }
		  socket.emit('undoRedo',data);
		}
	  };
	  
	  const redo = () => {
		if (historyIndex < history.length - 1) {
		  setHistoryIndex(historyIndex + 1);
		  const nextState = history[historyIndex + 1];
		  setCurrentState(nextState);
		  redrawCanvas(nextState);
		  const data = {
			action:"redo",
			state:nextState,
			roomNo:roomNo
		  }
		  socket.emit('undoRedo',data);
		}
	  };
	  

	  const redrawCanvas = (state) => {
		const image = new Image();
		image.src = state;
		image.onload = () => {
		  const ctx = canvasRef.current.getContext('2d');
		  ctx.clearRect(0, 0, 900, 560);
		  ctx.drawImage(image, 0, 0);
		};
	  };

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
				<PenIcon/>
			);
		  case 'draws':
			return (
				<DrawIcon/>
			);
		  case 'rects':
			return (
				<RectIcon/>
			);
			case 'buckets':
				return (
					<BucketIcon/>
				);

				case 'circles':
				return (
					<CircleIcon/>
				);

				case 'lines':
				return (
					<LineIcon/>
				);

				case 'clears':
				return (
					<DeleteIcon/>
				);
				case 'names':
					return(
						<p>name</p>
						
					)
		  default:
			return null;
		}
	  };


	  const takeScreenShot=()=>{

		const element = document.getElementById("divToTakeScreenShotOf");
		if (!element) return;
	
	html2canvas(element).then((canvas)=>{
	   let image = canvas.toDataURL("image/jpeg");
	   console.log("the image is ", image);
			 const a = document.createElement("a");
	   a.href = image;
	   a.download = "Capture.jpeg";
	   a.click();
	
	}).catch(err=>{
	 console.error("did not take ss.");
	})
	}


  return (
    <>

		<div>
		<div className='tool-1'>
		
		{
			words && turn && chooseWord?(
				<div style={containerStyle}>
    
		<div style={cursorStyle}>{getCursorSVG()}</div>


		<div className="flex-container">
			<div className="tools">
			<WhiteBoardTools
				setLineColor={setLineColor}
				setWidth = {setWidth}
				setLineOpacity={setLineOpacity} 
			/>
			</div>

			<div className="flex-tools">
			<button onClick={() => setMode('pen')}>
					<PenIcon/>
					</button>
						
					<button onClick={() => setMode('draw')}>
					   <DrawIcon/>
					</button>
            		<button onClick={() => setMode('bucket')}>
					      <BucketIcon/>
					</button>
					<button onClick={() => setMode('clear')}>
					  <DeleteIcon/>
					</button>
					

				<p>Tools</p>
					
			</div>
					
			<div className="flex-shapes">
			<button onClick={() => setMode('line')}>
					<LineIcon/>
					</button>
			    	<button onClick={() => setMode('rect')}>
					     <RectIcon/>
					</button>
					<button onClick={() => setMode('circle')}>
					    <CircleIcon/>
					</button>
					<p>Shapes</p>
			</div>
			
			<div className="undo-redo-buttons">
			<button className='tools-button' onClick={undo}>
			   <UndoIcon/>
			</button>

			<button className='tools-button' onClick={redo}>
			   <RedoIcon/>
			</button>
		  </div>
	     </div>
		</div>
			):""
		}
		{
		words && turn && !chooseWord ?
		(
		<ul className='word'>
        	{words.map((word, index) => (
          <div className='word-box'>
			<li  key={index} onClick={() => handle(word)}>
            	{word}
          	</li></div>
        	))}
      	</ul>
		):
		(choosenWord && !turn)&&<UnderscoreDisplay choosenWord={choosenWord} guessed={guessed}/>


		
		}	
		{
			  (turn||noturn)&&<Time id = {id}/>
		}
	</div>
    <canvas id="divToTakeScreenShotOf" ref={canvasRef}
		width={window.innerWidth*(0.54)}
          height={500}
		  >
		</canvas>
		<div className='turn'>
		{turn ? "Your Turn" : "Opponent's Turn"}
		</div>
    </div>
        <div className="extra-buttons">
	    <div className="download-button">
		<button onClick={takeScreenShot} >
		  <DownloadIcon/>	
		</button>	
		 </div>

		    <div className='configure-names'>
			<button onClick={() => setMode('name')}>
			   <ViewIcon/>
			</button>

			<button onClick={() => setMode('rect')}>
			  <HideIcon/>
			</button>
			</div>
			</div>	
	
    </>
  )
}

export default WhiteBoard;