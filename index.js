const loadAiData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiData(data.data.tools);

}

const displayAiData = (datum) => {
    const containerDiv = document.getElementById('div-container');


    datum.forEach(data => {
        // console.log(data);
        const { features, image, name, published_in, id } = data;
        // console.log(features);
        // const splitFeature = features.join(',').split(',');
        // console.log(splitFeature);
        // const featureHtml = splitFeature.map(feature => feature);

        const div = document.createElement('div');
        div.classList = `card  bg-base-100 shadow-xl ring-1 ring-gray-300`
        div.innerHTML = `
        <figure><img class ="p-5 rounded-3xl" src="${image}"
            alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <ul class="feature-list p-4 list-decimal">
                  ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <hr>
                <p>${name}</p>

                <div class ="flex justify-between">
                <div class ="flex gap-5 items-center">
                <i class="fa-regular fa-calendar-days"></i>
                <p>${published_in}</p>
                </div>

                <div class="ring-1 rounded-full">
                <button onclick="buttonHandler('${id}');my_modal_4.showModal()" class="btn btn-circle"><i class="fa-solid fa-arrow-right "></i></button>
                </div>
                </div>
            </div>
        `;
        containerDiv.appendChild(div);

    });
}


const buttonHandler = async (id) => {

    console.log('button connect', id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showSingleData(data.data);
}



const showSingleData = (data) => {


    // console.log(data);
    const modalContainer = document.getElementById('modal_container');
    const { description, features, integrations } = data;
    console.log(features);
    // for (const key in features) {
    //     console.log(features[key].feature_name);
    // }
    let paragraph = '';

    for (var key in features) {
        console.log(key);
        if (features.hasOwnProperty(key)) {
            paragraph += "<p><strong>" + key + ":</strong> " + features[key].feature_name + "</p>"
            
        }
    }

        modalContainer.innerHTML = `
    <div class="bg-[#EB57570D] p-9 rounded-lg">
        <h3 class="w-[420px] font-style">${description}</h3>


        <div class ="flex justify-between"> 
            <div class ="font-style">
                <h1>Features</h1>
                <ul class="list-disc">
                    ${paragraph}
                </ul>
            </div>

            <div class="font-style">
                <h1>Integrations</h1>
                <ul class="list-disc">
                    ${integrations.map(text => `<li>${text}</li>`).join('')}
                </ul>
            </div>
        </div>

     </div>

    <div class=" ">
        <p>hello</p>
    </div>
    
    `
    }




loadAiData()