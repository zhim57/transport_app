import React, { Component } from 'react';



class Timer extends Component {
    
    state = {  
       hour:new Date().getHours()
       
    }
    state = {  
      
       minutes:new Date().getMinutes() 
    }
callMe(){
    setInterval(()=>{

this.setState({minutes : new Date().getMinutes() });
}, 60000);
}
callMeH(){
    setInterval(()=>{
        this.setState({hour : new Date().getHours()});
        
    }, 60000);
};
render() { 
    let hh= 0;
    hh= this.state.hour ;
    const hh1 = hh < 10 ? '0' + hh : hh;
    
    let mm = 0;
    mm= this.state.minutes;
   const mm1= mm < 10 ? '0' + mm : mm;
   this.callMeH();
   this.callMe();
        return ( 
            <div className="logged-in-text">
                {/* className="App" */}
                <h1> {hh1}:{mm1} hrs</h1>
                <h2>

                     
                 

                </h2>
            </div>
         );
    }
}
 
export default Timer;