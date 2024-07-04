
import React, {Component} from 'react'
import {Routes, Route} from 'react-router-dom'
import Section from './sections/section1/Section1'
import './Courses.css'

class Courses extends Component
{
	
	render()
	{
		return (
			<>
				<div className = 'container'>
					<div className = 'title py-3 text-center'>
						<h4 className = 'sub-title text-capitalize'>browse our <span>courses</span></h4>
					</div>
				</div>
				<Routes>
					<Route exact path = '/' element = {<Section />} />
				</Routes>
			</>
		)
	}
}

export default Courses