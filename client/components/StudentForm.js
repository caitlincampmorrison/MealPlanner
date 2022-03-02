import React, {Component} from "react"
import {connect} from "react-redux"
import { createStudent } from "../store"

const defaultState = {
    first_name: '',
    last_name: '',
    email: ''
}

class StudentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    handleSubmit (ev) {
        ev.preventDefault()
        const student = {}
        this.props.createStudent({...this.state})
    }
    render(){
        const {first_name, last_name, email} = this.props
        const { handleChange, handleSubmit} = this

        return (
            <form id="student-form" onSubmit={handleSubmit}>
                <p>Add Student</p>
                 <input 
                    name='first_name' 
                    placeholder="first name"
                    value={first_name} 
                    onChange={handleChange} 
                 />
                 <input 
                    name='last_name' 
                    placeholder="last name"
                    value={last_name}     
                    onChange={handleChange}                
                 />
                 <input 
                    name='email' 
                    placeholder="email"
                    value={email}   
                    onChange={handleChange}                  
                 />
                 <button 
                    type='submit'
                    > create 
                    </button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStudent: (student) => dispatch(createStudent(student))
    }
}

export default connect(null, mapDispatchToProps)(StudentForm)