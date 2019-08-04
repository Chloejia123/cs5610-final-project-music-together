import React from 'react';

export default class ProfileField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            value: '',
        }
    }


    save = () => {
        // send a request to update name
        const { edit } = this.state
        this.setState({
            edit: !edit,
            value: '',
        })
    }

    edit = () => {
        const { edit } = this.state
        this.setState({
            edit: !edit
        })
    }

    change = (newValue) => {
        this.setState({
            value: newValue
        })
    }

    render() {
        const { field, currentValue } = this.props
        return (
            <div>
                {field}
                <br />
                {this.state.edit ? 
                    <input 
                        defaultValue={currentValue} 
                        onChange={(event) => this.change(event.target.value)} /> :
                    currentValue
                }
                <button onClick={() => this.state.edit ? this.save() : this.edit()}>Edit</button>
            </div>
        )
    }

}