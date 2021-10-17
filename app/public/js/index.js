const SomeApp = {
    data() {
      return {
        referees: [],
        games: [],
      }
    },
    computed: {},
    methods: {
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

        fetchGameData() {
            fetch('/api/games/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        
        // postNewOffer(evt) {
        //   this.offerForm.studentId = this.selectedStudent.id;        
        //   console.log("Posting:", this.offerForm);
        //   // alert("Posting!");
  
        //   fetch('api/offer/create.php', {
        //       method:'POST',
        //       body: JSON.stringify(this.offerForm),
        //       headers: {
        //         "Content-Type": "application/json; charset=utf-8"
        //       }
        //     })
        //     .then( response => response.json() )
        //     .then( json => {
        //       console.log("Returned from post:", json);
        //       // TODO: test a result was returned!
        //       this.offers = json;
              
        //       // reset the form
        //       this.offerForm = {};
        //     });
        // }
    },
    created() {
        this.fetchRefereeData();
        this.fetchGameData();
        console.log("Here")
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#gameApp');