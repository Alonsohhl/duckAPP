<template>
  <div class="">
    <!-- <b-form-checkbox v-model="checked" name="check-button" switch>
      Switch Checkbox <b>(Checked: {{ checked }})</b>
    </b-form-checkbox> -->

    <b-form @submit="onSubmit">
      <div class="form-row mb-2">
        <div class="col-3">
          <label for="product-name " class=" mb-0">
            Start Date:
          </label>

          <date-picker
            v-model="$v.startDate.$model"
            :first-day-of-week="1"
            lang="en"
            class="border-white mt-0"
            :state="false"
            :input-class="
              $v.startDate.$anyError
                ? 'form-control date-is-invalid'
                : 'form-control'
            "
          >
          </date-picker>
          <ul
            v-if="$v.startDate.$anyDirty && !$v.startDate.minValue"
            id="parsley-id-7"
            class="parsley-errors-list filled mb-2"
          >
            <li class="parsley-required">must start after entry Date.</li>
          </ul>
        </div>
      </div>
      <div class="form-row mb-2">
        <label for="product-name" class=" mb-0">
          how often:
        </label>
        <b-form-select
          v-model="$v.selected.$model"
          :options="options"
          :state="$v.selected.$dirty ? !$v.selected.$anyError : null"
        ></b-form-select>
      </div>

      <div v-if="selected === 'custom'" class="form-row">
        <b-form-checkbox-group
          v-model="checkbox.selected"
          :options="checkbox.options"
          class="mb-3 .checkbox-circle"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
          stacked
          checkboxes
        ></b-form-checkbox-group>
      </div>

      <div class="form-row mb-2">
        <div class="col-3">
          <label for="product-name " class=" mb-0">
            ends on:
          </label>

          <date-picker
            v-model="$v.endDate.$model"
            :first-day-of-week="1"
            lang="en"
            class="border-white mt-0"
            :state="false"
            :input-class="
              $v.endDate.$anyError
                ? 'form-control date-is-invalid'
                : 'form-control'
            "
          >
          </date-picker>
          <ul
            v-if="$v.endDate.$anyDirty && !$v.endDate.minValue"
            id="parsley-id-7"
            class="parsley-errors-list filled mb-2"
          >
            <li class="parsley-required">must start after Start Date.</li>
          </ul>
        </div>
      </div>
      <div class="form-row mb-2">
        <button
          type="submit"
          class="btn btn-primary waves-effect waves-light mt-3"
          >Set Schedule</button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import DatePicker from 'vue2-datepicker'
import Swal from 'sweetalert2'
// import moment from 'moment'
// import integer from 'vuelidate/lib/validators/integer'
import axios from 'axios'

export default {
  components: { DatePicker },
  props: {
    id: String,
  },
  data() {
    return {
      initialdate: new Date(),
      selected: 'daily',
      options: [
        { value: 'daily', text: 'Daily' },
        { value: 'week', text: 'Once a Week' },
        { value: 'custom', text: 'Custom', disabled: true },
      ],
      startDate: new Date(),
      checkbox: {
        selected: [],
        options: [
          { item: '1', name: 'Monday' },
          { item: '2', name: 'Tuesday' },
          { item: '3', name: 'Wednesday' },
          { item: '4', name: 'Thursday' },
          { item: '5', name: 'Friday' },
          { item: '6', name: 'Saturday' },
          { item: '7', name: 'Sunday' },
        ],
      },
      endDate: new Date(),
    }
  },
  created: function() {
    axios.get(`/api/feds/fetch?id=${this.id}`).then((res) => {
      if (res.data && res.data.length > 0) {
        this.initialdate = res.data[0].time
      }
    })
  },

  validations() {
    return {
      selected: { required },
      startDate: { required, minValue: minValue(this.initialdate) },
      endDate: { required, minValue: minValue(this.startDate) },
    }
  },
  methods: {
    onSubmit: function(e) {
      e.preventDefault()
      axios
        .post('/api/schedules/insert', {
          data: {
            id_fed: this.id,
            endDate: this.endDate,
            frequencyType: this.selected,
          },
        })
        .then(() => {
          Swal.fire({
            title: 'success!',
            text: 'schedule entered correctly',
            confirmButtonText: 'continue',
          })
          this.$router.push({ name: 'homeData' })
        })
    },
  },
}
</script>

<style>
.date-is-invalid {
  border-color: #dc3545;
}
</style>
