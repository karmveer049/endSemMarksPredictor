let chart;

function initChart(){
  const ctx = document.getElementById("chart").getContext("2d");

  chart = new Chart(ctx,{
    type:"bar",
    data:{
      labels:[
        "Attendance",
        "MidSem",
        "IQ",
        "Study",
        "Attentiveness",
        "EndSem"
      ],
      datasets:[{
        label:"Student Metrics",
        data:[0,0,0,0,0,0]
      }]
    },
    options:{
      responsive:true,
      scales:{
        y:{ beginAtZero:true, max:100 }
      }
    }
  });
}

initChart();

async function predict(){

  const resultBox = document.getElementById("result");

  const data = {
    attendance: parseFloat(attendance.value),
    midsem: parseFloat(midsem.value),
    iq: parseFloat(iq.value),
    study: parseFloat(study.value),
    attentive: parseFloat(attentive.value)
  };

  resultBox.innerText = "Waking AI server... (~30s first time)";

  try{

    const res = await fetch("https://endsem-api.onrender.com/predict",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });

    const out = await res.json();
    const pred = out.prediction;

    resultBox.innerText =
      "Predicted End-Sem Marks: " + pred.toFixed(2) + "%";

    // 🔥 UPDATE CHART
    chart.data.datasets[0].data = [
      data.attendance,
      data.midsem,
      data.iq,
      data.study,
      data.attentive,
      pred
    ];

    chart.update();

  }catch(err){
    resultBox.innerText =
      "Server sleeping… click again in 20s";
  }
}
