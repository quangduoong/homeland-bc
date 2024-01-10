export default function reducer(state, action) {
  const {
    type,
    payload: { listings },
  } = action;

  switch (type) {
    case "SET_LISTINGS":
      return {
        ...state,
        listingsLoading: false,
        listings,
      };
    default:
      return state;
  }
}
