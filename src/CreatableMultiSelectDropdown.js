const { Component } = wp.element;
import CreatableSelect from "react-select/creatable";

class CreatableMultiSelectDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [],
    };
  }

  handleChange = (selected) => {
    this.setState({ selectedOptions: selected });
  };

  render() {
    return (
      <CreatableSelect
        isMulti
        options={[]}
        value={this.state.selectedOptions}
        onChange={this.handleChange}
      />
    );
  }
}


export default CreatableMultiSelectDropdown;