import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  sendOTP,
  verifyEmail,
  signIn,
  getCurrentUser,
  postParkingLot,
  getFreeParkingLots,
  bookSlot,
  getBookedSlots,
  postFeedback,
  getUsersName,
  getUserHistory,
  getParkingLots,
  getParkingLotsNear,
  getParkingLotHistory,
  setProfilePic,
  cancelBookedSlot,
  deleteParkingLot,
  makeActiveParkingLot,
  getCancelledSlots,
  sendResetEmail,
  resetPassword,
  resendOTP,
  checkoutBookSlot,
} from "../api/index.js";
import decode from "jwt-decode";
import dayjs from "dayjs";

//This is the store which will be accessible to all the components in the website
const initialStore = {
  user: {},
  alert: {},
  freeParkingLots: [],
  bookedTimeSlots: [],
  usersName: [],
  parkingLotNames: [],
  parkingLotDetails: {},
  paymentOrder: {},
  inProgress1: false,
  inProgress2: false,
};
/*In each of the below functions an api call is made to server to get data
and then return that data with some modification which will be in turn captured by reducer made for that request when it is fulfilled
or pending, we can modify the store with that data to make changes dynamically in website*/

//send otp to user mail which will be used later to verify user account
export const asyncsendOTP = createAsyncThunk(
  "users/sendOTP",
  async (formData) => {
    try {
      const { data } = await sendOTP(formData);
      //This will be used as alert
      return { ...data, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log(err);
      }
    }
  }
);

//resend otp to user mail
export const asyncresendOtp = createAsyncThunk(
  "users/resendOtp",
  async (formData) => {
    try {
      const { data } = await resendOTP(formData);
      return { ...data, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log(err);
      }
    }
  }
);

