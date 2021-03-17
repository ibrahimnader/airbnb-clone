import React from 'react'
import './Safety.css'
export default function Safty() {
    return (
        <div className='container' >
        <h1 className="safty_txt">Safety is our priority</h1>
        <div className="row book">
            <div className="col-sm ">
               <h4>Host insurance and h3rotection</h4>
               <p>
               To support you in the rare event of an incident, each booking on Airbnb includes property damage protection of up to $1M USD and liability insurance of up to $1M USD.
               </p>
               <p className="myLink"><b><a href="default.asp" target="_blank" className="safty_a">How you're protected while hosting</a></b></p>
            </div>
            <div className="col-sm">
               <h4>COVID-19 safety guidance and support</h4>
               <p>
                  To help protect the health of our community, we’ve partnered with experts to create safety practices for everyone, plus a cleaning process for hosts.
                  Explore the enhanced cleaning process
               </p>
               <p className="myLink"><b><a href="default.asp" target="_blank" className="safty_a">Explore the enhanced cleaning process</a></b></p>
            </div>
            <div className="col-sm">
               <h4>Requirements for all guests</h4>
               <p>
               To give hosts peace of mind, we offer guest identification and let you check out reviews of guests before they book. Our new Guest Standards Policy sets higher expectations for behavior.
               </p>
               <p className="myLink"><b><a href="default.asp" target="_blank" className="safty_a">Steps we take to help hosts feel confident</a></b></p>
            </div>
       </div>
   </div>
    )
}
