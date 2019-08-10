import React, { Fragment } from 'react';


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
        const { _id, field, currentValue, updateFunc, isAuthenticated } = this.props

        return (
            !isAuthenticated && currentValue === undefined ? <div></div> :
            <div className="nugget">
                <h2 className="subtitle text-primary">{field}</h2>
                {isAuthenticated && this.state.edit ? 
                    <input 
                        defaultValue={currentValue} 
                        onChange={(event) => this.change(event.target.value)} /> :
                    currentValue
                }
                <br />
                {isAuthenticated ? 
                    <button 
                        className="btn btn-light"
                        onClick={() => this.state.edit ? 
                        this.save(updateFunc, _id, field, this.state.value) : 
                        this.edit()}>
                            {currentValue ===  undefined ? "Add" : "Edit"}
                    </button> : 
                    <div></div>
                }
            </div>
        )
    }

}