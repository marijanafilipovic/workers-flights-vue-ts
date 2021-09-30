 import axios, {AxiosInstance} from "axios";
import http from 'axios';
 // class TutorialDataService {
//     getWorkersList(): Promise<any> {
//         return http.get("/tutorials");
//     }
// }
 class WorkerDataService {
     getAll(): Promise<any> {
         return http.get('https://interview-mock.herokuapp.com/api/workers/')
     }
   /*  getFlights(id: any): Promise<any> {
         return http.get('https://interview-mock.herokuapp.com/api/workers/${id}')
     }*/
     getFirstWorkerFlights(id: any): Promise<any> {
         return http.get('https://interview-mock.herokuapp.com/api/workers/${id}')
     }
 }
 export default new WorkerDataService();