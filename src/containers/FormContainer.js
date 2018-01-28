import React, {Component} from 'react';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import axios from 'axios';


class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			intent: '',
			fieldType: [],
			stepsOptions: [],
			stepsRangeSelection: '',
			selectedTypes: [],
			gstDetails: '',
			description: ''
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleIntentChange = this.handleIntentChange.bind(this);
		this.handleStepsSelect = this.handleStepsSelect.bind(this);
		this.handleGstChange = this.handleGstChange.bind(this);
		this.handleFieldType = this.handleFieldType.bind(this);
		this.handleSiblingsSelection = this.handleSiblingsSelection.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	}
	componentDidMount() {
		fetch('./fake_db.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
					fieldType: data.fieldType,
					stepsOptions: data.stepsOptions,
					stepsRangeSelection: data.stepsRangeSelection,
					description: data.description
				});
			});
	}
	handleIntentChange(e) {
		this.setState({ intent: e.target.value }, () => console.log('name:', this.state.intent));
	}
	handleGstChange(e) {
		this.setState({ gstDetails: e.target.value}, () => console.log('name:', this.state.gstDetails));
	}
	
	handleFieldType(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.selectedTypes.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedTypes.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.selectedTypes, newSelection];
		}
		this.setState({ selectedTypes: newSelectionArray }, () => console.log('pet selection', this.state.selectedTypes));
	}
	handleStepsSelect(e) {
		this.setState({ stepsRangeSelection: e.target.value }, () => console.log('age range', this.state.stepsRangeSelection));
	}
	handleSiblingsSelection(e) {
		this.setState({ siblingSelection: [e.target.value] }, () => console.log('siblingz', this.state.siblingSelection));
	}
	handleDescriptionChange(e) {
		// const textArray = e.target.value.split('').filter(x => x !== 'e');
		// console.log('string split into array of letters',textArray);
		// const filteredText = textArray.join('');
		// this.setState({ description: filteredText }, () => console.log('description', this.state.description));
		this.setState({ description: e.target.value }, () => console.log('description', this.state.description));
	}
	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			intent: '',
			selectedTypes: [],
			stepsRangeSelection :'',
			gstDetails: '',
			siblingSelection: [],
			currentPetCount: 0,
			description: ''
		});
		
		
	}
	
	

	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
			intent: this.state.intent,
			selectedTypes: this.state.selectedTypes,
			stepsRangeSelection : this.state.stepsRangeSelection,
			gstDetails: this.state.gstDetails,
			description: this.state.description
		};

		console.log('Send this in a POST request:', formPayload);
		
		/*fetch('/api/book', {
		method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formPayload)
    })*/
	
	/*fetch('/api/book/fetch')
			.catch(function(err) {
        console.log(err);
    });*/
	
	
    
	/*fetch('/api/book/', {
     method: 'POST',
      body: JSON.stringify(formPayload)
     }).then(function(res) {
      return res.json();
    });*/
	
	axios.post('/api/book/', formPayload)
 .then(res => {
 this.setState({ data: res });
 })
 .catch(err => {
 console.error(err);
 });
	
	this.handleClearForm(e);
	}
	
	
	
	
	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5>Pet Adoption Form</h5>
				<SingleInput
					inputType={'text'}
					title={'Intent Name'}
					name={'name'}
					controlFunc={this.handleIntentChange}
					content={this.state.intent}
					placeholder={'Type Intent Details'} />
				
				<CheckboxOrRadioGroup
					title={'Field Type'}
					setName={'pets'}
					type={'checkbox'}
					controlFunc={this.handleFieldType}
					options={this.state.fieldType}
					selectedOptions={this.state.selectedTypes} />
				<SingleInput
					inputType={'text'}
					title={'Gst Details'}
					name={'name'}
					controlFunc={this.handleGstChange}
					content={this.state.gstDetails}
					placeholder={'Type Gst Details'} />
				<Select
					name={'Steps Required'}
					placeholder={'Choose your steps range'}
					controlFunc={this.handleStepsSelect}
					options={this.state.stepsOptions}
					selectedOption={this.state.stepsRangeSelection} />
				<TextArea
					title={'If you currently own pets, please write their names, breeds, and an outline of their personalities.'}
					rows={5}
					resize={false}
					content={this.state.description}
					name={'currentPetInfo'}
					controlFunc={this.handleDescriptionChange}
					placeholder={'Please be thorough in your descriptions'} />
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>Clear form</button>
			</form>
		);
	}
}

export default FormContainer;
