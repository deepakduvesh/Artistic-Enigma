import React from 'react';
import  '../Styles/Services.css';
import back from '../Assets/back.png';

import gsap from 'gsap';
import {useEffect } from 'react';

const Services = () => {

    useEffect(() => {
    
        gsap.to('section',1,{
          delay:.1,
            y : +756,
            opacity:10,
         });
        gsap.to('.details',1,{
            delay:1,
            x : +500,
            opacity:10,
        
        });

        gsap.to('.col-md-2',1,{
            delay:1.9,
            x : -500,
            opacity:10,
         });
       
    }, []);

  
  return (
    <> 
    <div className="complete-services">
    <section className='services-container' >
    <div className="menu">
      
    </div>
    <div className='row'>
        <div className='col-md-1'>
            <div className='details'>
                <h2>Test Your Gaming Skills</h2>
                <p>

                Players enter a virtual room where they can join friends <br></br>or play with random people.


                </p>
                <p>
                The game consists of several rounds, and in each round,<br></br> a different player gets a chance to draw a word.  
                </p>
                    
                <p>
                The drawing takes place in real-time, and other players<br></br> try to guess the word based on the drawing.
                </p>
                <p>
                Players earn points for guessing the word correctly,<br></br> and the player drawing also earns points based on how quickly <br></br>their word is guessed.
                </p>
   

            </div>

        </div>
        <div className='col-md-2'>
            <img src={back} alt="My image"></img>
        </div>

    </div>
    </section>
    </div>
    </>
  );
}

export default Services;
