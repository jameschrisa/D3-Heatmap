# Vue.js Heatmap Component

This is a reusable Vue.js component that creates an interactive heatmap with a range slider. It's designed to be easily integrated into Vue.js projects and dashboards.

## Features

- Interactive heatmap visualization
- Range slider for filtering data
- Configurable colors and grid layout
- Tooltips for detailed information

## Prerequisites

- Vue.js 3.x
- D3.js
- noUiSlider

## Installation

1. Copy the following files into your project:
   - `HeatmapComponent.vue`
   - `heatmapConfig.js`

2. Install the required dependencies:

```bash
npm install d3 nouislider
```

## Integration Guide

Follow these steps to integrate the heatmap component into your Vue.js project:

1. **Import the component:**
   In the Vue file where you want to use the heatmap, import the component:

   ```javascript
   import HeatmapComponent from './path/to/HeatmapComponent.vue';
   ```

2. **Register the component:**
   Add the component to your Vue instance:

   ```javascript
   export default {
     components: {
       HeatmapComponent
     },
     // ... other options
   }
   ```

3. **Prepare your data:**
   The component expects an array of objects, each representing a cell in the heatmap. Each object should have a `flare` property (for the label) and a `value` property (for the heat intensity). For example:

   ```javascript
   data() {
     return {
       heatmapData: [
         { flare: 1, value: 75 },
         { flare: 2, value: 50 },
         // ... more data
       ]
     }
   }
   ```

4. **Use the component in your template:**
   Add the component to your template, passing the data as a prop:

   ```html
   <HeatmapComponent :data="heatmapData" />
   ```

5. **Customize the configuration (optional):**
   If you want to customize the heatmap's appearance or behavior, modify the `heatmapConfig.js` file. You can adjust:
   - Dimensions (width, height, margins)
   - Grid layout (rows, columns, cell size)
   - Color scale (domain and range)

## Example Usage

Here's a minimal example of how to use the heatmap component in a Vue.js application:

```vue
<template>
  <div id="app">
    <h1>Heatmap Example</h1>
    <HeatmapComponent :data="heatmapData" />
  </div>
</template>

<script>
import HeatmapComponent from './path/to/HeatmapComponent.vue';

export default {
  name: 'App',
  components: {
    HeatmapComponent
  },
  data() {
    return {
      heatmapData: [
        { flare: 1, value: 75 },
        { flare: 2, value: 50 },
        // ... more data (total should match rows * cols in heatmapConfig.js)
      ]
    }
  }
}
</script>
```

## Troubleshooting

- If the heatmap doesn't render, check the browser console for any error messages.
- Ensure that the number of data points matches the `rows * cols` value in `heatmapConfig.js`.
- If styles are not applying correctly, make sure your build process is set up to handle Vue single-file components and their `<style>` sections.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.

## License

This project is open source and available under the [MIT License](LICENSE).
