import React, { Component } from "react";
import * as d3 from "d3"

class Child1 extends Component{
    componentDidUpdate(){
        var data = this.props.data2
        var sunAve = 0
        var isun = 0
        var satAve = 0
        var isat = 0
        var thurAve = 0
        var ithur = 0
        var friAve = 0
        var ifri = 0

        for(var i = 0; i < data.length; i++){
            if(data[i].day === 'Sun'){
                sunAve += data[i].tip
                isun++
            }
            if(data[i].day === 'Sat'){
                satAve += data[i].tip
                isat++
            }
            if(data[i].day === 'Thur'){
                thurAve += data[i].tip
                ithur++
            }
            if(data[i].day === 'Fri'){
                friAve += data[i].tip
                ifri++
            }
        }
        sunAve = sunAve/isun
        satAve = satAve/isat
        thurAve = thurAve/ithur
        friAve = friAve/ifri

        var newData = [
            {day: 'Sun', aveTip: sunAve},
            {day: 'Sat', aveTip: satAve},
            {day: 'Thur', aveTip: thurAve},
            {day: 'Fri', aveTip: friAve},
        ]

        var margin ={ top: 40, right: 10, bottom: 50, left: 40},
            w = 500 - margin.left - margin.right,
            h = 300 - margin.top - margin.bottom;
        
        var container = d3.select(".child2_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".g_2")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var x_data = newData.map(item=>item.day)
        const x_scale = d3.scaleBand().domain(x_data).range([margin.left,w]).padding(0.2);
        const xAxis = d3.axisBottom(x_scale)
            .ticks(newData.length)
        container.append('g').call(xAxis)
            .attr('transform', `translate(0, ${h})`);

        var y_data = newData.map(item=>item.aveTip)
        const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
        const yAxis = d3.axisLeft(y_scale)
        container.append('g').call(yAxis)
            .attr("transform", `translate(${margin.left}, 0)`)


        container.selectAll(".bar")
            .data(newData)
            .join("rect")
            .attr("x",function(d){
                return x_scale(d.day);
            })
            .attr("y", function(d){
                return y_scale(d.aveTip);
            })

            .attr("width", x_scale.bandwidth())
            .attr("height", function(d){
                return h - y_scale(d.aveTip)
            })
            .style("fill", "#69b3a2");
        
        container
            .append('text')
            .attr('x', w / 2)
            .attr('y', -10)
            .style('text-anchor', 'middle')
            .attr('font-size', '16px')
            .text('Average Tip by Day')

        container
            .append('text')
            .attr('x', w / 2)
            .attr('y', h + 40)
            .style('text-anchor', 'middle')
            .attr('font-size', '16px')
            .text('Day')

        container
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', - h/2)
            .attr('y', 0)
            .style('text-anchor', 'middle')
            .attr('font-size', '16px')
            .text('Average Tip')
    }

    render(){
        return <svg className="child2_svg">
            <g className="g_2"></g>
        </svg>
    }
}

export default Child1;