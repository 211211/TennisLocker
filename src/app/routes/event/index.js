import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = () => ({
    
});

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        
        return (
            <div className="event">
                <span>Hello</span>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
       
    }
)(Event);
