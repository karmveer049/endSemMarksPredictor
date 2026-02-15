let chart;

async function predict(){

  const resultBox = document.getElementById("result");

  const attendance = parseFloat(document.getElementById("attendance").value);
  const midsem = parseFloat(document.getElementById("midsem").value);
  const iq = parseFloat(document.getElementById("iq").value);
  const study = parseFloat(document.getElementById("study").value);
  const attentive = parseFloat(document.getElementById("attentive").value);

  if(
    isNaN(attendance) ||
    isNaN(midsem) ||
    isNaN(iq) ||
    isNaN(study) ||
    isNaN(attentive)
  ){
    resultBox.innerText = "Enter all values";
    return;
  }

  resultBox.innerText = "Connecting to AI server...";

  try{

    const res = await fetch("https://endsem-api.onrender.com/predict",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        attendance,
        midsem,
        iq,
        study,
        attentive
      })
    });

    const data = await res.json();

    resultBox.innerText =
      "Predicted End-Sem Marks: " + data.prediction.toFixed(2) + "%";

    updateChart([attendance, midsem, iq, study, attentive]);

  }catch(err){
    resultBox.innerText =
      "Server waking up… wait 30s and click again";
  }
}

function updateChart(values){

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels:["Attendance","MidSem","IQ","Study","Attention"],
      datasets:[{
        data:values
      }]
    },
    options:{
      plugins:{legend:{display:false}}
    }
  });
}
