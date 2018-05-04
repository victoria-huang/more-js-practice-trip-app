class Trip {
  constructor(id, location, price, duration, userId) {
    this.id = id;
    this.location = location;
    this.price = price;
    this.duration = duration;
    this.userId = userId;
  }

  static createTrips(trips) {
    return trips.map(t => {
      return new Trip(t.id, t.location, t.price, t.duration, t.user_id)
    })
  }

  showTrip() {
    let tripList = document.getElementById('trip-list');
    let tripEle = document.createElement('li');
    tripEle.setAttribute('id', `trip-id-${this.id}`);
    tripEle.innerHTML = `<div id=trip-div-${this.id}><h4>${this.location}</h4>Price: $${this.price}<br>Duration: ${this.duration}</div><br>`
    let editTripButton = document.createElement('button');
    editTripButton.setAttribute('id', `edit-trip-${this.id}`);
    editTripButton.innerText = "Edit Trip";
    tripEle.append(editTripButton);

    editTripButton.addEventListener('click', (e) => { this.editTrip() })

    tripList.append(tripEle);
  }

  renderEditTripForm() {
    return `
      <h2>Edit Trip to ${this.location}</h2>
      <form id="edit-trip-form">
        <label for="edit-trip-location">Location</label><br>
        <textarea type="text" id="edit-trip-location">${this.location}</textarea>
        <br><br>
        <label for="edit-trip-price">Price</label><br>
        <input type="number" step="0.01" id="edit-trip-price" value=${this.price}>
        <br><br>
        <label for="edit-trip-duration">Duration</label><br>
        <textarea type="text" id="edit-trip-duration">${this.duration}</textarea>
        <br><br>
        <input type="Submit" value="Edit Trip">
      </form>
      <br>
      <button id="delete-trip">Delete Trip</button>
    `
  }

  editTrip() {
    let formDiv = document.getElementById('forms');
    formDiv.innerHTML = this.renderEditTripForm();

    let editTripForm = document.getElementById('edit-trip-form')
    editTripForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let location = document.getElementById('edit-trip-location').value;
      let price = parseFloat(document.getElementById('edit-trip-price').value);
      let duration = document.getElementById('edit-trip-duration').value;
      formDiv.innerHTML = "";
      this.updateTrip(location, price, duration);
    })

    let deleteButton = document.getElementById('delete-trip');
    deleteButton.addEventListener('click', (e) => { this.deleteTrip() })
  }

  updateTrip(location, price, duration) {
    let body = {
      location: location,
      price: price,
      duration: duration,
      user_id: `${this.userId}`
    }
    tripAdapter.editResource(`${this.id}`, body);
    
    this.location = location;
    this.price = price;
    this.duration = duration;
    let tripEle = document.getElementById(`trip-div-${this.id}`);
    tripEle.innerHTML = `<h4>${location}</h4>Price: $${price}<br>Duration: ${duration}<br>`
  }

  deleteTrip() {
    let formDiv = document.getElementById('forms');
    formDiv.innerHTML = "";
    tripAdapter.deleteResource(`${this.id}`);
    document.getElementById(`trip-id-${this.id}`).remove();
  }
}
