let chart;

async function predict(){

  const resultBox = document.getElementById("result");

  const data = {
    attendance: parseFloat(attendance.value),
    midsem: parseFloat(midsem.value),
    iq: parseFloat(iq.value),
    study: parseFloat(study.value),
    attentive: parseFloat(attentive.value)
  };

  resultBox.innerText = "Waking AI server... (first load takes ~40s)";

  try{

    const res = await fetch("https://endsem-api.onrender.com/predict",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    resultBox.innerText =
      "Predicted End-Sem Marks: " + result.prediction.toFixed(2) + "%";

  }catch(err){

    resultBox.innerText =
      "Server waking up... click again in 20s";
  }
}


  document.getElementById("result").innerText = "Predicting...";

  try{

    const res = await fetch("https://endsem-api.onrender.com/predict",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        attendance: attendance,
        midsem: midsem,
        iq: iq,
        study: study,
        attentive: attentive
      })
    });

    const result = await res.json();

    document.getElementById("result").innerText =
      "Predicted End-Sem Marks: " + result.prediction.toFixed(2) + "%";

    updateChart([attendance, midsem, iq, study, attentive]);

  }catch(err){
    document.getElementById("result").innerText =
      "Server sleeping… wait 20s and try again";
  }
}

function updateChart(values){

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:["Attendance","MidSem","IQ","Study","Attention"],
      datasets:[{
        label:"Input Features",
        data:values
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{display:false}
      }
    }
  });
}
