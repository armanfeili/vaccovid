import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NotFound extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    async componentDidMount() {
        document.title = "not found - vaccovid.live"
    }



    render() {

        return (
            <div className="notfound">
                <h1 className="notfound-text">Page not found !!!</h1>
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
