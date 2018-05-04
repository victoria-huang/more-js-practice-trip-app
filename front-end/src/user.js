class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  showUser() {
    let usersList = document.getElementById('users-list');

    let userEle = document.createElement('p');
    userEle.setAttribute('id', `user-id-${this.id}`);
    userEle.innerText = `${this.name}`;

    usersList.append(userEle);

    userEle.addEventListener('click', (e) => { this.showUserPanel() });
  }

  showUserPanel() {
    document.getElementById('forms').innerHTML = "";
    let userPanelName = document.getElementById('user-name');
    userPanelName.innerHTML = `${this.name}'s Trips<br>`

    let addTripButton = document.createElement('button');
    addTripButton.setAttribute('id', `add-trip-user-${this.id}`);
    addTripButton.innerText = 'Add a New Trip';
    userPanelName.append(addTripButton);

    addTripButton.addEventListener('click', (e) => {this.addTrip()})

    let tripList = document.getElementById('trip-list');
    tripList.innerHTML = ""
    let userTrips = this.getTrips();
  }

  getTrips() {
    tripAdapter.getAllResources()
    .then(tripsJSON => {
      return tripsJSON.filter(trip => { return trip.user_id === this.id })
    })
    .then(userTrips => Trip.createTrips(userTrips) )
    .then(trips => { trips.forEach(trip => trip.showTrip()) })
  }

  renderAddTripForm() {
    return `
      <h2>Add Trip for ${this.name}</h2>
      <form id="add-trip-form">
        <label for="trip-location">Location</label><br>
        <input type="text" id="trip-location" placeholder="location" required>
        <br><br>
        <label for="trip-price">Price</label><br>
        <input type="number" step="0.01" id="trip-price" placeholder="price" required>
        <br><br>
        <label for="trip-duration">Duration</label><br>
        <input type="text" id="trip-duration" placeholder="duration" required>
        <br><br>
        <input type="Submit" value="Add Trip">
      </form>
    `
  }

  addTrip() {
    let formDiv = document.getElementById('forms');
    formDiv.innerHTML = this.renderAddTripForm();
    let addTripForm = document.getElementById('add-trip-form')
    addTripForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let location = document.getElementById('trip-location').value;
      let price = parseFloat(document.getElementById('trip-price').value);
      let duration = document.getElementById('trip-duration').value;
      formDiv.innerHTML = "";
      this.createTrip(location, price, duration);
    })
  }

  createTrip(location, price, duration) {
    let body = {
      location: location,
      price: price,
      duration: duration,
      user_id: `${this.id}`
    }
    tripAdapter.createResource(body)
    .then(tripJSON => {
      return new Trip(tripJSON.id, tripJSON.location, tripJSON.price, tripJSON.duration, tripJSON.user_id)
    })
    .then(trip => trip.showTrip())
  }
}
