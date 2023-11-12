import React from "react";
import '../Styles/WhiteBoard.css';


const Tools =({setLineColor,setWidth ,setLineOpacity}) =>
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
            <div className="button13">
            <lebel></lebel>
            
            <input
                type="color"
                onChange={(e) =>{
                    setLineColor(e.target.value);
                }}
            />
            </div>
            </div>
            <p className="p"><b>Colours</b></p>
            </div>



            <div className="size">
            
            <label htmlFor="width"></label>
            <select name="width" id="width" onChange={handleWidthChange}>
                <option value="1">1</option>
                <option value="4">2</option>
                <option value="9">3</option>
                <option value="16">4</option>
                <option value="25">5</option>
           </select>
           <p className="p"><b>Size</b></p>
           </div>


           <div className="size">

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
           <p className="p"><b>Brushes</b></p>
            </div>



            <div className="size">
            <button onClick={(e) =>{setLineColor("white")}}>eraser</button>
            </div>

            
        </div>

    )

};

export default Tools;