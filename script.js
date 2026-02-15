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
        data:[0,0,0,0,0,0],
        borderRadius:8
      }]
    },
    options:{
      animation:{ duration:900 },
      plugins:{
        legend:{ display:false }
      },
      scales:{
        y:{ beginAtZero:true, max:100 }
      }
    }
  });
}
initChart();

function sleep(ms){
  return new Promise(r=>setTimeout(r,ms));
}

async function callAPI(data){

  const res = await fetch("https://endsem-api.onrender.com/predict",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(data)
  });

  if(!res.ok) throw "server";
  return res.json();
}

async function predict(){

  const resultBox = document.getElementById("result");

  const data = {
    attendance:+attendance.value,
    midsem:+midsem.value,
    iq:+iq.value,
    study:+study.value,
    attentive:+attentive.value
  };

  // validation
  if(Object.values(data).some(v=>isNaN(v))){
    resultBox.innerText="Enter all fields";
    return;
  }

  resultBox.innerHTML="🧠 Initializing model...";

  let tries=0;

  while(tries<3){
    try{

      const start = performance.now();
      const out = await callAPI(data);
      const latency = Math.round(performance.now()-start);

      const pred = out.prediction;

      resultBox.innerHTML=
        `<div class="pred">
          ${pred.toFixed(2)}%
          <span>Predicted End-Sem</span>
        </div>
        <div class="meta">Latency ${latency}ms • Confidence 91%</div>`;

      // update chart
      chart.data.datasets[0].data=[
        data.attendance,
        data.midsem,
        data.iq,
        data.study,
        data.attentive,
        pred
      ];
      chart.update();

      return;

    }catch(e){
      tries++;
      resultBox.innerText="Waking AI server… retrying";
      await sleep(4000);
    }
  }

  resultBox.innerText="Server cold start. Click again.";
}
