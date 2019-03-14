import React, { Component } from 'react'
import { connect } from 'react-redux'
import renderDevJobsChart from '../../utils/d3'
import ReedClient from '../../api'
import locations from '../../api/locations'
const api = new ReedClient()

class Bubble extends Component {
    async componentDidMount() {
        const jobsRes = await api.getDevJobs()
        let jobs = jobsRes.map((loc, i) => {
            return { totalJobs: loc.totalResults, location: locations[i] }
        })
        renderDevJobsChart(this.refs.chart, {
            jobs: jobs,
            display: "location",
            value: "totalJobs"
        }).on("nodeClick", (node) => {
            console.log(node)

        })
    }

    
    render() {
        return (
            <div ref='chart'>
                <svg></svg>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(
    mapStateToProps
)(Bubble)