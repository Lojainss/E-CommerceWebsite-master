console.clear();
let counter = Number(document.cookie.split(",")[1].split("=")[1]);

if (document.cookie.indexOf(",counter=") >= 0) {
  let counter = document.cookie.split(",")[1].split("=")[1];
  document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById("cartContainer");

let boxContainerDiv = document.createElement("div");
boxContainerDiv.id = "boxContainer";

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";
  boxContainerDiv.appendChild(boxDiv);

  let boxImg = document.createElement("img");
  boxImg.src = ob.preview;
  boxDiv.appendChild(boxImg);

  let boxh3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name + " × " + itemCounter);
  boxh3.appendChild(h3Text);
  boxDiv.appendChild(boxh3);

  let boxh4 = document.createElement("h4");
  let h4Text = document.createTextNode("Amount: SYP " + ob.price + 00);
  boxh4.appendChild(h4Text);
  boxDiv.appendChild(boxh4);
  let cancelBtn = document.createElement("button");
  cancelBtn.className = "removeItem";
  let cancelBtnText = document.createTextNode("Remove Item");
  cancelBtn.appendChild(cancelBtnText);
  boxDiv.appendChild(cancelBtn);

  cancelBtn.addEventListener("click", function (event) {
    if (itemCounter > 1) {
      counter--;
      document.getElementById("badge").innerHTML = counter;
      document.getElementById("totalItem").innerHTML =
        "Total Items: " + counter;

      itemCounter -= 1;
      boxh3.textContent = ob.name + " × " + itemCounter;
    } else {
      counter--;
      document.getElementById("badge").innerHTML = counter;
      document.getElementById("totalItem").innerHTML =
        "Total Items: " + counter;

      boxContainerDiv.removeChild(boxDiv);
      if (counter === 0) {
        cartContainer.removeChild(boxContainerDiv);
        cartContainer.removeChild(totalContainerDiv);
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = "orderId=" + 0 + ",counter=" + 0;
      }
    }

    totalAmount = calculateTotalAmount(contentTitle);
    amountUpdate(totalAmount);
  });

  // Function to calculate the total amount
  function calculateTotalAmount(contentTitle) {
    let items = document.querySelectorAll("#boxContainer #box");
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemName = item.querySelector("h3").textContent.split(" × ")[0];
      let itemCounter = item.querySelector("h3").textContent.split(" × ")[1];
      let itemPrice = getItemPrice(itemName, contentTitle);
      total += itemPrice * itemCounter;
    }

    return total;
  }

  // Function to get the price of an item
  function getItemPrice(itemName, contentTitle) {
    for (let i = 0; i < contentTitle.length; i++) {
      if (contentTitle[i].name === itemName) {
        return Number(contentTitle[i].price);
      }
    }

    return 0;
  }

  buttonLink.appendChild(buttonText);
  cartContainer.appendChild(boxContainerDiv);
  cartContainer.appendChild(totalContainerDiv);

  return cartContainer;
}

let totalContainerDiv = document.createElement("div");
totalContainerDiv.id = "totalContainer";

let totalDiv = document.createElement("div");
totalDiv.id = "total";
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement("h2");
let h2Text = document.createTextNode("Total Amount");
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
  totalDiv.innerHTML = ""; // Clear the totalDiv first

  let totalh2 = document.createElement("h2");
  let h2Text = document.createTextNode("Total Amount");
  totalh2.appendChild(h2Text);
  totalDiv.appendChild(totalh2);

  let totalh4 = document.createElement("h4");
  totalh4.id = "toth4";
  totalh4.textContent = "Amount: SYP " + amount.toFixed(2);
  totalDiv.appendChild(totalh4);

  totalDiv.appendChild(buttonDiv);
}

let buttonDiv = document.createElement("div");
buttonDiv.id = "button";
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement("button");
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement("a");
buttonLink.href = "./checkout.html?";
buttonTag.appendChild(buttonLink);

buttonText = document.createTextNode("Place Order");

// BACKEND CALL
let httpRequest = new XMLHttpRequest();
let totalAmount = 0;
httpRequest.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status == 200) {
      contentTitle = JSON.parse(this.responseText);

      document.getElementById("totalItem").innerHTML =
        "Total Items: " + counter;

      let item = document.cookie.split(",")[0].split("=")[1].split(" ");

      let i;
      let totalAmount = 0;
      for (i = 0; i < counter; i++) {
        let itemCounter = 1;
        for (let j = i + 1; j < counter; j++) {
          if (Number(item[j]) == Number(item[i])) {
            itemCounter += 1;
          }
        }
        totalAmount += Number(contentTitle[item[i] - 1].price) * itemCounter;
        dynamicCartSection(contentTitle[item[i] - 1], itemCounter);
        i += itemCounter - 1;
      }
      amountUpdate(totalAmount);
    }
  }
};

httpRequest.open(
  "GET",
  "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
  true
);
httpRequest.send();
