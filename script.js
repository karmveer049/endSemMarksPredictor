let chart;

function predict(){

  const attendance = parseFloat(document.getElementById("attendance").value);
  const midsem = parseFloat(document.getElementById("midsem").value);
  const iq = parseFloat(document.getElementById("iq").value);
  const study = parseFloat(document.getElementById("study").value);
  const attentive = parseFloat(document.getElementById("attentive").value);

  // demo model until backend connected
  let score =
    attendance*0.25 +
    midsem*0.35 +
    study*0.2 +
    attentive*0.15 +
    iq*0.05;

  document.getElementById("result").innerText =
    score.toFixed(2) + "%";

  updateChart([attendance, midsem, iq, study, attentive]);
}

function updateChart(values){

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type:"bar",
    data:{
      labels:["Attendance","MidSem","IQ","Study","Attention"],
      datasets:[{
        label:"Feature Values",
        data:values
      }]
    },
    options:{
      responsive:true,
      plugins:{legend:{display:false}}
    }
  });
}
