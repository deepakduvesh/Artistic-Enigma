import React from "react";
import '../Styles/WhiteBoard.css';


const WhiteBoardTools =({setLineColor,setWidth ,setLineOpacity}) =>
{
    const handleWidthChange = (e) => {
        setWidth(parseInt(e.target.value, 10));
      };
      
    return(
        <div className="flex-color tool">
           <div className="size ">	
            <div className="color-box">
            <div >
            <div>
             
            <button className="button button1" onClick={(e) =>{setLineColor("#fafcfc")}}></button>
            <button className="button button2" onClick={(e) =>{setLineColor("#fafcfc")}}></button>
            <button className="button button3" onClick={(e) =>{setLineColor("#1e7d21")}}></button>
            <button className="button button4" onClick={(e) =>{setLineColor("#1e727d")}}></button>
            <button className="button button5" onClick={(e) =>{setLineColor("#511e7d")}}></button>
            <button className="button button6" onClick={(e) =>{setLineColor("#300e06")}}></button>
            
            </div>
            <div>
            
            <button className="button button7" onClick={(e) =>{setLineColor("#101212")}}></button>
            <button className="button button8"onClick={(e) =>{setLineColor("#ccb22f")}}></button>
            <button className="button button9"onClick={(e) =>{setLineColor("#1e7d51")}}></button>
            <button className="button button10"onClick={(e) =>{setLineColor("#1e247d")}}></button>
            <button className="button button11"onClick={(e) =>{setLineColor("#7d1e6f")}}></button>
            <button className="button button12"onClick={(e) =>{setLineColor("#3e1545")}}></button>
            </div>
            </div>
            <div className="setline">
            
            
            <input
                type="color"
                onChange={(e) =>{
                    setLineColor(e.target.value);
                }}
            />
            </div>
            </div>
            </div>



            <div className="size-2">
            
            <label htmlFor="width"></label>
            <select name="width" id="width" onChange={handleWidthChange}>
                <option value="1">1</option>
                <option value="4">2</option>
                <option value="9">3</option>
                <option value="16">4</option>
                <option value="25">5</option>
           </select>
           <p><b>Size</b></p>
           </div>


           <div className="size-2">

           <label htmlFor="width"></label>
            <select name="width" id="width" onChange={(e) => {
                    setLineOpacity(e.target.value/100);
                }}>
                <option value="100">1</option>
                <option value="50">2</option>
                <option value="25">3</option>
                <option value="12">4</option>
                <option value="6">5</option>
           </select>
           <p><b>Brushes</b></p>
            </div>



            <div className="size-2">
            <button onClick={(e) =>{setLineColor("white")}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/></svg>
                </button>
                <p><b>Eraser</b></p>
            </div>
        </div>
    )

};

export default WhiteBoardTools;