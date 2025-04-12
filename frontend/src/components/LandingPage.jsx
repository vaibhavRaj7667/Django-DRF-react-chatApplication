import React from 'react'
import Navbar from './Navbar'
import SplitText from '../compo/SplitText'
import '../stylesheet/landing.css'
const LandingPage = () => {


  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  return (
    <div>
      <div className='core'>
      <Navbar/>

      <div className='hero'>

        <div className='discription'>
          <h1 className='t1'>
            Connect with <br/>anyone,
          </h1>
          <h1 className='t2'>
            anywhere in the <br/> world
          </h1>
          <p> ChatWave brings people together through seamless, real-time messaging. Share moments, collaborate on
          projects, or simply stay in touch with the people who matter most.</p>
        </div>

        <div className='banner'>
          <img src="https://skerritt.blog/content/images/2023/06/image-71.png" alt="" style={{height:'300px'}}/>

        </div>

      </div>
     
    
      </div>
    </div>
  )
}

export default LandingPage
