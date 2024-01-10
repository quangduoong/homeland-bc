export default function reducer(state, action) {
  const {
    type,
    payload: { posts, comments },
  } = action;

  switch (type) {
    case "SET_POSTS":
      return {
        ...state,
        forumLoading: false,
        posts,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        forumLoading: false,
        posts: {
          comments: comments,
        },
      };
    default:
      return state;
  }
}
