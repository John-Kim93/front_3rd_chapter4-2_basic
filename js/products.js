async function loadProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);  
}

function displayProducts(products) {

    // Find the container where products will be displayed
    const container = document.querySelector('#all-products .container');

   
    // Iterate over each product and create the HTML structure safely
    products.forEach(product => {
        // Create the main product div
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Create the product picture div
        const pictureDiv = document.createElement('div');
        pictureDiv.classList.add('product-picture');
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = `product: ${product.title}`;
        img.loading="lazy";  // Lazy loading
        img.width=250;
        pictureDiv.appendChild(img);

        // Create the product info div
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('product-info');

        const category = document.createElement('h5');
        category.classList.add('categories');
        category.textContent = product.category;

        const title = document.createElement('h4');
        title.classList.add('title');
        title.textContent = product.title;

        const price = document.createElement('h3');
        price.classList.add('price');
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `US$ ${product.price}`;
        price.appendChild(priceSpan);

        const button = document.createElement('button');
        button.textContent = 'Add to bag';

        // Append elements to the product info div
        infoDiv.appendChild(category);
        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        infoDiv.appendChild(button);

        // Append picture and info divs to the main product element
        productElement.appendChild(pictureDiv);
        productElement.appendChild(infoDiv);

        // Append the new product element to the container
        container.appendChild(productElement);
    });

    

}

let loadStatus = 'idle';
window.onload = () => {

    let productSection = document.querySelector('#all-products');

    window.onscroll = () => {
        let position = productSection.getBoundingClientRect().height - (window.scrollY + window.innerHeight);

        if (loadStatus == 'idle' && position <= 0) {
            loadStatus = 'working'
            loadProducts();

            // Simulate heavy operation. It could be a complex price calculation. <-- need to improve this
            // This is a blocking operation that will freeze the UI
            // how to improve this: https://ko.javascript.info/event-loop <-- use event loop
            someHeavyCalculation();
        }
    }
}

function someHeavyCalculation() {
    const MAX_ITER = 10_000_000;

    /** 
     * 무거운 작업을 비동기 작업으로 처리함으로써 첫 페이지 로딩 시간을 빠르게 가져갈 수 있다.
     * 여기서 계산을 Promise로 처리하면 작업이 nonblock-async로 실행된다.
     * 완료 시 microtask-queue에 적재되고 event loop를 타고 순차적으로 메인 쓰레드에서 실행된다.
     */ 
    function processCalc() {
        return new Promise((resolve) => {
            for (let i = 0; i < MAX_ITER; i++) {
                const temp = Math.sqrt(i) * Math.sqrt(i);
            }
            setTimeout(() => {
                console.log('Heavy calculation end.');
                loadStatus = 'idle'
                resolve();
            }, 1000)
        })
    }

    processCalc();
}

