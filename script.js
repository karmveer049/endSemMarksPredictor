async function predict(){

  const resultBox = document.getElementById("result");

  const data = {
    attendance: parseFloat(document.getElementById("attendance").value),
    midsem: parseFloat(document.getElementById("midsem").value),
    iq: parseFloat(document.getElementById("iq").value),
    study: parseFloat(document.getElementById("study").value),
    attentive: parseFloat(document.getElementById("attentive").value)
  };

  if(
    isNaN(data.attendance) ||
    isNaN(data.midsem) ||
    isNaN(data.iq) ||
    isNaN(data.study) ||
    isNaN(data.attentive)
  ){
    resultBox.innerText = "Enter all values first";
    return;
  }

  resultBox.innerText = "Waking AI server... (first load ~40s)";

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
      "Server waking... click again in 20s";
  }
}
