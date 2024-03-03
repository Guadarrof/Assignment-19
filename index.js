const searchInput= document.getElementById("searchInput");
const searchBtn=document.getElementById("searchBtn");
const inputError=document.getElementById("inputError");
const productInfo=document.getElementById("searchTarget");


function emptyField(data){
    if (data.trim()===""){
        return true;
    }else{
        return false;
    }
}


async function getProductsJson() {
    const response = await fetch("./electrodomesticos.json");
    const data = await response.json();
    return data;
}


async function searchData(){
    inputError.innerText="";
    productInfo.innerHTML="";
    const prodList = await getProductsJson();
    const searchVal=searchInput.value;
    if (emptyField(searchVal)){
        inputError.innerText='Ingrese el nombre de un electrodomestico';
    }else{
        let productsFound=[];
        for (let product of prodList){
            if(product.nombre.toLowerCase().startsWith(searchVal.toLowerCase())){
                productsFound.push(product);
            }
        }
        if(productsFound.length>0){
            productsFound.forEach(result => {
            productInfo.innerHTML+=`
            <div class="prod">
                <h2 class="prod_title">${result.nombre}</h2>
                <div class="dimension_container">
                    <h4 class="dimension_title">Medidas</h4>
                    <ul>
                        <li>Alto: ${result.dimensiones.alto}</li>
                        <li>Ancho: ${result.dimensiones.ancho}</li>
                        <li>Profundidad: ${result.dimensiones.profundidad}</li>
                </ul>
                </div>
                <div class="description_container">
                    <h4 class="description_title">Descripcion</h4>
                    <p class="description_info">${result.descripcion}</p>
                </div>  
            </div>`
            });
        }else{
            inputError.innerText='No contamos con ese producto pero en breve añadiremos mas';
        }
    }
}

searchBtn.addEventListener("click",searchData)