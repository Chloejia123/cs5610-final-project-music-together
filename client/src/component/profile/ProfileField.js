import React from 'react';

export default class ProfileField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            value: '',
        }
    }


    save = (updateFunc, _id, field, value) => {
        let snippet = {}
        snippet['id'] = _id
        snippet[field.toLowerCase()] = value
        updateFunc(snippet)
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
        const { _id, field, currentValue, updateFunc } = this.props
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
                <button onClick={() => this.state.edit ? 
                    this.save(updateFunc, _id, field, this.state.value) : 
                    this.edit()}>Edit</button>
            </div>
        )
    }

}