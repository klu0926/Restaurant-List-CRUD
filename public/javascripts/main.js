// index page
// model delete-form setup when card's delete button is click
const deleteButtons = document.querySelectorAll("button")
const deleteForm = document.querySelector("#delete-form")
const restaurantName = document.querySelector("#restaurantName")

deleteButtons.forEach(button => {
  button.addEventListener('click', event => {
    if (event.target.classList.contains('deleteButton')) {
      const id = event.target.dataset.id
      const name = event.target.dataset.name
      deleteForm.setAttribute('action', `/restaurants/${id}/delete`)
      restaurantName.innerText = name
    }
  })
})
