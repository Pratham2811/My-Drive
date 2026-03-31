import integratedAppsSlice from "@/features/appIntegrations/slice/IntegrationSlice";
import authReducer from "@/features/auth/slices/authSlice.js";
import explorerReducer from "@/features/Explorer/explorerSlice.js";
import adminReducer from "@/features/user-managment/adminSlice";
import preferenceReducer from "@/slices/preferenceSlice.js";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    integratedApps: integratedAppsSlice,
    explorer: explorerReducer,
    preference: preferenceReducer,
    admin: adminReducer,
  },
});

export default store;
