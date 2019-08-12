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
        if (this.state.value !== '') {
            let snippet = {}
            snippet['id'] = _id
            snippet[field.toLowerCase()] = value
            updateFunc(snippet)
        }
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

    change = (newValue, oldValue) => {
        this.setState({
            value: newValue ? newValue : oldValue
        })
    }

    render() {
        const { _id, field, currentValue, updateFunc, isAuthenticated } = this.props

        return (
            !isAuthenticated && currentValue === undefined ? <div></div> :
            <div className="nugget">
                <h2 className="subtitle text-primary">{field}</h2>
                {isAuthenticated && this.state.edit ? 
                    <form className="form">
                    <input 
                        type="text"
                        defaultValue={currentValue} 
                        onChange={(event) => this.change(event.target.value, currentValue)} /> 
                    </form> :
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