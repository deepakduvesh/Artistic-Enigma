
import React from 'react';
import  '../Styles/Contact.css';
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import {useEffect } from 'react';

const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_51p246k', 'template_kv3qjd7', form.current, 'PGPPmCMfo2L-0IozC')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    useEffect(() => {
        gsap.to('h1', {
            scale:.5,
            opacity:10
            });
       
         gsap.to('p',2.5,{
            scale:.7,
            opacity:10,
            delay:.5,
            ease:"elastic.out(1,0.3)"
         });

         gsap.to('h3',1,{
           x: -300,
           scale:1,
           opacity:10,
           ease: "bounce.out",
         });
         gsap.to('h4 ',1,{
            x: +330,
           scale:1,
           opacity:10,
           ease: "bounce.out",
          
          });
         
    }, []);

   
  return (
    <>
    <div className='contact'>
        <h1>Contact Us</h1>
        <p>Fill your name and gmail and give us a message please</p>
        <div className='inside_contact'>
            <div className='info'>
                <h3>Contact info</h3>
                <div className='icon_divide'>
                    <a href='#'></a>
                    <div className='details'>
                        <h4>Address</h4>
                        <p>#45 house, 25 n road, 9 no,sector,UP, India</p>
                    </div>
                  
                </div>

                <div className='icon_divide'>
                    <a href='#'></a>
                    
                    <div className='details'>
                        <h4>Phone</h4>
                        <p>+91 888-6541-222</p>
                    </div>
                    
                </div>

                <div className='icon_divide'>
                    <a href='#'></a>
                    <div className='details'>
                        <h4>Gmail</h4>
                        <p>Contactus123@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='contact-message'>
                <h3>Message Me</h3>
                <form ref={form} onSubmit={sendEmail}>
                    <input type="text"  placeholder='Your Name' name="from_name"></input>
                    <input type="gmail"  placeholder='Your Gmail'  name="from_email"></input>
                    <textarea placeholder='Your Message'  name="message"></textarea>
                    <input type='submit' value='send'></input>
                </form>
            </div>
        </div>
    </div>

    
    </>
  );
}

export default Contact;
