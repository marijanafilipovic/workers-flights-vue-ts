<template>
<div id="flightstable">

   <h1>Welcome to {{ appName }}!</h1>
  <div class="row" style="text-align: center; margin: 0 auto;">
    <div id="flightsWorkers" class="col-md-12  ">
      <div id="worker-list" style="width:30%; float: left; ">
        <h3>Workers</h3>
        <div v-for="worker in workers" :key="worker.id">
          <p @click="intervalFetch( worker.id );" >{{ worker.name }}</p>
        </div>
    </div>
    <div id="flight-list" style="width:50%; float:left;">
      <h3>Flights</h3>
      <div v-for="flight in flights" :key="flight.num" >
        <p @click="fDetails(flight.plane, flight.duration, flight.from_gate, flight.to_gate)" style="overflow: hidden">
          FLIGHT: {{ flight.num }}
          FROM : {{ flight.from }} TO: {{ flight.to }}
          FROM DATE:{{ flight.from_date }} TO DATE:{{ flight.to_date}}
          PLANE: {{ flight.plane}} DURATION: {{  flight.duration  }}
          FROM GATE: {{ flight.from_gate}} TO GATE: {{ flight.to_gate}}
          <!--        MAKE COMMPONET AND BIND FOR FLIGHT DETAILS
                      MAKE FILTER FOR DURATION USE PIPE
          -->
        </p><br/>
      </div>
    </div>


<FlightDetails :planeNumber="planeNumber ? planeNumber : this.flights[0].plane"
               :duration="duration ? duration : this.flights[0].duration.toString()"
               :originGate="originGate ? originGate : this.flights[0].from_gate"
               :destinatioin-gate="destinationGate ? destinationGate : this.flights[0].to_gate"></FlightDetails>


      <div id="flight-details" style="width:20%; float:left;">
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
      flightsNum: ''
      }
    },
  mounted() {
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

#flightstable{
  height: 100%;
  overflow: hidden;
  background-color: lightgray;
}
.active{
  background-color: aliceblue;
}
</style>
