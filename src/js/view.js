import {editCart} from './service';

let sum =0;
export let makeRow = (itemArray) => {
    let mainBody = document.getElementById('mainBody');
    let cost = itemArray.qty * itemArray.price;
    sum = sum + cost;
    let html = ` <tr>
    <th scope="row">
      <img src=${itemArray.img} alt="" class="img-fluid z-depth-0" >
    </th>
    <td>
      <h5 class="mt-3">
        <strong>${itemArray.title}</strong>
      </h5>
      <p class="text-muted">Style #: ${itemArray.style} <br> 
                            Colour: ${itemArray.colour} <br><br><br><br><br>
                            <a data-toggle="modal" data-target="#editModal" href=""> EDIT </a>|<a href=""> REMOVE </a>| SAVE FOR LATER </p>
    </td>
    <td>${itemArray.size}</td>
    <td></td>
    <td>
      <input type="number" value="${itemArray.qty}" aria-label="Search" class="form-control" style="width: 100px; text-align: center">
    </td>
    <td>$${cost}</td>
   
   
  </tr>
  `;

  let tm = createHTMLElement(html);
  tm.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.lastElementChild.onclick = () => {
        let fetchData = {
            method: "DELETE"
        }

        let deleteUrl = `http://localhost:3000/items/${itemArray.id}`;
        fetch(deleteUrl, fetchData)
        .then(() =>{
        });
    }

  mainBody.appendChild(tm);

  tm.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.lastElementChild.previousElementSibling.onclick = () => {
    document.getElementById('editTitle').innerHTML = `${itemArray.title}`;
    document.getElementById('editPrice').innerHTML = `$${itemArray.price}`;

  var btn = createHTMLElement(`<button
  type="button" id="editButton" data-dismiss = "modal"
  class="btn btn-dark">EDIT</button> <br> `);

    var img = document.createElement('img');
    img.className = "d-block w-100";
    img.src = `${itemArray.img}` ;
    document.getElementById('editImage').innerHTML = "";
    document.getElementById('editImage').appendChild(img);
    document.getElementById('editButton').innerHTML = "";
    document.getElementById('editButton').appendChild(btn);

    btn.onclick = () => {
    
      let s = document.getElementsByName('size')[0];
      let size = s.options[s.selectedIndex].value;
      console.log(`size = ${size}`);
      let q = document.getElementsByName('qty')[0];
      let qty = q.options[q.selectedIndex].value;
      console.log(`qty = ${qty}`); 
      editCart(itemArray.id , qty , size);
      

    }

  }
  document.getElementById('subtotal').innerHTML = '$'+sum;
  document.getElementById('estTotal').innerHTML = '$'+(sum-7);
} 



function createHTMLElement(html) {
    
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
   }

