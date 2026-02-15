let chart;

async function predict(){

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
    document.getElementById("result").innerText = "Enter all fields";
    return;
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
