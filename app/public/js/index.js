const SomeApp = {
    data() {
      return {
        referees: [],
        games: [],
        refereeForm:{},
        gameForm:{},
        assignForm:{},
        assign:null,
        selectedGame: null,
        selectedReferee: null,
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

        fetchAssignmentData() {
          fetch('/api/assignment/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.assign = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },

        selectReferee(r) {
          if (r == this.selectedReferee) {
              return;
          }
          this.selectedReferee = r;
          this.games = [];
          this.fetchGameData(this.selectedReferee);
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
        },

        postAssignment(evt) {
          //   this.offerForm.studentId = this.selectedStudent.id;        
            console.log("Posting:", this.assignForm);
            // alert("Posting!");
    
            fetch('api/assignment/create.php', {
                method:'POST',
                body: JSON.stringify(this.assignForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assign = json;
                
                // reset the form
                this.assignForm = {};
                this.fetchAssignmentData();
              });
          },

      handleEditReferee(r) {
          this.selectedReferee = r;
          console.log("here")
          this.refereeForm = Object.assign({}, this.selectedReferee); //set form to data
          console.log("here2")
        },

      handleResetEdit(){
          this.selectedReferee = null;
          this.refereeForm = {}
      },

      postReferee(evt){
        if(this.selectedReferee){
            this.postEditReferee();
        }
        else{
            this.postNewReferee();
        }
      },

      postEditReferee(evt){
          // if you want to update you need an id
          this.refereeForm.id = this.selectedReferee.id       
          console.log("Updating:", this.refereeForm);
          
          // send it to a different api
          fetch('api/referees/update.php', {
            method:'POST',
            body: JSON.stringify(this.refereeForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            this.referees = json;
            
            // clear out the form and selected referees
            this.handleResetEdit();
          });
      },

      postDeleteReferee(o) {  
        if ( !confirm("Are you sure you want to delete the referee " + o.firstName + "?") ) {
            return;
        }  
        
        console.log("Delete!", o);

        fetch('api/referees/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
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
            this.handleResetEdit();
          });
      },

      postEditGame(evt){
        // if you want to update you need an id
        this.gameForm.id = this.selectedGame.id       
        console.log("Updating:", this.gameForm);
        
        // send it to a different api
        fetch('api/games/update.php', {
          method:'POST',
          body: JSON.stringify(this.gameForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.games = json;
          
          // clear out the form and selected referees
          this.handleResetEditGame();
        });
      },

      postDeleteGame(o) {  
        if ( !confirm("Are you sure you want to delete the game " + o.firstName + "?") ) {
            return;
        }  
        
        console.log("Delete!", o);

        fetch('api/games/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
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
            this.handleResetEditGame();
          });
      },

      handleResetEditGame(){
        this.selectedGame = null;
        this.gameForm = {}
      },

      handleEditGame(r) {
        this.selectedGame = r;
        console.log("here")
        this.gameForm = Object.assign({}, this.selectedGame); //set form to data
        console.log("here2")
      },

      postGame(evt){
        if(this.selectedGame){
            this.postEditGame();
        }
        else{
            this.postNewGame();
        }
      },

      postDeleteAssignment(o) {  
        if ( !confirm("Are you sure you want to delete the assignment?") ) {
            return;
        }  
        
        console.log("Delete!", o);
  
        fetch('api/assignment/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.assign = json;
            
            // reset the form
            this.handleResetEdit();
            // this.fetchAssignmentData();
          });
      },


  
    },

    created() {
        this.fetchRefereeData();
        this.fetchGameData();
        this.fetchAssignmentData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#gameApp');