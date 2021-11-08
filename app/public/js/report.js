const SomeApp = {
    data() {
      return {
        referees: [],
        games: [],
        assignments: [],
        dateForm: {},
        selectedReferee:null,
        selectedStartDate:null,
        selectedEndDate:null
      }
    },
    computed: {},
    methods: {
        selectReferee(r) {
          if (r == this.selectedReferee) {
              return;
          }
          this.selectedReferee = r;
          this.games = [];
          this.fetchAssignData(this.selectedReferee);
        },
        selectDates(s,e) {
            this.selectedStartDate = s;
            this.selectedEndDate = e;
            this.games = []
            this.fetchAssignDatesData(this.selectedReferee, this.selectedStartDate, this.selectedEndDate)
        },
        fetchRefereeData() {
            fetch('/api/referees/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postDate(evt){
            // this.dateForm.referee = this.selectedReferee.refID;
            fetch('api/report/?referee=' + this.dateForm.refereeID + '&start=' + this.dateForm.start + "&end=" + this.dateForm.end, {
                method:'POST',
                body: JSON.stringify(this.dateForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                // reset the form
                //this.dateForm = {};
              });


        },
        fetchAssignData(r) {
            console.log('fetching data for ', r);
            fetch('/api/report/?referee=' + r.refID)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchAssignDatesData(r, s, e) {
            console.log('fetching data for ', r);
            fetch('/api/report/?referee=' + r.refID + '&start=' + s + '&end=' + e)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
    },  
    created() {
        this.fetchRefereeData();
    }
}
  
Vue.createApp(SomeApp).mount('#reportApp');


const SecondApp = {
    data() {
      return {
        assigns: [],
      }
    },
    computed: {},
    methods: {
        fetchUnassignedData() {
            fetch('/api/unreport/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assigns = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }

    },    
    created() {
        this.fetchUnassignedData();
    }
}
  
Vue.createApp(SecondApp).mount('#unassignedApp');
