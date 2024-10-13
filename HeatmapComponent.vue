<template>
  <div class="heatmap-container">
    <div ref="heatmap" class="heatmap"></div>
    <div ref="slider" class="slider"></div>
    <div ref="colorLegend" class="color-legend"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import config from './heatmapConfig.js';

export default {
  name: 'HeatmapComponent',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      colorScale: null,
      slider: null
    };
  },
  mounted() {
    this.initializeHeatmap();
  },
  methods: {
    initializeHeatmap() {
      const { width, height, margin } = config.dimensions;
      const svg = d3.select(this.$refs.heatmap)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      this.colorScale = d3.scaleLinear()
        .domain(config.colorScale.domain)
        .range(config.colorScale.range);

      this.createHeatmap(svg);
      this.createColorLegend();
      this.createSlider();
    },
    createHeatmap(svg) {
      const { cellSize, rows, cols } = config.grid;
      const cells = svg.selectAll('rect')
        .data(this.data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i % cols) * cellSize)
        .attr('y', (d, i) => Math.floor(i / cols) * cellSize)
        .attr('width', cellSize)
        .attr('height', cellSize)
        .style('fill', d => this.colorScale(d.value))
        .on('mouseover', this.handleMouseOver)
        .on('mouseout', this.handleMouseOut);

      svg.selectAll('text')
        .data(this.data)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i % cols) * cellSize + cellSize / 2)
        .attr('y', (d, i) => Math.floor(i / cols) * cellSize + cellSize / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .style('font-size', `${cellSize / 4}px`)
        .style('fill', 'black')
        .text(d => d.flare);
    },
    createColorLegend() {
      const legendWidth = this.$refs.colorLegend.clientWidth;
      const legendHeight = 20;

      const legendSvg = d3.select(this.$refs.colorLegend)
        .append('svg')
        .attr('width', '100%')
        .attr('height', legendHeight);

      const gradient = legendSvg.append('defs')
        .append('linearGradient')
        .attr('id', 'color-legend-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      gradient.selectAll('stop')
        .data(config.colorScale.range.map((color, i) => ({
          offset: `${i * 100 / (config.colorScale.range.length - 1)}%`,
          color: color
        })))
        .enter().append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color);

      legendSvg.append('rect')
        .attr('width', '100%')
        .attr('height', legendHeight)
        .style('fill', 'url(#color-legend-gradient)');
    },
    createSlider() {
      this.slider = noUiSlider.create(this.$refs.slider, {
        start: [0, 100],
        connect: true,
        range: {
          'min': 0,
          'max': 100
        },
        step: 1
      });

      this.slider.on('update', this.updateHeatmap);
    },
    updateHeatmap(values) {
      const [min, max] = values.map(Number);
      d3.select(this.$refs.heatmap)
        .selectAll('rect')
        .style('fill', d => (d.value >= min && d.value <= max) ? this.colorScale(d.value) : '#ccc');
    },
    handleMouseOver(event, d) {
      d3.select(event.target)
        .attr('stroke', 'black')
        .attr('stroke-width', '2px');

      d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '1px')
        .style('border-radius', '5px')
        .style('padding', '5px')
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 10}px`)
        .html(`Flare: ${d.flare}<br>Value: ${d.value.toFixed(2)}%`);
    },
    handleMouseOut(event) {
      d3.select(event.target)
        .attr('stroke', 'none');

      d3.select('.tooltip').remove();
    }
  }
};
</script>

<style scoped>
.heatmap-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
.heatmap {
  width: 100%;
  height: 400px;
}
.slider {
  margin: 20px 0;
}
.color-legend {
  height: 20px;
  margin-top: 10px;
}
</style>
