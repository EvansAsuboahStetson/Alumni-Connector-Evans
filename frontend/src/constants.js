exports.constants = {
  API: {
    BASE_URL: "http://localhost:8080",
    ENDPOINTS: {
      LOGIN: "/api/auth/login",
      SIGNUP: "/api/auth/signup",
      USERS: "/api/users",
      EVENTS: "/api/events",
      FOLLOWEREVENTS:"/api/user/follower/events",
      FRIENDS:"/api/user/follower/friends",
      USERBYID:"/api/user/userId",
      ///user/namesOfPendingRequest
      FRIENDREUQESTNAMES:"/api/user/namesOfPendingRequest",
      FOLLOWERPOSTS: "/api/user/follower/posts",
      MATCHES:"/api/user/matches",
      FILTER:"/api/user/filter",
      CONNECTIONREQUEST:"/api/user/connect",
      PENDINGEXIST:"/api/user/pending",
      PENDDINGUSEREXIST:"/api/user/pendingRequest",
      DELETEFRIENDREQUEST:"/api/user/deleteRequest",
      ACCEPTFRIENDREQUEST:"/api/user/acceptRequest",
      CONNECTIONEXIST:"/api/user/connectionexist",
      SENTREQUEST:"/api/user/sentRequest",
      
    },
  },
};
