export default {
  // this mutatation is called when the route changes
  ROUTE_CHANGED (state, { to, from }) {
    console.log('route changed from', from.name, 'to', to.name)
  },
  TOGGLE_MINER (state, bool) {
    state.mining = !!bool
  },
  HASH_RATE (state, rate) {
    state.hashRate = rate * state.miningPower
  },
  MINE_INCREMENT (state, increment) {
    if (!increment) return
    state.totalMined = state.totalMined + increment
  },
  TIME_INCREMENT (state, inc) {
    if (!inc) return
    state.mineTime = state.mineTime + parseInt(inc)
  },
  CORE_COUNT (state, count) {
    state.miningPower = count
  },

  MINED_CLOVER (state, clover) {
    state.cloversFound = state.cloversFound + 1
    state.allMinedClovers.unshift(clover)
    if (window.localstorage) {
      window.localStorage.setItem(state.account + '_cloversFound', JSON.stringify(state.cloversFound))
    }
  },
  EXISTING_CLOVERS (state, clovers) {
    state.allMinedClovers.push(...clovers)
  },
  CLAIMED_CLOVER (state, byteBoard) {
    // let i = state.allMinedClovers.findIndex(cl => cl.byteBoard === byteBoard)
    // // Object.assign(state.allMinedClovers[i], { claimed: new Date() })
    // let clover = state.allMinedClovers[i]
    // clover.claimed = new Date()
    // state.allMinedClovers.splice(i, 1, clover)
    // if (window.localstorage) {
    //   window.localStorage.setItem(state.account + '_clovers', JSON.stringify(state.allMinedClovers))
    // }
  },
  UPDATE_CLOVER_PRICE (state, { byteBoard, newVal }) {
    let i = state.allMinedClovers.findIndex(cl => cl.byteBoard === byteBoard)
    Object.assign(state.allMinedClovers[i], {startPrice: newVal})
  },
  REMOVE_MINED_CLOVER (state, { byteBoard }) {
    let i = state.allMinedClovers.findIndex(cl => cl.byteBoard === byteBoard)
    if (i > -1) state.allMinedClovers.splice(i, 1)
  },
  UPDATE_CLOVER (state, clover) {
    state.clover = Object.assign(state.clover, clover)
  },
  STORED_CLOVERS (state, clovers) {
    state.allMinedClovers = clovers
  },
  STORED_COUNT (state, total) {
    state.totalMined = total
  },
  STORED_DURATION (state, duration) {
    state.mineTime = duration
  },
  STORED_CLOVERS_FOUND (state, count) {
    if (count < state.allMinedClovers.length) {
      state.cloversFound = state.allMinedClovers.length
    }
    state.cloversFound = count
  },
  ADD_REGISTERED_EVENT (state, event) {
    let rIndex = state.registeredEvents.findIndex((e) => e.transactionHash === event.transactionHash)
    if (rIndex < 0) state.registeredEvents.push(event)
  },
  ADD_REGISTERED_EVENTS (state, events) {
    state.registeredEvents = events
  },
  ADD_USERNAME_EVENT (state, event) {
    let rIndex = state.usernameEvents.findIndex((e) => e.transactionHash === event.transactionHash)
    if (rIndex < 0) state.usernameEvents.push(event)
  },
  ADD_USERNAME_EVENTS (state, events) {
    state.usernameEvents = events
  },
  ADD_CLOVERNAME_EVENT (state, event) {
    let rIndex = state.clovernameEvents.findIndex((e) => e.transactionHash === event.transactionHash)
    if (rIndex < 0) state.clovernameEvents.push(event)
  },
  ADD_CLOVERNAME_EVENTS (state, events) {
    state.clovernameEvents = events
  },
  ADD_MSG (state, msg) {
    state.messages.push(msg)
  },
  REMOVE_MSG (state, msgId) {
    let msgKey = state.messages.findIndex((m) => m.id === msgId)
    if (msgKey < 0) return
    state.messages.splice(msgKey, 1)
  }

}
