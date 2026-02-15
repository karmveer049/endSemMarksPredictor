let chart;

async function predict(){

  const data = {
    attendance: parseFloat(document.getElementById("attendance").value),
    midsem: parseFloat(document.getElementById("midsem").value),
    iq: parseFloat(document.getElementById("iq").value),
    study: parseFloat(document.getElementById("study").value),
    attentive: parseFloat(document.getElementById("attentive").value)
  };

  document.getElementById("result").innerText = "Predicting...";

  const res = await fetch("https://endsem-api.onrender.com/predict",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  document.getElementById("result").innerText =
    result.prediction.toFixed(2) + "%";
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
