<script>
export default {
  created: function() {
    document.addEventListener('keydown', this.handleKeydown);
    fetchData(dataset)
      .then(this.updateRanks)
      .then(res => {
        this.campers = res;
        this.isFetching = false;
        return res;
      })
      .catch((err) => {
        this.error = err.message;
        console.error(err.message);
      });
  },
  beforeDestroy: function() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    sort: function(col) {
      if (col === this.sortBy) {
        this.order *= -1;
      } else {
        this.sortBy = col;
      }
    },
    showUserCard: function(i) {
      this.showModal = true;
      this.activeCamper = i;
    },
    updateRanks: function(campers) {
      const sortedByAlltime = campers.slice()
        .sort((a, b) => b.alltime - a.alltime);
      const ranks = campers.slice()
        .map(camper => (sortedByAlltime
          .findIndex(x => x.alltime === camper.alltime) + 1)
        );

      return campers.map((camper, index) => (
        Object.assign({}, camper, {
          rank: {
            alltime: ranks[index],
            recent: index + 1,
          },
        })
      ));
    },
    handleKeydown: function(e) {
      if (!this.showModal || e.key !== 'Escape') { return; }
      this.showModal = false;
    },
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateX(-10%)';
    },
    enter: function(el, done) {
      const delay = (el.dataset.index > 11) ? 2200 : el.dataset.index * 200;
      setTimeout(function () {
        el.style.opacity = 1;
        el.style.transform = 'translateX(0)';
      }, delay);
    },
  },
  computed: {
    sortedList: function() {
      return this.campers.sort((a, b) => {
        if (this.sortBy === 'username') {
          return a.username.toUpperCase() > b.username.toUpperCase()
            ? this.order
            : this.order * -1;
        }

        if (this.order === 1) {
          return a[this.sortBy] - b[this.sortBy];
        } else {
          return b[this.sortBy] - a[this.sortBy];
        }
      });
    },
    recentClass: function() {
      return {
        'sort': true,
        'sort--desc': this.order === -1,
        'sort--asc': this.order === 1,
        'sort--active': this.sortBy === 'recent',
      };
    },
    alltimeClass: function() {
      return {
        'sort': true,
        'sort--desc': this.order === -1,
        'sort--asc': this.order === 1,
        'sort--active': this.sortBy === 'alltime',
      };
    },
    camperClass: function() {
      return {
        'sort': true,
        'sort--desc': this.order === -1,
        'sort--asc': this.order === 1,
        'sort--active': this.sortBy === 'username',
      };
    },
    fccLink: function() {
      if (this.activeCamper === null) { return null; }
      return `https://www.freecodecamp.com/${this.campers[this.activeCamper].username}`;
    },
    fccLinkTitle: function() {
      if (this.activeCamper === null) { return null; }
      return `Visit ${this.campers[this.activeCamper].username} on Free Code Camp`;
    },
    sortOrder: function() {
      return this.order === 1 ? 'ascending' : 'descending';
    },
  },
  filters: {
    number: function(num) {
      return new Intl.NumberFormat().format(num);
    },
    ordinal: function(num) {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const v = num % 100;
      return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    },
  },
};

</script>

