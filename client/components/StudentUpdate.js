import React, {Component} from "react"
import { connect } from "react-redux"
import { updateStudent } from "../store"

class StudentUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: props.student.first_name,
            last_name: props.student.last_name,
            email: props.student.email,
            gpa: props.student.gpa,
            campus_name: props.student.campus_name
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
        const { first_name, last_name, email, gpa} = this.state
        const campus_name = document.getElementById(`campus_name`).value
        this.props.updateStudent({id: this.props.student.id, first_name, last_name, email, gpa, campus_name})
    }
    render(){
        const {student} = this.props
        const {first_name, last_name, email, gpa } = this.state
        const { handleChange, handleSubmit} = this
        
        return (
            <form id="student-update-form" onSubmit={handleSubmit}>
                 <input 
                    name='first_name' 
                    placeholder="first name"
                    onChange={handleChange} 
                    value={first_name} 
                 />
                 <input 
                    name="last_name" 
                    placeholder="last name"
                    onChange={handleChange} 
                    value={last_name}
                />
                 <input 
                    name="email" 
                    placeholder="email"
                    onChange={handleChange} 
                    value={email}
                /> 
                <input 
                    name="gpa" 
                    placeholder="gpa"
                    onChange={handleChange} 
                    value={gpa}
                />  
                <select onChange={handleChange} id="campus_name">
                    <option key={this.props.student.id} 
                        value={this.props.student.campus_name}> 
                        {this.props.student.campus_name} 
                    </option>
                    {this.props.campuses.filter(campus => campus.name !== this.props.student.campus_name)
                    .map((campus) => (
                        <option key={campus.id} value={campus.name}>{campus.name}</option>
                        ))}
                </select> 
                <button type='submit'> update </button>
                 
            </form>
        )
    }
}
const mapStateToProps = (state, other) => {
    return {
        campuses: state.campuses,
        students: state.students,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateStudent: (student) => dispatch(updateStudent(student))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentUpdate)
