import * as d3 from 'd3'
import { BubbleChartParams, DevJobs } from '../types'

const bubbleChart = (params: BubbleChartParams) => {
    const width = params.width
    const height = params.height
    const dataColumn = params.dataColumn
    const displayColumn = params.displayColumn
    let nodeClickHandler = params.nodeClick

    return function (selection: d3.Selection<SVGSVGElement, [], null, undefined>) {
        let circle: any, text: any = null

        let data = selection.datum()
        data.sort((a, b) => b[dataColumn] - a[dataColumn])

        let div = selection,
            svg = div.selectAll('svg')
        svg.attr('width', width).attr('height', height)

        const color = d3.scaleOrdinal(d3.schemeCategory10); //random color
        const scaleRadius = d3.scaleLinear().domain([
            d3.min(data, (d: any) => +d[dataColumn]) || 0,
            d3.max(data, (d: any) => +d[dataColumn]) || 0
        ]).range([20, 200])

        const simulation = d3.forceSimulation()
            .force("forceX", d3.forceX().strength(.1).x(width * .5))
            .force("forceY", d3.forceY().strength(.1).y(height * .5))
            .force("center", d3.forceCenter().x(width * .5).y(height * .5))
            .force("charge", d3.forceManyBody().strength(-15))
            .nodes(data)
            .force("collide", d3.forceCollide().strength(.5).radius((d: any) => scaleRadius(d[dataColumn]) + 2.5).iterations(1))
            .on("tick", () => {
                circle.attr("cx", (d: any) => d.x)
                    .attr("cy", (d: any) => d.y)
                text.attr("x", (d: any) => d.x)
                    .attr("y", (d: any) => d.y)
            })

        circle = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("g")
            .append("circle")
            .attr('r', (d: any) => scaleRadius(d[dataColumn]))
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .style("fill", (d: any) => color(d[displayColumn]))
            .on("click", nodeClickHandler)


        text = svg.selectAll("g")
            .append("text")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y)
            .text((d: any) => d[displayColumn])
    }
}

const render = (selector: SVGSVGElement, data: any, clickhandler: () => void) => {
    let chart = bubbleChart({
        width: 960,
        height: 680,
        displayColumn: data.display,
        dataColumn: data.value,
        nodeClick: clickhandler
    }), jobs: [] = data.jobs

    d3.select(selector).selectAll('g').remove() //redraw

    d3.select(selector)
    .datum(jobs)
    .call(chart)
}

const renderDevJobsChart = (selector: SVGSVGElement, data: any) => {
    render(selector, data, () => console.log("before"))

    //expose event handling
    return {
        on: (evt: string, handler: () => void) => {
            switch (evt) {
                case "nodeClick":
                    render(selector, data, handler)  //update handler
                break
            }
        }
    }
}

export default renderDevJobsChart