import React from 'react';
import { Button, Form, Segment, Checkbox } from 'semantic-ui-react';

const AddItem = (props) => {
	const { addItem } = props;
	return (
		// <Segment>
		//     <Item item={}/>
		// </Segment>
		<Segment>
			<Form
				className='addItem'
				onSubmit={(e) => {
					addItem(
						e,
						e.target.title.value,
						e.target.subtitle.value,
						e.target.description.value,
						e.target.worth_rating.value,
						e.target.skill.checked,
						e.target.amount.value
					);
				}}>
				<Form.Group widths={2}>
					<Form.Input
						name='title'
						label='Title'
						placeholder='Title'
						type='text'
						required
					/>
					<Form.Input
						name='subtitle'
						label='Subtitle'
						placeholder='Subtitle'
						type='text'
						required
					/>
					<Form.TextArea
						name='description'
						label='Description'
						placeholder='Description'
						type='text'
						required
					/>
					<Form.Group inline required>
						<label>Worth</label>
						<Form.Radio
							name='worth_rating'
							label='$'
							value='1'

							// checked={value === 1}
							// onChange={this.handleChange}
						/>
						<Form.Radio
							name='worth_rating'
							label='$$'
							value='2'

							// checked={value === 2}
							// onChange={this.handleChange}
						/>
						<Form.Radio
							name='worth_rating'
							label='$$$'
							value='3'

							// checked={value === 3}
							// onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Field>
						<Checkbox label='Skill' name='skill' />
					</Form.Field>
					<Form.Input
						name='amount'
						label='Amount/Session Time'
						placeholder='Amount/Session Time'
						type='number'
						min='1'
						required
					/>
				</Form.Group>

				<Button name='addItem' type='submit'>
					Submit
				</Button>
			</Form>
		</Segment>
	);
};

export default AddItem;
