// import axios from 'axios'
import * as authModule from './auth'

describe('@state/modules/auth', () => {
  it('exports a valid Vuex module', () => {
    expect(authModule).toBeAVuexModule()
  })

  describe('in a store', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(authModule)
      window.localStorage.clear()
    })

    it('mutations.SET_CURRENT_USER correctly saves currentUser in localStorage', () => {
      let savedCurrentUser = JSON.parse(
        window.localStorage.getItem('auth.currentUser')
      )
      expect(savedCurrentUser).toEqual(null)

      const expectedCurrentUser = { token: 'some-token' }
      store.commit('SET_CURRENT_USER', expectedCurrentUser)

      savedCurrentUser = JSON.parse(
        window.localStorage.getItem('auth.currentUser')
      )
      expect(savedCurrentUser).toEqual(expectedCurrentUser)
    })

    it('getters.loggedIn returns true when currentUser is an object', () => {
      store.commit('SET_CURRENT_USER', {})
      expect(store.getters.loggedIn).toEqual(true)
    })

    it('getters.loggedIn returns false when currentUser is null', () => {
      store.commit('SET_CURRENT_USER', null)
      expect(store.getters.loggedIn).toEqual(false)
    })

    it('actions.logIn resolves to a refreshed currentUser when already logged in', () => {
      expect.assertions(2)

      store.commit('SET_CURRENT_USER', { token: validUserExample.token })
      return store.dispatch('logIn').then((user) => {
        expect(user).toEqual(validUserExample)
        expect(store.state.currentUser).toEqual(validUserExample)
      })
    })

    it('actions.logIn commits the currentUser and resolves to the user when NOT already logged in and provided a correct username and password', () => {
      expect.assertions(2)

      return store
        .dispatch('logIn', { username: 'admin', password: 'password' })
        .then((user) => {
          expect(user).toEqual(validUserExample)
          expect(store.state.currentUser).toEqual(validUserExample)
        })
    })

    it('actions.logIn rejects with 400 when NOT already logged in and provided an incorrect username and password', () => {
      expect.assertions(1)

      return store
        .dispatch('logIn', {
          username: 'bad username',
          password: 'bad password',
        })
        .catch((error) => {
          expect(error.message).toEqual('Request failed with status code 400')
        })
    })

    it('actions.validate resolves to null when currentUser is null', () => {
      expect.assertions(1)

      store.commit('SET_CURRENT_USER', null)
      return store.dispatch('validate').then((user) => {
        expect(user).toEqual(null)
      })
    })

    it('actions.validate resolves to null when currentUser contains an invalid token', () => {
      expect.assertions(2)

      store.commit('SET_CURRENT_USER', { token: 'invalid-token' })
      return store.dispatch('validate').then((user) => {
        expect(user).toEqual(null)
        expect(store.state.currentUser).toEqual(null)
      })
    })
  })
})

const validUserExample = {
  id: 1,
  username: 'Alonso',
  name: 'fresh',
  token: 'valid-token-for-admin',
  email: 'alonso.hl25@gmail.com',
}
