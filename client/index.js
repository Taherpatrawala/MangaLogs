

const parentDiv=document.getElementById("parent-div")

async function getData(){
const data= await axios.get('http://localhost:3000');
return console.log(data.data)
}

parentDiv.addEventListener("click",getData)