//verify the user's account with email and otp entered
export const asyncverifyEmail = createAsyncThunk(
  "users/verifyEmail",
  async (formData) => {
    try {
      const { data } = await verifyEmail(formData);
      return { ...data, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;

        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//sign In a user , it returns a token in response from server
//The token will be saved in localstorage
//current user is loaded to get userData
export const asyncsignIn = createAsyncThunk(
  "users/signIn",
  async (formData) => {
    try {
      const { data } = await signIn(formData);
      localStorage.setItem("authToken", JSON.stringify(data));
      const response = await getCurrentUser();
      const userData = response.data;
      return {
        alertData: { msg: "Logged In Successfully", type: "success" },
        userData: userData,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;

        return { alertData: { ...data, type: "error" }, userData: {} };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//loading user data when authToken exists in localStorage
export const asyncloadUser = createAsyncThunk("users/loadUser", async () => {
  console.log("loading user");
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log("user found");
      //decode the token and check if it is expired
      //if yes then remove token from localstorage and reload page
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        return { msg: "LogOut" };
      } else {
        //if yes then loadUser
        const { data } = await getCurrentUser();
        return data;
      }
    } else {
      console.log("not logged in");
    }
  } catch (err) {
    console.log(err);
  }
});

//add a parking lot to database
export const asyncpostParkingLot = createAsyncThunk(
  "parkings/postParkingLot",
  async (formData) => {
    try {
      const { data } = await postParkingLot(formData);
      return { ...data, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//get free parking lots according to passed parameters
export const asyncgetParkingLot = createAsyncThunk(
  "parkings/getParkingLot",
  async (formData) => {
    try {
      const { data } = await getFreeParkingLots(formData);
      return {
        alertData: { msg: data.msg, type: "success" },
        freeParkingLots: data.freeParkingLots,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//post feedback from a user
export const asyncpostFeedback = createAsyncThunk(
  "users/postFeedback",
  async (formData) => {
    try {
      const { data } = await postFeedback(formData);
      return { msg: data.msg, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//get booked slots for the currently logged in user
export const asyncgetBookedSlots = createAsyncThunk(
  "parkings/getBookedSlots",
  async () => {
    try {
      const { data } = await getBookedSlots();
      return {
        alertData: { msg: data.msg, type: "success" },
        bookedTimeSlots: data.bookedTimeSlots,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//cancel a booked slot
export const asyncCancelParkingSlot = createAsyncThunk(
  "parkings/cancelParkingSlot",
  async (formData) => {
    try {
      const { data } = await cancelBookedSlot(formData);
      return { alertData: { msg: data.msg, type: "success" }, id: formData.id };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//get all the users name
export const asyncgetUsersName = createAsyncThunk(
  "admin/getUsersName",
  async () => {
    try {
      const { data } = await getUsersName();
      return {
        alertData: { msg: data.msg, type: "success" },
        usersName: data.usersName,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;

        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//get all the booked slots of a particular user
export const asyncgetUserHistory = createAsyncThunk(
  "admin/getUserHistory",
  async (formData) => {
    try {
      const { data } = await getUserHistory(formData);
      return {
        alertData: { msg: data.msg, type: "success" },
        bookedTimeSlots: data.bookedTimeSlots,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//get parking lots names
export const asyncgetParkingLots = createAsyncThunk(
  "admin/getparkingLots",
  async () => {
    try {
      const { data } = await getParkingLots();
      return {
        alertData: { msg: data.msg, type: "success" },
        parkingLots: data.parkingLots,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//ignore
export const asyncgetParkingLotsNear = createAsyncThunk(
  "admin/getparkingLotsNear",
  async (formData) => {
    try {
      const { data } = await getParkingLotsNear(formData);
      return {
        alertData: { msg: data.msg, type: "success" },
        parkingLots: data.parkingLots,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//get all booked slots for a particular parking lot
export const asyncgetParkingLotHistory = createAsyncThunk(
  "admin/getParkingLotHistory",
  async (formData) => {
    try {
      const { data } = await getParkingLotHistory(formData);
      return {
        alertData: { msg: data.msg, type: "success" },
        bookedTimeSlots: data.bookedTimeSlots,
        parkingLotDetails: data.parkingLotDetails,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//make a parking lot inactive
export const asyncDeleteParkingLot = createAsyncThunk(
  "admin/removeParkingLot",
  async (formData) => {
    try {
      const { data } = await deleteParkingLot(formData);
      return { alertData: { msg: data.msg, type: "success" }, id: formData.id };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//make a parking lot acyive again
export const asyncMakeActiveLot = createAsyncThunk(
  "admin/makeActiveLot",
  async (formData) => {
    try {
      const { data } = await makeActiveParkingLot(formData);
      return { alertData: { msg: data.msg, type: "success" }, id: formData };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//get all the cancelled slots
export const asyncgetCancelledSlots = createAsyncThunk(
  "admin/cancelledSlots",
  async () => {
    try {
      const { data } = await getCancelledSlots();
      return {
        alertData: { msg: data.msg, type: "success" },
        cancelledSlots: data.cancelledSlots,
      };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//set profile pic
export const asyncsetProfilePic = createAsyncThunk(
  "users/profilePic",
  async (formData) => {
    try {
      const { data } = await setProfilePic(formData);
      return { msg: data.msg, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//send email to logged in user with link to reset password
export const asyncSendResetEmail = createAsyncThunk(
  "users/resetEmail",
  async (formData) => {
    try {
      const { data } = await sendResetEmail(formData);

      return { msg: data.msg, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;

        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

//send the new password to server to reset
export const asyncresetPassword = createAsyncThunk(
  "users/resetPassword",
  async (formData) => {
    try {
      const { data } = await resetPassword(formData);

      return { msg: data.msg, type: "success" };
    } catch (err) {
      if (err.response) {
        const data = err.response.data;

        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

export const asynccheckOutBookSlot = createAsyncThunk(
  "payments/checkoutBookSlot",
  async (param) => {
    try {
      const { formData, userData } = param;
      if (formData.type === "public" || formData.type === "private") {
        const { data } = await checkoutBookSlot(formData);
        return { msg: data.msg, type: "success" };
      }
      console.log(userData);
      const { data } = await checkoutBookSlot(formData);

      return { alertData: { msg: data.msg, type: "success" }};
    } catch (err) {
      if (err.response) {
        const data = err.response.data;

        return { ...data, type: "error" };
      } else {
        console.log("Error", err);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialStore,
  //this are the functions which change state of the store with parameters inside action
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("authToken");
      state.user = {};
      state.bookedTimeSlots = [];
      state.freeParkingLots = [];
      state.usersName = [];
      state.parkingLotNames = [];
      state.parkingLotDetails = {};
      state.alert = { msg: "Logged out", type: "warning" };
    },
    clearAlert: (state) => {
      state.alert = {};
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearFreeParkingLots: (state) => {
      state.freeParkingLots = [];
    },
    clearBookedTimeSlots: (state) => {
      state.bookedTimeSlots = [];
    },
    clearParkingLotDetails: (state) => {
      state.parkingLotDetails = {};
    },
    setUserProfilePic: (state, action) => {
      state.user = { ...state.user, profilePic: action.payload };
    },
    setInProgress2: (state, action) => {
      state.inProgress2 = action.payload;
    },
    checkLoggedIn: (state) => {
      if (!localStorage.getItem("authToken")) {
        console.log("No token");
        state.alert = {
          msg: "Please, Login to view this page",
          type: "warning",
        };
      } else {
        const token = localStorage.getItem("authToken");
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          console.log("token expired");
          localStorage.removeItem("authToken");
          state.user = {};
          state.bookedTimeSlots = [];
          state.freeParkingLots = [];
          state.usersName = [];
          state.parkingLotNames = [];
          state.parkingLotDetails = {};
          state.alert = {
            msg: "You have been logged Out, Login to view this page",
            type: "warning",
          };
        }
      }
    },
  },
  //above async requests thunk when pending or fulfilled the returned data will be inside action
  //which will be used to update the state which will in turn change the UI dynamically
  extraReducers(builder) {
    builder
      .addCase(asyncsendOTP.pending, (state, action) => {
        state.inProgress1 = true;
        state.alert = { msg: "Processing...", type: "info" };
      })
      .addCase(asyncsendOTP.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.inProgress1 = false;
        console.log("In otp reducer");
      })
      .addCase(asyncresendOtp.pending, (state, action) => {
        state.inProgress1 = true;
        state.alert = { msg: "Processing...", type: "info" };
      })
      .addCase(asyncresendOtp.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.inProgress1 = false;
        console.log("In resend otp reducer");
      })
      .addCase(asyncverifyEmail.pending, (state, action) => {
        state.alert = { msg: "Processing...", type: "info" };
        state.inProgress1 = true;
      })
      .addCase(asyncverifyEmail.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.inProgress1 = false;
        console.log("In verifyotp reducer");
      })
      .addCase(asyncsignIn.pending, (state, action) => {
        state.alert = { msg: "Processing", type: "info" };
        state.inProgress1 = true;
      })
      .addCase(asyncsignIn.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.user = action.payload.userData;
          }
          state.inProgress1 = false;
        }
        console.log("In signIn reducer");
      })
      .addCase(asyncloadUser.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            localStorage.removeItem("authToken");
            window.location.reload();
            state.user = {};
          } else {
            state.user = action.payload;
          }
          console.log("In loaduser reducer");
        }
      })
      .addCase(asyncpostParkingLot.pending, (state) => {
        state.inProgress1 = true;
        state.alert = { msg: "Submitting Details", type: "info" };
      })
      .addCase(asyncpostParkingLot.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.inProgress1 = false;
        console.log("In postParking reducer");
      })
      .addCase(asyncgetParkingLot.pending, (state) => {
        state.inProgress1 = true;
      })
      .addCase(asyncgetParkingLot.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.freeParkingLots = action.payload.freeParkingLots;
          }
          state.inProgress1 = false;
        }

        console.log("In get free Parking reducer");
      })
      .addCase(asyncgetBookedSlots.pending, (state, action) => {
        state.inProgress1 = true;
      })
      .addCase(asyncgetBookedSlots.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.bookedTimeSlots = action.payload.bookedTimeSlots;
          }
          state.inProgress1 = false;
        }
      })
      .addCase(asyncpostFeedback.fulfilled, (state, action) => {
        state.alert = action.payload;
        console.log("in feedback reducer");
      })
      .addCase(asyncgetUsersName.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.usersName = action.payload.usersName;
          }
        }
      })
      .addCase(asyncgetUserHistory.pending, (state, action) => {
        state.inProgress1 = true;
      })
      .addCase(asyncgetUserHistory.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.bookedTimeSlots = action.payload.bookedTimeSlots;
          }
          state.inProgress1 = false;
        }
      })
      .addCase(asyncgetParkingLots.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.parkingLotNames = action.payload.parkingLots;
          }
        }
      })
      .addCase(asyncgetParkingLotsNear.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.parkingLotNames = action.payload.parkingLots;
          }
        }
      })
      .addCase(asyncgetParkingLotHistory.pending, (state) => {
        state.inProgress1 = true;
      })
      .addCase(asyncgetParkingLotHistory.fulfilled, (state, action) => {
        console.log("Parking lot history reducer");
        if (action.payload) {
          if (action.payload.msg) {
            console.log("Here2");
            state.alert = action.payload;
          } else {
            console.log("Here");
            state.alert = action.payload.alertData;
            state.bookedTimeSlots = action.payload.bookedTimeSlots;
            state.parkingLotDetails = action.payload.parkingLotDetails;
          }
          state.inProgress1 = false;
        }
      })
      .addCase(asyncsetProfilePic.pending, (state) => {
        state.alert = { msg: "Uploading photo..", type: "info" };
        state.inProgress2 = true;
      })
      .addCase(asyncsetProfilePic.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.inProgress2 = false;
        console.log("In set profilepic reducer");
      })
      .addCase(asyncCancelParkingSlot.pending, (state) => {
        state.alert = { msg: "Cancelling Slot..", type: "info" };
        state.inProgress2 = true;
      })
      .addCase(asyncCancelParkingSlot.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.bookedTimeSlots = state.bookedTimeSlots.map((slot) =>
              slot._id !== action.payload.id
                ? slot
                : { ...slot, cancelled: true }
            );
          }
          state.inProgress2 = false;
        }
        console.log("In cancel booked slot reducer");
      })
      .addCase(asyncDeleteParkingLot.pending, (state) => {
        state.inProgress2 = true;
      })
      .addCase(asyncDeleteParkingLot.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.bookedTimeSlots = state.bookedTimeSlots.map((slot) =>
              slot.parkingLot !== action.payload.id
                ? slot
                : { ...slot, cancelled: true, adminCancelled: true }
            );
            state.parkingLotDetails = {
              ...state.parkingLotDetails,
              isActive: false,
            };
            state.parkingLotNames = state.parkingLotNames.map((lot) =>
              lot._id !== action.payload.id ? lot : { ...lot, isActive: false }
            );
          }
          state.inProgress2 = false;
        }

        console.log("delete parking lot reducer");
      })
      .addCase(asyncMakeActiveLot.pending, (state) => {
        state.inProgress2 = true;
      })
      .addCase(asyncMakeActiveLot.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.parkingLotDetails = {
              ...state.parkingLotDetails,
              isActive: true,
            };
            state.parkingLotNames = state.parkingLotNames.map((lot) =>
              lot._id !== action.payload.id ? lot : { ...lot, isActive: true }
            );
          }
          state.inProgress2 = false;
        }
        console.log("Make Active Parking Lot Reducer");
      })
      .addCase(asyncgetCancelledSlots.pending, (state, action) => {
        state.inProgress1 = true;
      })
      .addCase(asyncgetCancelledSlots.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            state.alert = action.payload.alertData;
            state.bookedTimeSlots = action.payload.cancelledSlots;
          }
          state.inProgress1 = false;
        }
        console.log("Cancelled slots reducer");
      })
      .addCase(asyncSendResetEmail.pending, (state) => {
        state.inProgress2 = true;
        state.alert = { msg: "Processing...", type: "info" };
      })
      .addCase(asyncSendResetEmail.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.inProgress2 = false;
        console.log("Reset Email reducer");
      })
      .addCase(asyncresetPassword.pending, (state) => {
        state.alert = { msg: "Resetting Password...", type: "info" };
        state.inProgress1 = true;
      })
      .addCase(asyncresetPassword.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.inProgress1 = false;
        console.log("Reset password reducer");
      })
      .addCase(asynccheckOutBookSlot.pending, (state, action) => {
        state.inProgress2 = true;
      })
      .addCase(asynccheckOutBookSlot.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.msg) {
            state.alert = action.payload;
          } else {
            // state.alert = action.payload.alertData
            state.paymentOrder = action.payload.order;
          }
          state.inProgress2 = false;
        }
        console.log("checkout book slot reducer");
      })
  },
});

export const {
  setUser,
  setLogout,
  clearAlert,
  checkLoggedIn,
  clearFreeParkingLots,
  clearBookedTimeSlots,
  clearParkingLotDetails,
  setAlert,
  setUserProfilePic,
  setInProgress2,
} = authSlice.actions;
export default authSlice.reducer;
