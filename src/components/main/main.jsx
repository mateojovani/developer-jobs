import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bubble from '../graph/bubble'

class Main extends Component {
    render() {
        return (
            <div>
                <Bubble />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps
)(Main)