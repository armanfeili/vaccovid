import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NotFound extends Component {
    constructor() {
        super();
        this.state = {
        };

        // this.healthPrevious = this.healthPrevious.bind(this);
    }

    async componentDidMount() {
    }



    render() {

        return (
            <div className="not-found">
                <h1>PAGE NOT FOUND !!!</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {}
)(NotFound);
