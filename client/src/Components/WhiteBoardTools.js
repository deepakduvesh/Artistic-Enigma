import React from "react";
import '../Styles/WhiteBoard.css';


const Tools =({setLineColor,setWidth}) =>
{
    const handleWidthChange = (e) => {
        setWidth(parseInt(e.target.value, 10));
      };
      
    return(
        <div>

            <lebel></lebel>
            <input
                type="color"
                onChange={(e) =>{
                    setLineColor(e.target.value);
                }}
            />


<label htmlFor="width"></label>
            <select name="width" id="width" onChange={handleWidthChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
           </select>

        </div>

    )

};

export default Tools;