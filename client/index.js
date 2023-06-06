const parentDiv = document.getElementById("parent-div");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const addButton = document.getElementById("addButton");
const updatebutton= document.getElementById('updateButton');

window.addEventListener("load", getData);

let initialData = [];

async function getData() {
  const data = await axios.get("http://localhost:3000");
  initialData = await data.data;
  console.log(initialData);

  renderData();
}

async function renderData() {
  initialData.forEach((data, index) => {
    const manga = document.createElement("div");
    const childDivTitle = document.createElement("p");
    const childDivAuthor = document.createElement("p");
    const deleteButton = document.createElement("button");

    childDivTitle.innerText = data.title;
    childDivAuthor.innerText = data.author;
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener("click", async () => {
      const deleteData = await axios.delete(
        `http://localhost:3000/${data.title}`
      );
      return deleteData;
    });

    manga.appendChild(childDivTitle);
    manga.appendChild(childDivAuthor);
    manga.appendChild(deleteButton);
    parentDiv.appendChild(manga);
  });
}

const addData = async (e) => {
  console.log(e.target.innerText);
  const title = titleInput.value;
  const author = authorInput.value;

  const data = {
    title: title,
    author: author,
  };

  if(e.target.innerText==='Add'){
    try {
    await axios.post("http://localhost:3000", data);
  } catch (err) {
    console.log(err);
    console.log(data);
  }}
  else{
    try{
      await axios.put(`http://localhost:3000/${title}`,data)
    }
    catch(err){
      console.log(err.message);
    }
  }
 
};

addButton.addEventListener("click", addData);
updatebutton.addEventListener('click',addData);




