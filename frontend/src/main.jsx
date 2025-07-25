import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { InteractionProvider } from "./context/InteractionProvider.jsx";
import { UserFeedProvider } from "./context/UserFeedProvider.jsx";
import { BlogAnalyticsProvider } from "./context/BlogAnalyticsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InteractionProvider>
        <UserFeedProvider>
          <BlogAnalyticsProvider>
            <App />
          </BlogAnalyticsProvider>
        </UserFeedProvider>
      </InteractionProvider>
    </AuthProvider>
  </BrowserRouter>
);
