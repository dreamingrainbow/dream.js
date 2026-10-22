import Dream from "../dream.js";

function _random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const adjectives = ["pretty","large","big","small","tall","short","long","handsome","plain","quaint","clean","elegant","easy","angry","crazy","helpful","mushy","odd","unsightly","adorable","important","inexpensive","cheap","expensive","fancy"];
const colours = ["red","yellow","blue","green","pink","brown","purple","white","black","orange"];
const nouns = ["table","chair","house","bbq","desk","car","pony","cookie","sandwich","burger","pizza","mouse","keyboard"];

function buildData(startId, count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: startId + i,
      label: adjectives[_random(adjectives.length)] + " " +
             colours[_random(colours.length)] + " " +
             nouns[_random(nouns.length)]
    });
  }
  return data;
}

// Dream state only
Dream.register("data", []);
Dream.register("selected", null);

let nextId = 1;
const tbody = document.getElementById("tbody");

// Simple full re-render of the list from current state.
// No row caching, no differential DOM, no extra bookkeeping.
function render() {
  const data = Dream.state.data;
  const selected = Dream.state.selected;

  tbody.textContent = "";

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const tr = document.createElement("tr");
    tr.dataset.id = item.id;
    if (item.id === selected) {
      tr.className = "danger";
    }

    tr.innerHTML =
      "<td class='col-md-1'>" + item.id + "</td>" +
      "<td class='col-md-4'><a class='lbl'>" + item.label + "</a></td>" +
      "<td class='col-md-1'><a class='remove'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a></td>" +
      "<td class='col-md-6'></td>";

    tbody.appendChild(tr);
  }
}

// Any change to data or selected triggers the same render.
Dream.subscribe("data", render);
Dream.subscribe("selected", render);

// Actions – only mutate Dream.state
function run() {
  nextId = 1;
  Dream.state.selected = null;
  Dream.state.data = buildData(nextId, 1000);
  nextId += 1000;
}

function runLots() {
  nextId = 1;
  Dream.state.selected = null;
  Dream.state.data = buildData(nextId, 10000);
  nextId += 10000;
}

function add() {
  const more = buildData(nextId, 1000);
  nextId += 1000;
  Dream.state.data = Dream.state.data.concat(more);
}

function update() {
  const data = Dream.state.data.slice(); // new array so subscriber fires
  for (let i = 0; i < data.length; i += 10) {
    data[i] = { id: data[i].id, label: data[i].label + " !!!" };
  }
  Dream.state.data = data;
}

function clear() {
  Dream.state.selected = null;
  Dream.state.data = [];
}

function swapRows() {
  const data = Dream.state.data.slice();
  if (data.length > 998) {
    const tmp = data[1];
    data[1] = data[998];
    data[998] = tmp;
    Dream.state.data = data;
  }
}

// Events
document.getElementById("main").addEventListener("click", function (e) {
  const id = e.target.id;
  if (id === "run") run();
  else if (id === "runlots") runLots();
  else if (id === "add") add();
  else if (id === "update") update();
  else if (id === "clear") clear();
  else if (id === "swaprows") swapRows();
});

tbody.addEventListener("click", function (e) {
  const tr = e.target.closest("tr");
  if (!tr) return;
  const id = +tr.dataset.id;

  if (e.target.closest(".remove")) {
    Dream.state.data = Dream.state.data.filter(function (d) { return d.id !== id; });
    if (Dream.state.selected === id) {
      Dream.state.selected = null;
    }
  } else if (e.target.closest(".lbl")) {
    Dream.state.selected = id;
  }
});