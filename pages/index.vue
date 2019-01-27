<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <img src="@/static/vue-logo-grn.png" @click="clearPins()" class="logo" alt="">
            <input class="col-lg-12" type="text" v-on:keyup.enter="addNewPin()" v-model="currURL" placeholder="Paste a URL to add a new Pin...">
          </div>
          <div class="col-md-4 vertical-center items-right">
            <div v-if="currUser" class="fake-link">
              <span @click="filterPinsBy('currUser')" class="btn-addpin">
                {{ currUser }}
              </span> 
              <!-- <span @click="signInWithGoogle()" class="btn-addpin">Login</span> -->
              <span @click="logoutWithFirebase()" class="btn-addpin">Logout</span>
            </div>
            <div v-else class="fake-link"><span class="fake-link btn-addpin" @click="signInWithGoogle()">Login with Google</span></div>
          </div>
        </div>
      </div>
    </header>
    <section class="body">
      <PinList :allPins="visibilePins" :pinOptions="pinOptions"></PinList>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import PinList from '~/components/PinList/PinList'
import Footer from '~/components/Footer'
import Firebase from 'firebase'
import firebase from '../firebase-config.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    PinList,
    Footer
  },
  created() {
    document.title = `Vue-Pinterest (${this.allPins.length})`
    this.visibilePins = this.allPins
  },
  computed: {
    myPins: function () {
      return this.allPins.filter((pin) => {
        return pin.pinner === this.currUser
      })
    },
    ...mapGetters([
      'currUser',
    ])
  },
  data: function () {
    return {
      pinOptions: ['pin'],
      visibilePins: [],
      currURL: '',
      allPins: this.$store.state.allPins,
      userPins: []
    }
  },
  methods: {
    alert(msg) {
      alert(msg)
    },
    filterPinsBy(type) {
      let pins 

      if (type === 'currUser') {
        pins = this.allPins.filter((item) => {
          return item.pinners.includes(this.currUser)
        })

        this.pinOptions = ['delete']
      } 
      
      this.visibilePins = pins
    },
    addNewPin() {
      this.$store.commit('createNewPin',
      {
        pinID: "127",
        pinURL: this.currURL,
        pinnedBy: (this.currUser !== '') ? this.currUser : 'Anonymous',
        pinners: ['Anonymous']
      })
    },
    clearPins() {
      this.pinOptions = ['pin']
      this.visibilePins = this.allPins
    },
    addNewPinWithFirebase: function () {
      if (this.currURL === '') {
        alert('Cannot add new pin');
      } else {
        let self = this
        var img = new Image();

        img.onload = function() {
          firebase.firestore.collection('allPins').add({
            url: currURL,
            uploadedBy: 'User',
            timestamp: Date.now()
          })    
        }

        img.src = currURL;
      }
    },
    signInWithGoogle: function () {
      let self = this

      var provider = new Firebase.auth.GoogleAuthProvider();
      firebase.firebaseApp.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var data = result.user;

          self.$store.commit('setCurrUser', data.displayName.split(' ')[0])
          // self.updateUser(data)


          console.log(self.currUser)
          console.log(data)

          // alert('Google success')
      }).catch(function (error) {
          console.log(error)
      });
    },
    logoutWithFirebase: function () {
      firebase.firebaseApp.auth().signOut();
      this.currUser = ''

      alert("Successfully logged out.")
    }, 
  }
}
</script>

<style scoped>
.body {
  padding-top: 66px;
}

input[type='text'] {
  margin-top: 0px;
  padding: 8px 12px;
  background-color: #EEE;
  border: 0px;
  width: 90%;
  border-radius: 14px;
  font-weight: 700;
}

.items-right {
  justify-content: flex-end;
}

.vertical-center {
  display: flex;
  align-items: center;
}

.logo {
  width: 30px;
  margin-right: 10px;
}

.logo:hover {
  cursor: pointer;
}

.container {
  background-color: #FFF;
  margin: 4px auto 6px auto;
}

.btn-addpin {
  margin: 0px 2px;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  color: grey;
  cursor: pointer;
  font-weight: 700;
}

.btn-addpin_left {
  margin-left: 6px;
}

.btn-addpin:hover {
  background-color: #EEE;
}

.avatar {
  width: 30px;
  height: 30px;
  display: inline-block;
  background-color: #111;
  border-radius: 100%;
}

.vertical-center {
  margin-top: auto;
  margin-bottom: auto;
}
</style>