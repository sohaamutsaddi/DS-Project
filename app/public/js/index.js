const SomeApp = {
    data() {
      return {
        referees: [],
        games: [],
        refereeForm:{},
        gameForm:{},
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
        
        postNewReferee(evt) {
        //   this.offerForm.studentId = this.selectedStudent.id;        
          console.log("Posting:", this.refereeForm);
          // alert("Posting!");
  
          fetch('api/referees/create.php', {
              method:'POST',
              body: JSON.stringify(this.refereeForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              // reset the form
              this.refereeForm = {};
            });
        },

        postNewGame(evt) {
            //   this.offerForm.studentId = this.selectedStudent.id;        
              console.log("Posting:", this.gameForm);
              // alert("Posting!");
      
              fetch('api/games/create.php', {
                  method:'POST',
                  body: JSON.stringify(this.gameForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.games = json;
                  
                  // reset the form
                  this.gameForm = {};
                });
            }
    },
    created() {
        this.fetchRefereeData();
        this.fetchGameData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#gameApp');