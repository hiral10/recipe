import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../App';
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            image: '',
            title:''
        }
    }
    onFileChange(e) {
        this.setState({ image: e.target.files[0] })

    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', this.state.image)
        axios.post(`${config.endpoint}/recipe/upload`, formData, {
        }).then(res => {
            return res
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                            <input type="text" name='title' onChange={this.onFileChange} />

                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

