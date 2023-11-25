import React from 'react';
import  '../Styles/Team.css';
import shivam from '../Assets/shivam.png';
import prabhat from '../Assets/prabhat.jpeg';
import deepak from '../Assets/deepak.jpeg'
import gsap from 'gsap';
import {useEffect } from 'react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../Components/MySvgIcon';

const Team = () => {

    useEffect(() => {
    
        gsap.to('.card_Container .card',1,{
            delay:.9,
            opacity:10,
         });
    }, []);

   
  return (
    <> 
        <div className='wrapper'>
            <div className='title3'>
            <h4> OUR TEAM SECTION </h4>

            </div>
            <div className="card_Container">
                <div className="card">
                    <div className="imbBx">
                        <img src={shivam} alt="shivam"></img>
                    </div>

                    <div className="content3">
                        <div className="contentBx">
                            <h3>Shivam Kumar<br></br><span>web developer</span></h3>
                        </div>
                        <ul className='sci'>
                            <li className='lil'>
                                <a href='https://www.instagram.com/shivam_kr861/'>
                                   <InstagramIcon/>
                                </a>
                            </li>
                            <li className='lil'>
                                <a href='https://github.com/shivamkrmnnit'>
                                   <GithubIcon/>
                                </a>
                            </li>
                             <li className='lil'>
                                <a href='https://www.linkedin.com/in/shivamkrmnnit/'>
                                   <LinkedinIcon/>
                                </a>
                            </li>
                        </ul>
                    </div> 
                </div>
                
                <div className="card">
                    <div className="imbBx">
                        <img src={deepak} alt="deepak"></img>
                    </div>

                    <div className="content3">
                        <div className="contentBx">
                            <h3>Deepka Duvesh<br></br><span>Web Developer</span></h3>
                        </div>
                        <ul className='sci'>
                            <li className='lil'>
                                <a href='https://www.instagram.com/deepak_duvesh/'>
                                    <InstagramIcon/>
                                </a>
                            </li>
                            <li className='lil'>
                                <a href='https://github.com/deepakduvesh'>
                                    <GithubIcon/>
                                </a>
                            </li>
                             <li className='lil'>
                                <a href='https://www.linkedin.com/in/deepak-duvesh-9835451b1/'>
                                   <LinkedinIcon/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="imbBx">
                        <img src={prabhat} alt="prabhat"></img>
                    </div>

                    <div className="content3">
                        <div className="contentBx">
                            <h3>Prabhat Tripathi<br></br><span>Web Developer</span></h3>
                        </div>
                        <ul className='sci'>
                            <li className='lil'>
                                <a href='https://www.instagram.com/jerry__.001/'>
                                   <InstagramIcon/>
                                </a>
                            </li>
                            <li className='lil'>
                                <a href='https://github.com/prabhat-4165'>
                                    <GithubIcon/>
                                </a>
                            </li>
                             <li className='lil'>
                                <a href='https://www.linkedin.com/in/prabhat-tripathi-89a748251/'>
                                   <LinkedinIcon/>
                                </a>
                            </li>
                        </ul>
                    </div>

                    
                </div>

            </div>

            

        </div>
    </>
  );
}

export default Team;
