import { createApp } from 'vue';
import HeatmapComponent from './HeatmapComponent.vue';

const app = createApp({
  components: {
    HeatmapComponent
  },
  data() {
    return {
      heatmapData: generateData()
    };
  },
  template: `
    <div>
      <h1>Heatmap Dashboard</h1>
      <HeatmapComponent :data="heatmapData" />
    </div>
  `
});

function generateData() {
  const data = [];
  const totalFlares = 120; // 6x20 grid
  const highLevelFlares = Math.floor(totalFlares * 0.93);
  const offlineFlares = 2;

  for (let flare = 0; flare < totalFlares; flare++) {
    let value;
    if (flare < highLevelFlares) {
      value = Math.random() * 30 + 70; // Random value between 70 and 100
    } else if (flare >= totalFlares - offlineFlares) {
      value = -1; // Offline flares
    } else {
      value = Math.random() * 69; // Random value between 0 and 69
    }
    data.push({ flare: flare + 1, value }); // Assign sequential flare numbers
  }

  return data;
}

app.mount('#app');
