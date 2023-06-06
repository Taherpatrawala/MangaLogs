const parentDiv = document.getElementById("parent-div");
window.addEventListener("load", getData);
let initialData = [];

async function getData() {
  const data = await axios.get("http://localhost:3000");
  initialData = await data.data;
  console.log(initialData);

  renderData();
}

async function renderData(){
    initialData.forEach((data, index) => {
        const manga = document.createElement("div");
        const childDivTitle = document.createElement("p");
        const childDivAuthor = document.createElement("p");
        const deleteButton=document.createElement('button');
    
        childDivTitle.innerText = data.title;
        childDivAuthor.innerText = data.author;
        deleteButton.innerText="Delete";

        deleteButton.addEventListener('click',async()=>{
            const deleteData=await axios.delete(`http://localhost:3000/${data.title}`)
               return deleteData;
        });
    
        manga.appendChild(childDivTitle);
        manga.appendChild(childDivAuthor);
        manga.appendChild(deleteButton);
        parentDiv.appendChild(manga);
      });
}


