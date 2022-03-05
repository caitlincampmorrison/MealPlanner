import React from "react"
import {connect} from "react-redux"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

class AddInstructions extends React.Component {
    constructor(props) {
      super(props);
      this.state = { values: [] };
    }
  
    createUI(){
       return this.state.values.map((el, i) => 
           <div key={i}>
              {i+1}. <TextField fullWidth variant="standard" size="small" type="text" name="instruction" value={el} onChange={this.handleChange.bind(this, i)} sx={{marginBottom:2}} />
             
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
            <AddIcon type='button' value='add' onClick={this.addClick.bind(this)}/>
        </form>
      );
    }
  }

  export default connect(null, null)(AddInstructions)


 //<RemoveIcon type='button' value='remove' onClick={this.removeClick.bind(this, i)} />