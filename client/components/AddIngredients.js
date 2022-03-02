import React from "react"
import {connect} from "react-redux"

class AddIngredients extends React.Component {
    constructor(props) {
      super(props);
      this.state = { values: [] };
    }
  
    createUI(){
       return this.state.values.map((el, i) => 
           <div key={i}>
              <input type="text" name="ingredient" value={el||''} onChange={this.handleChange.bind(this, i)} />
              <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
           </div>          
       )
    }
    
    handleChange(i, event) {
       let values = [...this.state.values];
       values[i] = event.target.value;
       this.setState({ values });
       this.props.parentCallback(this.state.values.join('/'));
        event.preventDefault();
    }
    
    addClick(){
      this.setState(prevState => ({ values: [...prevState.values, '']}))
    }
    
    removeClick(i){
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ values });
    }
  
    render() {
      return (
        <form>
            {this.createUI()}        
            <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
        </form>
      );
    }
  }

  export default connect(null, null)(AddIngredients)
