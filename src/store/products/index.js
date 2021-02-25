export default {
  state: {
    products: [
      {
        category: 'cake',
        name: 'Tiramisu',
        img: 'cake-1.jpg',
        price: 15
      },
      {
        category: 'cake',
        name: 'Choco Melaleuca',
        img: 'cake-2.jpg',
        price: 20
      },
      {
        category: 'cake',
        name: 'Oreo Cupcake',
        img: 'cake-3.jpg',
        price: 5.5
      },
      {
        category: 'cake',
        name: 'Mille Crepe Cake',
        img: 'cake-4.jpg',
        price: 35
      },
      {
        category: 'cake',
        name: 'Roses Lover',
        img: 'cake-5.jpg',
        price: 40
      },
      {
        category: 'donut',
        name: 'Light Doughnut',
        img: 'donut-1.jpg',
        price: 3.5
      },
      {
        category: 'donut',
        name: 'Heavy Doughnut',
        img: 'donut-2.jpg',
        price: 5
      },
      {
        category: 'donut',
        name: 'Nut Chocolate',
        img: 'donut-3.jpg',
        price: 4
      },
      {
        category: 'iceCream',
        name: 'Gelato',
        img: 'ice cream-1.jpg',
        price: 2.5
      },
      {
        category: 'iceCream',
        name: 'Classic Ice Cream',
        img: 'ice cream-2.jpg',
        price: 2.5
      },
      {
        category: 'iceCream',
        name: 'Devil Desire',
        img: 'ice cream-3.jpg',
        price: 5.5
      }
    ],
    dialogState: false,
    dialogProduct: null
  },
  mutations: {
    openDialog (state, payload) {
      state.dialogState = true;
      state.dialogProduct = payload;
    },
    closeDialog (state, payload) {
      state.dialogState = false;
    }
  },
  actions: {
    openDialog (context, payload) {
      context.commit('openDialog', payload);
    },
    closeDialog (context, payload) {
      context.commit('closeDialog');
    }
  },
  getters: {
    getProducts (state) {
      return state.products;
    },
    getDialogState (state) {
      return state.dialogState;
    },
    getDialogProduct (state) {
      return state.dialogProduct;
    }
  }
};
