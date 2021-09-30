<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">

  <div id="flightstable">

   <h1>Welcome to {{ appName }}!</h1>
  <div class="row" style="text-align: center; margin: 0 auto; height: 100vh; border: 2px solid darkcyan; ">
    <div id="flightsWorkers" class="col-md-12">
      <div id="worker-list" style="width:30%; float: left;  border-right: 3px solid cadetblue; background-color: white; height: 100%">
        <h3>Workers</h3>
        <div id="workers" v-for="worker in workers" :key="worker.id">
          <p @click="selected =worker.id; selectedFirstFlight=this.flights[0].num;  intervalFetch( worker.id );" :class="{highlight:selected == worker.id}">{{ worker.name }}</p>
        </div>
    </div>
    <div id="flight-list" style="width:50%; float:left; background-color: lightblue; height: 100%; ">
      <h3>Flights</h3>
      <div id="flightsList" v-for="flight in flights" :key="flight.num" >
        <div @click="selectedFirstFlight=flight.num; fDetails(flight.plane, flight.duration, flight.from_gate, flight.to_gate)" :class="{highlight:selectedFirstFlight == flight.num}" style="overflow: hidden;">
          <table class="table-bordered col-md-12">
            <thead class="thead-light">
            <tr>
              <th scope="col">Flight Number</th>
              <th scope="col">Origin</th>
              <th scope="col">Origin Date</th>
              <th scope="col">Destination</th>
              <th scope="col">Destination date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ flight.num }}</td>
              <td>{{ flight.from }}</td>
              <td>{{ flight.from_date }}</td>
              <td>{{ flight.to }}</td>
              <td>TO DATE:{{ flight.to_date}}</td>
            </tr>
            </tbody>
          </table>
<!--          FLIGHT: {{ flight.num }}
          FROM : {{ flight.from }} TO: {{ flight.to }}
          FROM DATE:{{ flight.from_date }} TO DATE:{{ flight.to_date}}
          PLANE: {{ flight.plane}} DURATION: {{  flight.duration  }}
          FROM GATE: {{ flight.from_gate}} TO GATE: {{ flight.to_gate}}-->
          <!--        MAKE COMMPONET AND BIND FOR FLIGHT DETAILS
                      MAKE FILTER FOR DURATION USE PIPE
          -->
        </div><br/>
      </div>
    </div>

<!--
<FlightDetails :planeNumber="planeNumber ? planeNumber : this.flights[0].plane"
               :duration="duration ? duration : this.flights[0].duration.toString()"
               :originGate="originGate ? originGate : this.flights[0].from_gate"
               :destinatioin-gate="destinationGate ? destinationGate : this.flights[0].to_gate"></FlightDetails>-->


      <div id="flight-details" style="width:20%; float:left; height: 100%; border-left: 3px solid darkcyan; background-color: white;">
        <h3>FLIGHT DETAILS {{ flightsNum ? flightsNum : this.flights[0].num}}</h3>
        <p>Plane Number {{planeNumber ? planeNumber : this.flights[0].plane}}</p>
        <p>Duration {{ duration ? duration : this.flights[0].duration }}</p>
        <p>Origin gate {{ originGate ? originGate : this.flights[0].from_gate }}</p>
        <p>Destination gate {{ destinationGate ? destinationGate : this.flights[0].to_gate  }}</p>
      </div>
    </div>
  </div>

</div>

</template>

<script lang="ts">
import
{ defineComponent } from 'vue';
 import axios    from "axios";
  import Worker from "@/type/Worker";
  import Flight from "@/type/Flight";

export default defineComponent({
  name: 'App',
   data(){
    return {
      appName : 'WORKERS FLIGHTS',
      flights:[] as Flight[],
      workers:[] as Worker[],
      firstID: [0],
      intervals: [0],
      planeNumber: '',
      duration: '',
      originGate: '',
      destinationGate: '',
      flightsNum: '',
      selected: 0,
      selectedFirstFlight: ''
      }
    },
  el:['workers', 'flightsList'],
  mounted() {
    this.selected = this.getFirstID();
    this.selectedFirstFlight = this.flights[0].num;
   this.getWorkerList();
 },
async created(){
    await this.getWorkerList();
        this.viewFlightList(this.getFirstID());
},
  methods: {
    fDetails(planeNumber: string , flightDuration: any, originGate: any, destinationGate: any ){
        this.planeNumber =  planeNumber;
        this.duration = flightDuration.toString();
        this.originGate = originGate;
        this.destinationGate= destinationGate;

    },
    getWorkerList(){
    return  axios
          .get<Worker[]>('https://interview-mock.herokuapp.com/api/workers/')
          .then( response => (this.workers = response.data))
    },
    getFirstID(){
      return this.workers[0].id;
    },
    viewFlightList(workerID: number) {
      axios
          .get<Flight[]>('https://interview-mock.herokuapp.com/api/workers/' + workerID)
          .then(response => (this.flights = response.data))

      this.planeNumber = '';
      this.duration = '';
      this.originGate = '';
      this.destinationGate = '';
      this.flightsNum ='';
      this.selectedFirstFlight='';
    },
    intervalFetch(workerID: number){
      this.viewFlightList(workerID);
      if(this.intervals.length > 0){
        for(let i = 0, length = this.intervals.length; i < length; i++){
          //console.log(key);
          clearInterval(this.intervals[i]);
        }
        let interval =  setInterval(()=> {
          this.viewFlightList(workerID);
        }, 6000);
        // console.log(interval);
        this.intervals.push(interval)
      }
      if(this.intervals.length == 0) {
        let interval =  setInterval(()=> {
          this.viewFlightList(workerID);
         }, 6000);
        // console.log(interval);
        this.intervals.push(interval)
      }

    },
  }

});
</script>

<style>
.highlight{
  background-color: aliceblue;
  padding: 10px;
}
#flightstable{
  height: 100%;
  overflow: hidden;
  background-color: lightgray;
}
.active{
  background-color: aliceblue;
}
.row{
  padding-left: 0 !important; padding-right: 0;
}
</style>
