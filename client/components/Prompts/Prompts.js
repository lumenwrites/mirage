import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import promptCategories from '../../../json/prompts/prompts.json'
import locations from '../../../json/prompts/locations.json'

var categories = [
    "Adventure Goal",
    "Action/Adventure",
    "Exploration",
    "Social/Intrigue",
    "Mystery/Investigation",
    "Stealth/Heist",
    "Complication",
    "Description",
    "Goal",
    "Powers"
]

class Prompts extends Component {
    state = {
	seeds: Array.from({length: promptCategories.length}, () => Math.random()),
	locationSeed: Math.random()
    }

    renderPrompt = (type) => {
	/* Turn category type (like Action/Adventure) into an index */
	var i = categories.findIndex((t)=> t == type)
	var c = promptCategories[i]
	var prompt = c.prompts[
	    Math.floor(this.state.seeds[i]*c.prompts.length)
	]
	return (
	    <div className="prompt">
		<div className="refresh"
		     onClick={()=> {
			 var seeds = [...this.state.seeds]
			 seeds[i] = Math.random()
			 this.setState({seeds})
		     }}>
		    <FontAwesomeIcon icon={["fas", "dice"]}/>
		</div>
		<span className="label">{c.type}:</span>    
		<div className="clearfix"/>
		<div className="text">
		    {prompt}
		</div>
	    </div>
	)
    }
    renderLocation = () => {
	var location = locations[
	    Math.floor(this.state.locationSeed*locations.length)
	]
	return (
	    <div className="prompt">
		<div className="refresh"
		     onClick={()=> {
			 this.setState({locationSeed:Math.random()})
		     }}>
		    <FontAwesomeIcon icon={["fas", "dice"]}/>
		</div>
		<span className="label">{location.title}</span>
		<div className="clearfix"/>
		<img src={location.url}/>
	    </div>
	)
    }
    
    render() {
	return (
	    <div className="main-wrapper">
		<div className="prompts">
		    <h1>Adventure Prompts</h1>
		    <h3>Story Idea</h3>
		    {this.renderPrompt("Adventure Goal")}
		    {this.renderPrompt("Complication")}
		    <h3>Antagonist</h3>
		    {this.renderPrompt("Description")}
		    {this.renderPrompt("Goal")}
		    {/* {this.renderPrompt("Powers")} */}
		    <h3>Setting</h3>
		    {this.renderLocation()}
		    <h3>Challenges</h3>
		    {this.renderPrompt("Action/Adventure")}
		    {this.renderPrompt("Exploration")}
		    {this.renderPrompt("Social/Intrigue")}
		    {this.renderPrompt("Mystery/Investigation")}
		    {this.renderPrompt("Stealth/Heist")}
		    <h3>Useful Resources</h3>
		    <ul>
			<li>
			    <a href="https://docs.google.com/document/d/1R7bOixB-1tN7U3lEi47L-NDA91CibDJ0VTgrbKO2nlQ/">Adventure Template</a> - use it to develop these prompts into a complete adventure.
			</li>
			<li><a href="/challenges">Full List of Challenges</a> and a guide on using them.</li>
			<li><a href="/guide/adventure-design">Adventure Writing Guide</a></li>
		    </ul>
		</div>
	    </div>
	)
    }
}

export default Prompts


