import Template from './templates/Template.js';
<<<<<<< HEAD
console.log('hola');
=======
import './styles/main.css';
import './styles/vars.styl';
>>>>>>> f335607d5ce186781488a6ea43ee2736e57de247

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
