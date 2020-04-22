<template>
  <div
    class="row"
    :class="submitStatus === 'SUBMITED' ? 'fadeOutRightBig animated' : null"
  >
    <div class="col-xl-8">
      <div class="card">
        <div class="card-body">
          <h2 class="header-title mb-4">Insert Data</h2>

          <form
            v-show="form.submitStatus !== 'PENDING'"
            method="post"
            :disabled="true"
            @submit="checkForm"
          >
            <div class="form-row mb-2">
              <div class="col-3">
                <label for="product-name">
                  Entry Date:
                </label>
                <date-picker
                  v-model="$v.fed.time.$model"
                  :first-day-of-week="1"
                  lang="en"
                  class="border-white"
                ></date-picker>

                <ul
                  v-if="$v.fed.time.$anyDirty && !$v.fed.time.required"
                  id="parsley-id-7"
                  class="parsley-errors-list filled mb-2"
                >
                  <li class="parsley-required">Requerido.</li>
                </ul>
              </div>
              <div class="col-2">
                <label for="product-name">
                  Qty Ducks:
                </label>
                <b-input-group>
                  <b-form-input
                    v-model="$v.fed.quantityDucks.$model"
                    :type="'number'"
                    :state="
                      $v.fed.quantityDucks.$anyDirty
                        ? !$v.fed.quantityDucks.$anyError
                        : null
                    "
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    <ul>
                      <li v-if="!$v.fed.quantityDucks.$required">
                        Field Required</li
                      >
                    </ul>
                  </b-form-invalid-feedback>
                </b-input-group>
              </div>
              <div class="col-2">
                <label for="product-name">
                  Qty Food:
                </label>
                <b-input-group>
                  <b-form-input
                    v-model="$v.fed.quantityFood.$model"
                    :type="'number'"
                    :state="
                      $v.fed.quantityFood.$anyDirty
                        ? !$v.fed.quantityFood.$anyError
                        : null
                    "
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    <ul>
                      <li v-if="!$v.fed.quantityFood.$required">
                        Field Required</li
                      >
                    </ul>
                  </b-form-invalid-feedback>
                </b-input-group>
              </div>
              <div class="col-2">
                <label for="product-name">
                  Park:
                </label>
                <b-form-select
                  v-model="$v.fed.id_park.$model"
                  :options="form.park.options"
                  :state="
                    $v.fed.id_park.$dirty ? !$v.fed.id_park.$anyError : null
                  "
                ></b-form-select>
                <b-form-invalid-feedback id="input-live-feedback">
                  <ul>
                    <li v-if="!$v.fed.id_park.$required"> Field Required</li>
                  </ul>
                </b-form-invalid-feedback>
              </div>
            </div>
            <div class="form-row mb-2">
              <div class="col-2">
                <label for="product-name">
                  Food:
                </label>
                <b-form-select
                  v-model="$v.fed.id_food.$model"
                  :options="form.food.options"
                  :state="
                    $v.fed.id_food.$dirty ? !$v.fed.id_food.$anyError : null
                  "
                ></b-form-select>
                <b-form-invalid-feedback id="input-live-feedback">
                  <ul>
                    <li v-if="!$v.fed.id_park.$required"> Field Required</li>
                  </ul>
                </b-form-invalid-feedback>
              </div>
              <div class="col-2"
                ><button
                  type="submit"
                  class="btn btn-primary waves-effect waves-light mt-3"
                  >Set Entry</button
                ></div
              >
            </div>
          </form>
        </div>
      </div>
      <!-- end card-box -->
    </div>
    <!-- end col -->
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import axios from 'axios'
import { required, minValue } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
})

export default {
  components: { DatePicker },
  data() {
    return {
      submitStatus: '',
      form: {
        park: {
          options: [{ value: null, text: 'Select a Park' }],
        },
        food: {
          options: [{ value: null, text: 'Select a Fed' }],
        },
      },
      fed: {
        time: new Date(),
        quantityDucks: 1,
        quantityFood: 1,
        id_user: this.$store.state.auth.currentUser.id,
        id_food: null,
        id_park: null,
      },
    }
  },
  validations() {
    return {
      fed: {
        time: { required },
        quantityDucks: { required, minValue: minValue(1) },
        quantityFood: { required, minValue: minValue(1) },
        // id_user: { required },
        id_food: { required },
        id_park: { required },
      },
    }
  },
  created: function() {
    this.fillParks()
    this.fillFoods()
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault()
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        axios
          .post('api/feds/insert', {
            data: { ...this.fed },
          })
          .then((response) => {
            this.submitStatus = 'SUBMITED'

            swalWithBootstrapButtons
              .fire({
                title: 'record entered correctly!',
                text: 'Do you want to schedule this entry?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Yes, schedule it',
                cancelButtonText: 'Not for now',
                reverseButtons: true,
              })
              .then((result) => {
                if (result.value) {
                  // swalWithBootstrapButtons.fire(
                  //   'Deleted!',
                  //   'Your file has been deleted.',
                  //   'success'
                  // )
                  this.$router.push({
                    name: 'scheduleInsert',
                    params: { id: '23' },
                  })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  this.$router.push({ name: 'homeData' })
                }
              })
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              console.log(err.response.data)
            }
            this.submitStatus = 'ERROR'
          })
      }
    },
    fillParks: function() {
      axios
        .get('/api/parks/fetch')
        .then((response) => {
          response.data.forEach((element) => {
            this.form.park.options.push({
              value: element.id,
              text: element.name,
            })
          })
          this.tableCatIsBusy = false
        })
        .catch(function(error) {
          console.log(error)
          return error
        })
    },
    fillFoods: function() {
      axios
        .get('/api/foods/fetch')
        .then((response) => {
          response.data.forEach((element) => {
            this.form.food.options.push({
              value: element.id,
              text: element.name,
            })
          })
          this.tableCatIsBusy = false
        })
        .catch(function(error) {
          console.log(error)
          return error
        })
    },
  },
}
</script>

<style></style>
